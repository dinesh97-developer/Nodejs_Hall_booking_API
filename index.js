import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { roomRouter } from './Routers/Room.js';
import { customerRouter } from './Routers/Customer.js';

const PORT = process.env.PORT || 8000 ;

// Initializing Server
const app = express();

// Dotenv configuration
dotenv.config();

// Middlewars
app.use(express.json());
app.use(cors());

// Application Routes
app.use('/room', roomRouter );
app.use('/customer', customerRouter )

// server listening
app.listen(PORT, () => 
    console.log(`Server is running at http://localhost:${PORT}`)
);