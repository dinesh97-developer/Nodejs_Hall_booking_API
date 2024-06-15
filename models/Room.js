import { client } from "../db.js";

// get all rooms details
export async function getRooms() {
    const data = await client.db('hallBooking')
        .collection('room')
        .find({},{_id:0})
        .toArray();
    
    return data;
}

// get room with custoemr data
export async function allCusRoom(){
    const data = await client.db('hallBooking')
        .collection('room')
        .aggregate([
            {
                $lookup:
                {
                    from: 'customer',
                    localField: 'roomID',
                    foreignField: 'room_ID',
                    as: 'customers'
                }
            }
        ])
        .toArray();
    
    return data;
}

// adding a room
export async function addRoom(req) {
    const check = await client.db('hallBooking')
    .collection('room')
    .find({},{_id:0})
    .toArray();

    let res = false;

    check.forEach((val) => {
        if(val.roomID == req.body.roomID) res = true ;
    });

    if(res) return { acknowledged: false };
    
    const newRoom = await client.db('hallBooking')
        .collection('room')
        .insertOne(req.body);

    return newRoom;
}