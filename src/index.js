import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config();

const { PORT, DB_URL } = process.env;

mongoose
  .connect(
    'mongodb+srv://Danylez:stardew96@cluster0.aom5gxg.mongodb.net/Arenas-Gym',
  )
  .then(() => console.log('CONNECTED DB'))
  .then(() =>
    app.listen(PORT, () => {
      console.log(`El servidor está escuchando en el puerto ${PORT}`);
    }),
  )
  .catch((error) => console.log('Error: ', error));
