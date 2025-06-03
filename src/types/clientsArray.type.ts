import WebSocket from "ws";

export interface ClientsArray {
    client: WebSocket,
    name: string,
    token: string,
    userId: number,
    connected: boolean,
}