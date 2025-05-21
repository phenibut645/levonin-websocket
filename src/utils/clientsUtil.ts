import { ClientsArray } from "../types/clientsArray.type";

export function findUser(wsArray: ClientsArray[], name: string): findUserReturn {
    let ind = -1;
    wsArray.forEach(ws => {
        ind++;
        if(ws.name === name) return({success: true, index: ind});
    });
    return {success: false, index: null}
}

export interface findUserReturn {
    success: boolean,
    index: number | null
}

