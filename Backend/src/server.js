import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from "cors"
import notesRoutes from './Routes/notesRoutes.js'
import rateLimiter from "./RateLimitMiddleware/rateLimiter.js";
import { connectDB } from "./Config/db.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(rateLimiter);
app.use('/api/notes', notesRoutes);

const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log('Server listening on Port:', port);
    connectDB();
});
