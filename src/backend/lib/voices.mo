import Common "../types/common";
import Types "../types/voices";
import List "mo:core/List";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  // ── Voice Project CRUD ────────────────────────────────────────────────────

  public func createProject(
    projects : List.List<Types.VoiceProject>,
    nextId : Nat,
    owner : Common.UserId,
    args : Types.CreateVoiceProjectArgs,
    now : Common.Timestamp,
  ) : Types.VoiceProject {
    let project : Types.VoiceProject = {
      id = nextId;
      owner = owner;
      name = args.name;
      description = args.description;
      var elevenLabsVoiceId = null;
      var status = #pending;
      createdAt = now;
      var lastUsedAt = null;
    };
    projects.add(project);
    project;
  };

  public func getProject(
    projects : List.List<Types.VoiceProject>,
    id : Common.ProjectId,
  ) : ?Types.VoiceProject {
    projects.find(func(p) { p.id == id });
  };

  public func listProjectsForOwner(
    projects : List.List<Types.VoiceProject>,
    owner : Common.UserId,
  ) : [Types.VoiceProjectView] {
    let filtered = projects.filter(func(p) { p.owner == owner });
    filtered.map<Types.VoiceProject, Types.VoiceProjectView>(func(p) { toProjectView(p) }).toArray();
  };

  public func deleteProject(
    projects : List.List<Types.VoiceProject>,
    id : Common.ProjectId,
    caller : Common.UserId,
  ) : Bool {
    let idx = projects.findIndex(func(p) { p.id == id and p.owner == caller });
    switch (idx) {
      case (?i) {
        // Shift elements: overwrite the target slot then truncate
        let size = projects.size();
        var j = i;
        while (j + 1 < size) {
          let next = projects.at(j + 1);
          projects.put(j, next);
          j += 1;
        };
        projects.truncate(size - 1);
        true;
      };
      case null { false };
    };
  };

  public func toProjectView(p : Types.VoiceProject) : Types.VoiceProjectView {
    {
      id = p.id;
      owner = p.owner;
      name = p.name;
      description = p.description;
      elevenLabsVoiceId = p.elevenLabsVoiceId;
      status = p.status;
      createdAt = p.createdAt;
      lastUsedAt = p.lastUsedAt;
    };
  };

  // ── Voice Sample Management ────────────────────────────────────────────────

  public func addSample(
    samples : List.List<Types.VoiceSample>,
    nextId : Nat,
    projectId : Common.ProjectId,
    owner : Common.UserId,
    filename : Text,
    blob : Storage.ExternalBlob,
    now : Common.Timestamp,
  ) : Types.VoiceSample {
    let sample : Types.VoiceSample = {
      id = nextId;
      projectId = projectId;
      owner = owner;
      filename = filename;
      blob = blob;
      uploadedAt = now;
    };
    samples.add(sample);
    sample;
  };

  public func listSamplesForProject(
    samples : List.List<Types.VoiceSample>,
    projectId : Common.ProjectId,
    caller : Common.UserId,
  ) : [Types.VoiceSample] {
    samples.filter(func(s) { s.projectId == projectId and s.owner == caller }).toArray();
  };

  // ── Clone Status ───────────────────────────────────────────────────────────

  public func updateCloneStatus(
    projects : List.List<Types.VoiceProject>,
    id : Common.ProjectId,
    status : Types.CloneStatus,
    elevenLabsVoiceId : ?Common.VoiceId,
  ) : Bool {
    switch (projects.find(func(p) { p.id == id })) {
      case (?p) {
        p.status := status;
        switch (elevenLabsVoiceId) {
          case (?vid) { p.elevenLabsVoiceId := ?vid };
          case null {};
        };
        true;
      };
      case null { false };
    };
  };

  // ── Synthesis Records ──────────────────────────────────────────────────────

  public func addSynthesisRecord(
    records : List.List<Types.SynthesisRecord>,
    nextId : Nat,
    projectId : Common.ProjectId,
    owner : Common.UserId,
    text : Text,
    settings : Types.SynthesisSettings,
    audioBlob : Storage.ExternalBlob,
    now : Common.Timestamp,
  ) : Types.SynthesisRecord {
    let record : Types.SynthesisRecord = {
      id = nextId;
      projectId = projectId;
      owner = owner;
      text = text;
      settings = settings;
      audioBlob = audioBlob;
      createdAt = now;
    };
    records.add(record);
    record;
  };

  public func listSynthesisRecords(
    records : List.List<Types.SynthesisRecord>,
    projectId : Common.ProjectId,
    caller : Common.UserId,
  ) : [Types.SynthesisRecordView] {
    records.filter(func(r) { r.projectId == projectId and r.owner == caller })
      .map<Types.SynthesisRecord, Types.SynthesisRecordView>(func(r) {
        {
          id = r.id;
          projectId = r.projectId;
          owner = r.owner;
          text = r.text;
          settings = r.settings;
          audioBlob = r.audioBlob;
          createdAt = r.createdAt;
        };
      }).toArray();
  };

  public func touchLastUsed(
    projects : List.List<Types.VoiceProject>,
    id : Common.ProjectId,
    now : Common.Timestamp,
  ) : () {
    switch (projects.find(func(p) { p.id == id })) {
      case (?p) { p.lastUsedAt := ?now };
      case null {};
    };
  };
};
