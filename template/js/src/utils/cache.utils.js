import {createClient} from "redis";
import { appConfig } from "./env.utils.js";

const client = createClient({
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

export const caching = async(key, callback, expIn) => {
    if (!client || !isConnected) {
        console.log("Redis not connected");
        return await callback();
    }
    
    const data = await client.get(key);

    if (data) {
        return JSON.parse(data);
    }else{
        const result = await callback();
        await client.setEx(key, expIn, JSON.stringify(result));
        return result;
    }
};

export const deleteCache = async(key) => {
    if (!client || !isConnected) {
        console.log("Redis not connected");
    }else{
        await client.del(key);
    }
};