import mongoose from "mongoose";
import {OrgDocument, createOrg} from "../../db/services/org/org.service";
import { UserDocument, updateUser } from "../../db/services/user/user.service";
import { RoomDocument, createRoom } from "../../db/services/room/room.service";

export const setupOrg = async (orgName: string, createdBy: mongoose.Types.ObjectId, roomName: string, roomCapacity: number ) : Promise<OrgDocument | null> => {
    const session: mongoose.ClientSession = await mongoose.startSession();
    try{
        session.startTransaction();

        const org: OrgDocument[] | null = await createOrg([{
            name: orgName,
            team: [createdBy],
            createdBy: createdBy,
        }], session);
        if (!org || org.length === 0) {
            throw new Error("Org creation failed");
        }
        
        const user: UserDocument | null = await updateUser({ _id: createdBy }, { org: org[0]._id }, {session: session});
        if (!user) {
            throw new Error("User update failed");
        }
    
        const room: RoomDocument[] | null = await createRoom([{
            name: roomName,
            org: org[0]._id,
            createdBy: createdBy,
            capacity: roomCapacity,
        }], session);
        if (!room || room.length === 0) {
            throw new Error("Room creation failed");
        }

        await session.commitTransaction();
        session.endSession();
        return org[0];
    }catch(err){
        console.log(err);
        
        await session.abortTransaction();
        session.endSession();
        return null;
    }
};