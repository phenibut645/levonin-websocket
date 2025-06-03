import { apiUrl } from "../config/configData.js"

export interface User {
    UserID: number
}

export class ApiService {
    private static baseUrl = apiUrl;

    private static async isUserInChannel(userId: number): Promise<boolean>{

        return true;
    }
    public static async checkUserToken(token: string): Promise<boolean>{
        const response = await fetch(apiUrl + "users/check-token/" + token);
        const json = await response.json();
        if(json["response"] && json["response"]["message"] != null){
            return json["response"]["message"] as boolean;
        }
        return false;
    }

    public static async IsUsersToken(token: string, userId: number): Promise<boolean>{
        const response = await fetch(apiUrl + "users/is-user-token/" + userId + "/" + token)
        const json = await response.json();
        if(json["response"] && json["response"]["message"] != null){
            return json["response"]["message"] as boolean;
        }
        return false;
    }

    public static async GetUsersInChannel(channelId: number): Promise<User[] | null>{
        const response = await fetch(apiUrl + "channels/" + channelId);
        const json = await response.json();
        if(json["response"] && json["response"]["response"] != null){
            return json["response"]["response"] as User[];
        }
        return null;
    }
}

// https://levonin.aleksandermilisenko23.thkit.ee/api/