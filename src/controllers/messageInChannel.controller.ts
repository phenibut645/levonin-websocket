import { WebSocket } from "ws";

import { ClientsArray } from "../types/clientsArray.type";
import { Message, MessageInChannel } from "../types/message.type";
import { User } from "../types/user.type";
import { ApiService } from "../services/ApiService.js";

export async function messageInChannelController(ws: WebSocket, message: Message, clients: ClientsArray[]): Promise<string> {
    const messageInChannel = message as MessageInChannel;
    const { channel } = messageInChannel;
    const users = await ApiService.GetUsersInChannel(channel);
    if(users != null){
        const usersIds = users.map(userIdObj => {
            return userIdObj.UserID;
        })
        const filteredClients = clients.filter(el => usersIds.includes(el.userId))
        filteredClients.forEach(client => {
            client.client.send(JSON.stringify({
                header: "ChannelReRender",
                channel
            }));
        });
    }
    return JSON.stringify({header: "MessageInChannelResponse", success: true});

}

