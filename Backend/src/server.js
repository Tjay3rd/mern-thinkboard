import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import notesRoutes from './Routes/notesRoutes.js'
import rateLimiter from "./RateLimitMiddleware/rateLimiter.js";
import { connectDB } from "./Config/db.js";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Define the ES Module equivalents
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 7000;


if(process.env.NODE_ENV !== 'production'){
app.use(
    cors({
        origin: "http://localhost:5173",
    }))
};
app.use(express.json());
app.use(rateLimiter);
app.use('/api/notes', notesRoutes);

if(process.env.NODE_ENV === 'production'){
app.use(express.static(path.join(__dirname, '../../frontend/dist' )));
app.get(/(.*)/, (_, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html' ));
})
}

connectDB().then(() => {
    app.listen(port, () => {
    console.log('Server listening on Port:', port); 
    });
});
