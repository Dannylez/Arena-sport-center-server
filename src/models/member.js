import { format } from 'date-fns';
import mongoose from 'mongoose';

const { Schema } = mongoose;
const now = new Date();
const today = format(now, 'dd/MM/yyy');

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
    type: String,
    minLength: 7,
    maxLength: 8,
    required: true,
  },
  phone: {
    type: String,
    maxLength: 15,
  },
  email: {
    type: String,
  },
  birthDay: {
    type: String,
    required: true,
  },
  medService: {
    type: String,
  },
  healthCardUpToDate: {
    type: Boolean,
  },
  healthCardVigency: {
    type: String,
  },
  classes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Class',
  },
  contracts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Contract',
  },
});

memberSchema.pre('save', function (next) {
  if (!this.phone) {
    this.phone = '';
  }
  if (!this.email) {
    this.email = '';
  }
  if (!this.medService) {
    this.medService = '';
  }
  if (!this.healthCardUpToDate) {
    this.healthCardUpToDate = false;
  }
  next();
});

export default mongoose.model('Member', memberSchema);
