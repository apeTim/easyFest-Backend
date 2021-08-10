declare global {
    declare module 'express-session' {
        export interface SessionData {
            user: any
        }
    }
    declare module 'socket.io'{
        export interface Socket {
            userId: string
        }
    }
}