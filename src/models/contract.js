import mongoose from 'mongoose';

const { Schema } = mongoose;

const contractSchema = new Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 20,
    required: true,
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Contract', contractSchema);
