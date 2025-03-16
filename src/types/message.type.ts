export interface Message {
    header: string
}

export interface ChatConnection extends Message {
    channel_id: number
}