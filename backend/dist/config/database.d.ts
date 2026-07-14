export declare function connectDatabase(): Promise<void>;
export declare function disconnectDatabase(): Promise<void>;
export declare function getDatabaseStatus(): "disconnected" | "connected";
