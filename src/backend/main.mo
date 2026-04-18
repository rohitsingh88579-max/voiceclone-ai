import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Types "types/voices";
import VoicesMixin "mixins/voices-api";

actor {
  // ── Authorization ──────────────────────────────────────────────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ── Object Storage ─────────────────────────────────────────────────────────
  include MixinObjectStorage();

  // ── Voice Domain State ─────────────────────────────────────────────────────
  let projects = List.empty<Types.VoiceProject>();
  let samples = List.empty<Types.VoiceSample>();
  let synthesisRecords = List.empty<Types.SynthesisRecord>();

  var _nextProjectId = { var value : Nat = 0 };
  var _nextSampleId = { var value : Nat = 0 };
  var _nextSynthesisId = { var value : Nat = 0 };

  // ── ElevenLabs API Key (admin-only global key, kept for backward compat) ───
  var _elevenLabsApiKey = { var value : Text = "" };

  // ── Per-User ElevenLabs API Keys ───────────────────────────────────────────
  let _userApiKeys = Map.empty<Principal, Text>();

  include VoicesMixin(
    accessControlState,
    projects,
    samples,
    synthesisRecords,
    _nextProjectId,
    _nextSampleId,
    _nextSynthesisId,
    _elevenLabsApiKey,
    _userApiKeys,
  );
};
