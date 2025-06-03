export interface Message {
    header: string
}

export interface InitialConnection extends Message {
    token: string,
    name: string,
    userId: number,
}

export interface ChatConnection extends Message {
    channel_id: number
}

export interface MessageInChannel extends Message {
    channel: number
}