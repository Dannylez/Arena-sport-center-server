import mongoose from 'mongoose';

const { Schema } = mongoose;

const memberSchema = new Schema({
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
  ci: {
    type: Number,
    minLength: 7,
    maxLength: 8,
    required: true,
  },
  phone: {
    type: Number,
    minLength: 7,
    maxLength: 15,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthDay: {
    type: String,
    required: true,
  },
  medService: {
    type: String,
    required: true,
  },
  healthCardUpToDate: {
    type: Boolean,
    required: true,
  },
  healthCardVigency: {
    type: String,
    required: true,
  },
  classes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Class',
    required: true,
  },
  contracts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Contract',
    required: true,
  },
});

export default mongoose.model('Member', memberSchema);
