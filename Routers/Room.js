import express from 'express';
import { getRooms, addRoom, allCusRoom } from '../models/Room.js';

// Initializing router
const router = express.Router();

// get all the rooms
router.get('/all', async (req, res) => {
    try{
        const allRooms = await getRooms();
        if(allRooms.length < 1) return res.status(404).json({error: 'No data found'});
        
        res.status(201).json({ data: allRooms })

    }catch(err){
        res.status(500).json({message: 'Internal server error', error: err});
    }
});

// get all room with booked customer
router.get('/allroom', async (req, res) => {
    try{
        const allCusRm = await allCusRoom();
        if(allCusRm.length < 1) return res.status(400).json({error: 'No data found'});
    
        res.status(201).json({ data: allCusRm });

    }catch(err){
        res.status(500).json({message: 'Internal server error', error: err});
    }

});

// adding a new room
router.post('/add', async (req, res) => {
    try{

        if(Object.keys(req.body).length < 1) return res.status(400).json({error: 'Fields are required'});

        const newRoom = await addRoom(req);

        if(!newRoom.acknowledged) return res.status(400).json({error: 'Error adding data', message: 'Room already exist'});

        res.status(200).json({
            message: 'data addded successfully',
            data: newRoom
        })

    }catch(err){
        res.status(500).json({message: 'Internal server error', error: err});
    }
});

export const roomRouter = router ;