import { client } from "../db.js";

// add new booking details
export async function addCustomer(req){
    let checkData = await client.db('hallBooking')
        .collection('customer')
        .find({})
        .toArray();

    let dateres = false;
    let timeres = false;

    checkData.forEach((val) => {
        let count = 0;
        if(val.Date == req.body.Date){
            dateres= true;
            count = 1;
        }

        if(count === 1){
            let rStart = req.body.start_time;
            let rEnd = req.body.end_time;
            let vStart = val.start_time;
            let vEnd = val.end_time;

            let lesThan = (rStart < vStart && rEnd < vStart ) ;
            let greThan = (rStart > vEnd && rEnd > vEnd) ;

            if( !( lesThan || greThan) ){
                timeres = 'taken';
            }
        }
    });

    if(!dateres) return funcAdd();
    if(timeres !== 'taken') return funcAdd();

    async function funcAdd(){
        let bookingDate = new Date();
        const data = {...req.body, bookingDate, bookingStatus: 'confirmed' };
    
        const newCus = await client.db('hallBooking')
            .collection('customer')
            .insertOne(data);
        
        return newCus;
    }
    
    return {
        acknowledged: false
    }
}

// get all customer data
export async function getAllCus(){
    const allCus = await client.db('hallBooking')
        .collection('customer')
        .find({})
        .toArray();
    
    return allCus;
}

// get number of times customer booked a room and room details
export async function getCusRoomTimes(req){
    const data = await client.db('hallBooking')
        .collection('customer')
        .aggregate([
            // {
            //     $match:{
            //         cusName: req.body.name || ''
            //     }
            // },
            {
                $lookup:{
                    from: 'room',
                    localField: 'room_ID',
                    foreignField: 'roomID',
                    as: 'All_Rooms'
                }
            },
            {
                $group:{
                    _id: '$cusName',
                    count: {$sum: 1},
                    bookings: {
                        $push: {
                            _id: '$_id',
                            Date: '$Date',
                            start_time: '$start_time',
                            end_time: '$end_time',
                            room_ID: '$room_ID',
                            bookingDate: '$bookingDate',
                            All_Rooms: '$All_Rooms'
                        }
                    }
                }
            }
        ])
        .toArray();
    
    return data;
}

