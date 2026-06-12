import mongoose from 'mongoose';

const course_schema = mongoose.Schema({
    name:String,
    image:String,
    price:Number,
    duration:String,
    video:String,
    notes:Array
});

const course_model= mongoose.model('/courses',course_schema);

export default course_model;

