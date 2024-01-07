import mongoose from 'mongoose';

const { Schema } = mongoose;

const activitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Activity', activitySchema);
