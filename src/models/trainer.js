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
    maxLength: 12,
    required: true,
  },
  ci: {
    type: Number,
    minLength: 7,
    maxLength: 8,
    required: true,
  },
  birthDay: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    minLength: 7,
    maxLength: 15,
    required: true,
  },
  medService: {
    type: String,
    required: true,
  },
  classes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Class',
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  feeHistory: {
    type: [{ String, Number }],
    required: true,
  },
});

export default mongoose.model('Trainer', trainerSchema);
