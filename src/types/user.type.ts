export interface User{
    id: number,
    name: string,
    status_id: number,
    active: boolean,
    ws?: WebSocket
}