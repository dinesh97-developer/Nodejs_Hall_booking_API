import express from 'express';
import { addCustomer, getAllCus, getCusRoomTimes } from '../models/Customer.js';

const router = express.Router();

// adding new booking data
router.post('/add', async (req, res) => {
    try{
        if(Object.keys(req.body).length < 1){
            return res.status(400).json({error: 'Fields are required'});
        }

        if(req.body.start_time > req.body.end_time) return res.status(400).json({error: 'Start time have to be less than end time'});

        const newCus = await addCustomer(req);
        if(!newCus.acknowledged) return res.status(400).json({error: 'Error adding data', message: 'Time Slot not available'});

        res.status(200).json({
            message: 'Data added',
            data: newCus
        });

    }catch(err){
        res.status(500).json({
            message: 'Error adding data',
            error: err
        });
    }
});

// get all customers that booked a room
router.get('/all', async (req, res) => {
    try{
        const allCus = await getAllCus();
        if(allCus.length < 1) return res.status(400).json({error: 'No data available'});

        res.status(200).json({data: allCus });

    }catch(err){
        res.status(500).json({
            message: 'Internal server error',
            error: err
        });
    }
})

// with customer name 
// number of times they booked room and room details
router.get('/cus/count', async (req, res) => {
    try{
        const cus = await getCusRoomTimes(req);
        if(cus.length < 1) return res.status(400).json({error: 'No data available'});
    
        res.status(200).json({data: cus});

    }catch(err){
        res.status(500).json({
            message: 'Internal server error',
            error: err
        });
    }
})

export const customerRouter = router ;