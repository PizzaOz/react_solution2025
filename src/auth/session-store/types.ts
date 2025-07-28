export interface SessionState {
    token: string | null;
    waiting: boolean;
  }

export type SessionStateUpdate = Partial<SessionState>;