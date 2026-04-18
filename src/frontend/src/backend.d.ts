import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface VoiceSample {
    id: bigint;
    owner: UserId;
    blob: ExternalBlob;
    filename: string;
    projectId: ProjectId;
    uploadedAt: Timestamp;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Timestamp = bigint;
export type VoiceId = string;
export interface VoiceProjectView {
    id: ProjectId;
    status: CloneStatus;
    lastUsedAt?: Timestamp;
    owner: UserId;
    name: string;
    createdAt: Timestamp;
    description: string;
    elevenLabsVoiceId?: VoiceId;
}
export type SynthesisId = bigint;
export interface StartCloningArgs {
    sampleIds: Array<bigint>;
    projectId: ProjectId;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type UserId = Principal;
export interface SynthesisRecordView {
    id: SynthesisId;
    owner: UserId;
    createdAt: Timestamp;
    text: string;
    audioBlob: ExternalBlob;
    settings: SynthesisSettings;
    projectId: ProjectId;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface SynthesizeSpeechArgs {
    text: string;
    settings: SynthesisSettings;
    projectId: ProjectId;
}
export type ProjectId = bigint;
export interface CreateVoiceProjectArgs {
    name: string;
    description: string;
}
export interface SynthesisSettings {
    stability: number;
    style: number;
    similarityBoost: number;
}
export type CloneStatus = {
    __kind__: "pending";
    pending: null;
} | {
    __kind__: "processing";
    processing: null;
} | {
    __kind__: "ready";
    ready: null;
} | {
    __kind__: "failed";
    failed: string;
};
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createVoiceProject(args: CreateVoiceProjectArgs): Promise<VoiceProjectView>;
    deleteVoiceProject(id: ProjectId): Promise<boolean>;
    getCallerUserRole(): Promise<UserRole>;
    getUserApiKey(): Promise<string | null>;
    getVoiceProject(id: ProjectId): Promise<VoiceProjectView | null>;
    isCallerAdmin(): Promise<boolean>;
    listSynthesisRecords(projectId: ProjectId): Promise<Array<SynthesisRecordView>>;
    listVoiceProjects(): Promise<Array<VoiceProjectView>>;
    listVoiceSamples(projectId: ProjectId): Promise<Array<VoiceSample>>;
    registerClonedVoice(projectId: ProjectId, elevenLabsVoiceId: string): Promise<VoiceProjectView>;
    setElevenLabsApiKey(key: string): Promise<void>;
    setUserApiKey(key: string): Promise<void>;
    startVoiceCloning(args: StartCloningArgs): Promise<string>;
    synthesizeSpeech(args: SynthesizeSpeechArgs): Promise<SynthesisRecordView>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    uploadVoiceSample(projectId: ProjectId, filename: string, blob: ExternalBlob): Promise<bigint>;
}
