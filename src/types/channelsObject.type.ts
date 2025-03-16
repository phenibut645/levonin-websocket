import { User } from "./user.type";

export type ChannelsList = ChannelObject[];

export interface ChannelObject {
    channel_id: number,
    users: User[]
}