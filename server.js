import dotenv from 'dotenv';
dotenv.config();
import Connectdb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import express, { json } from 'express';
import cors from 'cors';
import product_router from "./routes/product_routes.js";



const App = express();
const port=4000;

// config
Connectdb();
connectCloudinary()


// MIDDLE_WARE
App.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://frontend-delta-navy-4hcyvec3cs.vercel.app"
    ],
    credentials: true
  })
);
App.use(json());

// api end pionts

App.use('/api/product/',product_router)






App.listen(port);
