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
App.use(cors());
App.use(json());

// api end pionts

App.use('/api/product/',product_router)






App.listen(port);