import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema({
  firstName: {
    type: String,
    minLength: 3,
    maxLength: 25,
    required: true,
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 25,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    minLength: 7,
    maxLength: 15,
    required: true,
  },
  password: {
    type: String,
    minLength: 7,
    required: true,
  },
  ci: {
    type: Number,
    minLength: 7,
    maxLength: 8,
    required: true,
  },
});

export default mongoose.model('Admin', adminSchema);
