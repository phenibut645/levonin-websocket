import { WebSocket } from "ws";
import { InitialConnection } from "../types/message.type";
import { ClientsArray } from "../types/clientsArray.type";
import { findUser } from "../utils/clientsUtil";

export function initialConnectionController(ws: WebSocket, message: InitialConnection, clients: ClientsArray[]){
    if(!findUser(clients, message.name).success) {
        clients.push({
            "client": ws,
            "name": message.name
        })
    }
}