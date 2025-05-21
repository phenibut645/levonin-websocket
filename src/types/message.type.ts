export interface Message {
    header: string
}

export interface InitialConnection extends Message {
    name: string
}

export interface ChatConnection extends Message {
    channel_id: number
}