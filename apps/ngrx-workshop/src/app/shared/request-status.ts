export enum LoadingStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  FULLFILLED = 'fullfilled',
}
export interface ErrorStatus {
  error: string;
}
export type RequestStatus = LoadingStatus | ErrorStatus;
