declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: number;
        NODE_ENV: "development" | "production";
        DBURL: string;
        ACCESS_TOKEN_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
        CLIENT_URL: string;
    }
}

declare interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

declare interface ClientToServerEvents {
    hello: () => void;
}

declare interface InterServerEvents {
    ping: () => void;
}

declare interface SocketData {
    name: string;
    age: number;
}
