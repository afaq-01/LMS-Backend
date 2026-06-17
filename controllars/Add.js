import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'; // or: import { promises as fs } from 'fs';
import course_model from '../models/Course_model.js';
import Stripe from "stripe";


export const add = async (req, res) => {
  try {
    const { name, notes, description, title, price, duration } = req.body;

    const imageFile = req.files?.image?.[0];
    const videoFile = req.files?.video?.[0];

    let imageUrl = null;
    let videoUrl = null;

    // Upload image to Cloudinary
    if (imageFile) {
      const imgResult = await cloudinary.uploader.upload(imageFile.path, {
        folder: 'uploads/images',
      });
      imageUrl = imgResult.secure_url;
      fs.unlinkSync(imageFile.path); // remove local file
    }

    // Upload video to Cloudinary
    if (videoFile) {
      const vidResult = await cloudinary.uploader.upload(videoFile.path, {
        resource_type: 'video', // VERY IMPORTANT for videos
        folder: 'uploads/videos',
      });
      videoUrl = vidResult.secure_url;
      fs.unlinkSync(videoFile.path); // remove local file
    }

    console.log(imageUrl)

    // Parse notes if present
    let parsedNotes = [];
    if (notes) {
      try {
        parsedNotes = JSON.parse(notes);
      } catch {
        console.warn('Invalid notes JSON; sending raw.');
      }
    }

    const data = {
      name,
      title,
      description,
      price,
      duration,
      notes: parsedNotes,
      video: videoUrl,
      image: imageUrl,

    }

    const storing_data = await course_model(data)
    storing_data.save();

    // TODO: save to DB here if needed

    res.send('Uploaded sucessfully...')

  } catch (error) {
    console.error('Add course error:', error);
    return res.status(500).json({ error: 'Server error while adding course.' });
  }
};


export const get_controllar = async (req, res) => {
  try {

    const getting_data = await course_model.find();
    res.send(getting_data)


  } catch (error) {
    res.send(error)

  }
}

export const delete_controllar = async (req, res) => {
  try {

    const { _id } = req.body;
    const deleting = await course_model.findByIdAndDelete(_id)
    res.send('course deleted...')

  } catch (error) {
    res.send(error)

  }


}

export const payment_controllar = async (req, res) => {
  try {
    const { name, price } = req.body;

    console.log("Request body:", req.body);
console.log("Name:", name);
console.log("Price:", price);
console.log("Unit amount:", Number(price) * 100);

    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Stripe key missing in environment variables");
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/enrollment",
      cancel_url: "http://localhost:3000/cancel",
    });

    return res.json({ id: session.id, success: true });

  } catch (error) {
    console.error("PAYMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
