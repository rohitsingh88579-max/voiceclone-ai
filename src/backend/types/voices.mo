import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type CloneStatus = {
    #pending;
    #processing;
    #ready;
    #failed : Text;
  };

  public type VoiceProject = {
    id : Common.ProjectId;
    owner : Common.UserId;
    name : Text;
    description : Text;
    var elevenLabsVoiceId : ?Common.VoiceId;
    var status : CloneStatus;
    createdAt : Common.Timestamp;
    var lastUsedAt : ?Common.Timestamp;
  };

  // Shared (non-mutable) projection for API boundaries
  public type VoiceProjectView = {
    id : Common.ProjectId;
    owner : Common.UserId;
    name : Text;
    description : Text;
    elevenLabsVoiceId : ?Common.VoiceId;
    status : CloneStatus;
    createdAt : Common.Timestamp;
    lastUsedAt : ?Common.Timestamp;
  };

  public type VoiceSample = {
    id : Nat;
    projectId : Common.ProjectId;
    owner : Common.UserId;
    filename : Text;
    blob : Storage.ExternalBlob;
    uploadedAt : Common.Timestamp;
  };

  public type SynthesisSettings = {
    stability : Float;
    style : Float;
    similarityBoost : Float;
  };

  public type SynthesisRecord = {
    id : Common.SynthesisId;
    projectId : Common.ProjectId;
    owner : Common.UserId;
    text : Text;
    settings : SynthesisSettings;
    audioBlob : Storage.ExternalBlob;
    createdAt : Common.Timestamp;
  };

  public type SynthesisRecordView = {
    id : Common.SynthesisId;
    projectId : Common.ProjectId;
    owner : Common.UserId;
    text : Text;
    settings : SynthesisSettings;
    audioBlob : Storage.ExternalBlob;
    createdAt : Common.Timestamp;
  };

  public type CreateVoiceProjectArgs = {
    name : Text;
    description : Text;
  };

  public type StartCloningArgs = {
    projectId : Common.ProjectId;
    sampleIds : [Nat];
  };

  public type SynthesizeSpeechArgs = {
    projectId : Common.ProjectId;
    text : Text;
    settings : SynthesisSettings;
  };
};
