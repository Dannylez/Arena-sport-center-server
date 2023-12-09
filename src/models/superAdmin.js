import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minLength: 7,
    maxLength: 12,
    required: true,
  },
});

export default mongoose.model('SuperAdmin', superAdminSchema);
