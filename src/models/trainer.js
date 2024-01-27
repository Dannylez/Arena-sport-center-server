import mongoose from 'mongoose';

const { Schema } = mongoose;

const trainerSchema = new Schema({
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
  password: {
    type: String,
    minLength: 7,
    required: true,
  },
  ci: {
    type: String,
    minLength: 7,
    maxLength: 8,
    required: true,
  },
  birthDay: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    minLength: 7,
    maxLength: 15,
    required: true,
  },
  medService: {
    type: String,
  },
  classes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Class',
  },
  fee: {
    type: Number,
  },
  feeHistory: {
    type: [{ date: String, amount: Number }],
  },
});

export default mongoose.model('Trainer', trainerSchema);
