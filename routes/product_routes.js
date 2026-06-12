
import express from 'express';
import { add, get_controllar, delete_controllar, payment_controllar } from '../controllars/Add.js';
import Upload from '../middleware/multer.js';
import { add_buyed_course, buyed_course_data } from '../controllars/buy_courses.js';

const product_router=express.Router();

product_router.post('/add',Upload.fields([{name:'video', maxCount:1},{name:'image', maxCount:1}]),add);
product_router.get('/get',get_controllar)
product_router.post('/delete',delete_controllar)
product_router.post('/payment',payment_controllar)
product_router.post('/buy_course',add_buyed_course)
product_router.post('/buy_course_data',buyed_course_data)





export default product_router;