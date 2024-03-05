import {createClient, RedisClientType} from "redis";
import { appConfig } from "./env.utils";

const client : RedisClientType | null = createClient({
    url: appConfig.redisUri,
});

/*eslint-disable no-var*/
var isConnected = true;

client.connect()
    .then(() => {
        console.log("Connected to Redis");
    })
    .catch((err) => {
        isConnected = false;        
        console.error("Error connecting to Redis:", err);
        // Handle the error based on your application's needs
    });

export const caching = async<T>(key: string, callback: () => Promise<T>, expIn: number): Promise<T> => {
    if (!client || !isConnected) {
        console.log("Redis not connected");
        return await callback();
    }
    
    const data: string | null = await client.get(key);

    if (data) {
        return JSON.parse(data);
    }else{
        const result = await callback();
        await client.setEx(key, expIn, JSON.stringify(result));
        return result;
    }
};

export const deleteCache = async(key: string): Promise<void> => {
    if (!client || !isConnected) {
        console.log("Redis not connected");
    }else{
        await client.del(key);
    }
};