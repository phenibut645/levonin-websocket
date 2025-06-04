import { WebSocket } from "ws";

import { ClientsArray } from "../types/clientsArray.type";
import { Message, MessageInChannel } from "../types/message.type";
import { User } from "../types/user.type";
import { ApiService } from "../services/ApiService.js";

interface ReRenderChannels extends Message{
    userId: number
}

export async function reRenderChannels(ws: WebSocket, message: Message, clients: ClientsArray[]): Promise<string> {
    const messageInChannel = message as ReRenderChannels;
    const { userId } = messageInChannel;

    if(userId != null){
        const client = clients.find(el => el.userId === userId);
        if(client ){
            client.client.send(JSON.stringify({
                header: "ChannelReRender"
            }));
        }
   
    }
    return JSON.stringify({header: "Okey", success: true});

}

