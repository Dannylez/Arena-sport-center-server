import mongoose from 'mongoose';
import bcryptPlugin from 'mongoose-bcrypt';

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
    maxLength: 12,
    required: true,
    bcrypt: true,
  },
  ci: {
    type: Number,
    minLength: 7,
    maxLength: 8,
    required: true,
  },
});

adminSchema.plugin(bcryptPlugin);
export default mongoose.model('Admin', adminSchema);
