import mongoose from "mongoose";

const course_schema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    duration: String,
    video: String,
    notes: Array,
    User_id:String

})

const buy_course_model= mongoose.model('buyed_courses',course_schema);

export default buy_course_model;