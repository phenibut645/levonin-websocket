import { apiUrl } from "../config/configData"
import axios from "axios";

export class ApiService {
    private static baseUrl = apiUrl;

    private static async isUserInChannel(userId: number): Promise<boolean>{
        return true;
    }
}