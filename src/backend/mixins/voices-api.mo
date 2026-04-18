import AccessControl "mo:caffeineai-authorization/access-control";
import Storage "mo:caffeineai-object-storage/Storage";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Common "../types/common";
import Types "../types/voices";
import VoicesLib "../lib/voices";

mixin (
  accessControlState : AccessControl.AccessControlState,
  projects : List.List<Types.VoiceProject>,
  samples : List.List<Types.VoiceSample>,
  synthesisRecords : List.List<Types.SynthesisRecord>,
  nextProjectId : { var value : Nat },
  nextSampleId : { var value : Nat },
  nextSynthesisId : { var value : Nat },
  elevenLabsApiKey : { var value : Text },
  userApiKeys : Map.Map<Principal, Text>,
) {

  // ── Admin: API Key Configuration ───────────────────────────────────────────

  /// Set the ElevenLabs API key (admin only, kept for backward compatibility)
  public shared ({ caller }) func setElevenLabsApiKey(key : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: admin only");
    };
    elevenLabsApiKey.value := key;
  };

  // ── Per-User API Key Management ────────────────────────────────────────────

  /// Store the caller's own ElevenLabs API key
  public shared ({ caller }) func setUserApiKey(key : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    userApiKeys.add(caller, key);
  };

  /// Retrieve the caller's stored ElevenLabs API key (null if not set)
  public query ({ caller }) func getUserApiKey() : async ?Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    userApiKeys.get(caller);
  };

  // ── Voice Projects ─────────────────────────────────────────────────────────

  /// List all voice projects owned by the caller
  public query ({ caller }) func listVoiceProjects() : async [Types.VoiceProjectView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VoicesLib.listProjectsForOwner(projects, caller);
  };

  /// Create a new voice cloning project
  public shared ({ caller }) func createVoiceProject(args : Types.CreateVoiceProjectArgs) : async Types.VoiceProjectView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextProjectId.value;
    nextProjectId.value += 1;
    let project = VoicesLib.createProject(projects, id, caller, args, Time.now());
    VoicesLib.toProjectView(project);
  };

  /// Delete a voice project (and its samples/synthesis records)
  public shared ({ caller }) func deleteVoiceProject(id : Common.ProjectId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VoicesLib.deleteProject(projects, id, caller);
  };

  /// Get a single voice project
  public query ({ caller }) func getVoiceProject(id : Common.ProjectId) : async ?Types.VoiceProjectView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (VoicesLib.getProject(projects, id)) {
      case (?p) {
        if (p.owner == caller) { ?VoicesLib.toProjectView(p) } else { null };
      };
      case null { null };
    };
  };

  // ── Voice Samples ──────────────────────────────────────────────────────────

  /// Upload a voice sample file for a project; returns the new sample id
  public shared ({ caller }) func uploadVoiceSample(
    projectId : Common.ProjectId,
    filename : Text,
    blob : Storage.ExternalBlob,
  ) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (VoicesLib.getProject(projects, projectId)) {
      case (?p) {
        if (p.owner != caller) { Runtime.trap("Unauthorized: not your project") };
      };
      case null { Runtime.trap("Project not found") };
    };
    let id = nextSampleId.value;
    nextSampleId.value += 1;
    let sample = VoicesLib.addSample(samples, id, projectId, caller, filename, blob, Time.now());
    sample.id;
  };

  /// List voice samples for a project
  public query ({ caller }) func listVoiceSamples(projectId : Common.ProjectId) : async [Types.VoiceSample] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VoicesLib.listSamplesForProject(samples, projectId, caller);
  };

  // ── Voice Cloning ──────────────────────────────────────────────────────────

  /// Register a cloned voice using an ElevenLabs voice ID obtained from the frontend.
  /// The frontend handles multipart upload to ElevenLabs and passes back the voice_id.
  public shared ({ caller }) func registerClonedVoice(
    projectId : Common.ProjectId,
    elevenLabsVoiceId : Text,
  ) : async Types.VoiceProjectView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (VoicesLib.getProject(projects, projectId)) {
      case (?p) {
        if (p.owner != caller) { Runtime.trap("Unauthorized: not your project") };
      };
      case null { Runtime.trap("Project not found") };
    };
    ignore VoicesLib.updateCloneStatus(projects, projectId, #ready, ?elevenLabsVoiceId);
    let updated = switch (VoicesLib.getProject(projects, projectId)) {
      case (?p) { p };
      case null { Runtime.trap("Project not found after update") };
    };
    VoicesLib.toProjectView(updated);
  };

  /// Start voice cloning: validates project + samples exist, marks project as #processing.
  /// Audio upload to ElevenLabs must be done directly from the browser (multipart/form-data).
  /// After the frontend completes the ElevenLabs upload, call registerClonedVoice with the voice_id.
  public shared ({ caller }) func startVoiceCloning(args : Types.StartCloningArgs) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let project = switch (VoicesLib.getProject(projects, args.projectId)) {
      case (?p) {
        if (p.owner != caller) { Runtime.trap("Unauthorized: not your project") };
        p;
      };
      case null { Runtime.trap("Project not found") };
    };

    // Validate that the requested sample IDs exist for this project
    let projectSamples = VoicesLib.listSamplesForProject(samples, args.projectId, caller);
    for (sampleId in args.sampleIds.vals()) {
      let found = projectSamples.find(func(s) = s.id == sampleId);
      switch (found) {
        case null { Runtime.trap("Sample not found: " # debug_show(sampleId)) };
        case (?_) {};
      };
    };

    // Mark project as processing
    ignore VoicesLib.updateCloneStatus(projects, args.projectId, #processing, null);

    // Return project name as confirmation — frontend handles ElevenLabs multipart upload
    project.name;
  };

  // ── Text-to-Speech ─────────────────────────────────────────────────────────

  /// Synthesize speech using a cloned voice via ElevenLabs TTS API.
  /// Returns the ElevenLabs audio response (base64 mp3) stored as synthesis record.
  public shared ({ caller }) func synthesizeSpeech(args : Types.SynthesizeSpeechArgs) : async Types.SynthesisRecordView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let project = switch (VoicesLib.getProject(projects, args.projectId)) {
      case (?p) {
        if (p.owner != caller) { Runtime.trap("Unauthorized: not your project") };
        p;
      };
      case null { Runtime.trap("Project not found") };
    };
    let voiceId = switch (project.elevenLabsVoiceId) {
      case (?vid) { vid };
      case null { Runtime.trap("Voice not cloned yet — please complete voice cloning first") };
    };

    // Resolve the caller's ElevenLabs API key from per-user storage
    let apiKey = switch (userApiKeys.get(caller)) {
      case (?k) { k };
      case null { Runtime.trap("No ElevenLabs API key set — please save your API key in settings first") };
    };

    // Build TTS request body
    let stabilityText = floatToText(args.settings.stability);
    let similarityBoostText = floatToText(args.settings.similarityBoost);
    let styleText = floatToText(args.settings.style);
    let body = "{\"text\":\"" # escapeJson(args.text) # "\",\"model_id\":\"eleven_multilingual_v2\",\"voice_settings\":{\"stability\":" # stabilityText # ",\"similarity_boost\":" # similarityBoostText # ",\"style\":" # styleText # ",\"use_speaker_boost\":true}}";
    let headers : [OutCall.Header] = [
      { name = "xi-api-key"; value = apiKey },
      { name = "Content-Type"; value = "application/json" },
    ];

    // The TTS API returns audio bytes; the outcall module returns them as Text.
    // We encode the response as UTF-8 bytes and store as ExternalBlob.
    let audioResponse = await OutCall.httpPostRequest(
      "https://api.elevenlabs.io/v1/text-to-speech/" # voiceId # "?output_format=mp3_44100_128",
      headers,
      body,
      transform,
    );

    // Store audio response bytes as ExternalBlob
    let audioBlob : Storage.ExternalBlob = audioResponse.encodeUtf8();

    let id = nextSynthesisId.value;
    nextSynthesisId.value += 1;
    let now = Time.now();
    let record = VoicesLib.addSynthesisRecord(
      synthesisRecords,
      id,
      args.projectId,
      caller,
      args.text,
      args.settings,
      audioBlob,
      now,
    );
    VoicesLib.touchLastUsed(projects, args.projectId, now);
    {
      id = record.id;
      projectId = record.projectId;
      owner = record.owner;
      text = record.text;
      settings = record.settings;
      audioBlob = record.audioBlob;
      createdAt = record.createdAt;
    };
  };

  /// List synthesis records for a project
  public query ({ caller }) func listSynthesisRecords(projectId : Common.ProjectId) : async [Types.SynthesisRecordView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VoicesLib.listSynthesisRecords(synthesisRecords, projectId, caller);
  };

  // ── Transform for HTTP outcalls ─────────────────────────────────────────────

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ── Private helpers ─────────────────────────────────────────────────────────

  /// Minimal JSON string field extractor: finds "fieldName":"value" and returns value
  private func extractJsonStringField(json : Text, fieldName : Text) : ?Text {
    let searchKey = "\"" # fieldName # "\":\"";
    var parts = json.split(#text(searchKey));
    var seenFirst = false;
    var result : ?Text = null;
    for (part in parts) {
      if (not seenFirst) {
        seenFirst := true;
      } else if (result == null) {
        // Take up to the first closing quote
        var valueParts = part.split(#char '\"');
        var isFirst = true;
        for (valuePart in valueParts) {
          if (isFirst) {
            result := ?valuePart;
            isFirst := false;
          };
        };
      };
    };
    result;
  };

  /// Escape special characters for use inside a JSON string value
  private func escapeJson(text : Text) : Text {
    text
      .replace(#char '\\', "\\\\")
      .replace(#char '\"', "\\\"")
      .replace(#char '\n', "\\n")
      .replace(#char '\r', "\\r")
      .replace(#char '\t', "\\t");
  };

  /// Convert Float to text representation suitable for JSON
  private func floatToText(f : Float) : Text {
    // debug_show on Float may produce "+0.75"; strip leading '+' for JSON
    let raw = debug_show(f);
    switch (raw.stripStart(#char '+')) {
      case (?stripped) { stripped };
      case null { raw };
    };
  };
};
