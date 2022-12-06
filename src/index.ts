import { app } from './app';
import mongoose from 'mongoose';

const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://ccUser:ccUserPassword@cluster0.pacfd4y.mongodb.net/BookStore');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
};

start();
