import type { backendInterface, VoiceProjectView, VoiceSample, SynthesisRecordView, ExternalBlob } from "../backend";
import { UserRole } from "../backend";

const mockExternalBlob = {
  getBytes: async () => new Uint8Array(0),
  getDirectURL: () => "",
  withUploadProgress: function () { return this; }
} as unknown as ExternalBlob;

const mockProject1: VoiceProjectView = {
  id: BigInt(1),
  name: "My Voice Clone",
  description: "A clone of my natural speaking voice",
  status: { __kind__: "ready", ready: null },
  owner: { toText: () => "aaaaa-bbbbb" } as any,
  createdAt: BigInt(Date.now() * 1_000_000),
  lastUsedAt: BigInt(Date.now() * 1_000_000),
  elevenLabsVoiceId: "voice-abc123",
};

const mockProject2: VoiceProjectView = {
  id: BigInt(2),
  name: "Narrator Voice",
  description: "Deep authoritative narrator tone",
  status: { __kind__: "processing", processing: null },
  owner: { toText: () => "aaaaa-bbbbb" } as any,
  createdAt: BigInt((Date.now() - 86400000) * 1_000_000),
  lastUsedAt: undefined,
  elevenLabsVoiceId: undefined,
};

const mockProject3: VoiceProjectView = {
  id: BigInt(3),
  name: "Podcast Voice",
  description: "Warm friendly tone for podcast content",
  status: { __kind__: "pending", pending: null },
  owner: { toText: () => "aaaaa-bbbbb" } as any,
  createdAt: BigInt((Date.now() - 172800000) * 1_000_000),
  lastUsedAt: undefined,
  elevenLabsVoiceId: undefined,
};

const mockSample1: VoiceSample = {
  id: BigInt(1),
  owner: { toText: () => "aaaaa-bbbbb" } as any,
  blob: mockExternalBlob,
  filename: "recording_01.wav",
  projectId: BigInt(1),
  uploadedAt: BigInt(Date.now() * 1_000_000),
};

const mockSynthesis1: SynthesisRecordView = {
  id: BigInt(1),
  owner: { toText: () => "aaaaa-bbbbb" } as any,
  createdAt: BigInt(Date.now() * 1_000_000),
  text: "Hello, this is a sample text-to-speech output using my cloned voice.",
  audioBlob: mockExternalBlob,
  settings: { stability: 0.75, style: 0.5, similarityBoost: 0.85 },
  projectId: BigInt(1),
};

export const mockBackend: backendInterface = {
  _immutableObjectStorageBlobsAreLive: async (_hashes) => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async (_blobs) => undefined,
  _immutableObjectStorageCreateCertificate: async (_blobHash) => ({ __kind__: "ok", ok: new Uint8Array(0) } as any),
  _immutableObjectStorageRefillCashier: async (_refillInformation) => ({ __kind__: "ok", ok: null } as any),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
  _initializeAccessControl: async () => undefined,
  assignCallerUserRole: async (_user, _role) => undefined,
  createVoiceProject: async (args) => ({
    id: BigInt(Math.floor(Math.random() * 1000)),
    name: args.name,
    description: args.description,
    status: { __kind__: "pending", pending: null },
    owner: { toText: () => "aaaaa-bbbbb" } as any,
    createdAt: BigInt(Date.now() * 1_000_000),
    lastUsedAt: undefined,
    elevenLabsVoiceId: undefined,
  }),
  deleteVoiceProject: async (_id) => true,
  getCallerUserRole: async () => UserRole.user,
  getVoiceProject: async (_id) => mockProject1,
  isCallerAdmin: async () => false,
  listSynthesisRecords: async (_projectId) => [mockSynthesis1],
  listVoiceProjects: async () => [mockProject1, mockProject2, mockProject3],
  listVoiceSamples: async (_projectId) => [mockSample1],
  registerClonedVoice: async (_projectId, _voiceId) => ({ ...mockProject1, elevenLabsVoiceId: _voiceId }),
  getUserApiKey: async () => null,
  setUserApiKey: async (_key) => undefined,
  setElevenLabsApiKey: async (_key) => undefined,
  startVoiceCloning: async (_args) => "cloning_job_abc123",
  synthesizeSpeech: async (args) => ({
    id: BigInt(Math.floor(Math.random() * 1000)),
    owner: { toText: () => "aaaaa-bbbbb" } as any,
    createdAt: BigInt(Date.now() * 1_000_000),
    text: args.text,
    audioBlob: mockExternalBlob,
    settings: args.settings,
    projectId: args.projectId,
  }),
  transform: async (input) => ({
    status: BigInt(200),
    body: new Uint8Array(0),
    headers: [],
  }),
  uploadVoiceSample: async (_projectId, _filename, _blob) => BigInt(Math.floor(Math.random() * 1000)),
};
