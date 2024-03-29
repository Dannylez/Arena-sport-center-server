import mongoose from 'mongoose';

const { Schema } = mongoose;

const classSchema = new Schema({
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: true,
  },
  day: {
    type: String,
    enum: [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ],
    required: true,
  },
  startsAt: {
    type: String,
    length: 5,
    required: true,
  },
  endsAt: {
    type: String,
    length: 5,
    required: true,
  },
  room: {
    type: String,
    enum: ['Salón chico', 'Salón grande', 'Ambos salones'],
    required: true,
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Member',
  },
});

classSchema.pre('save', function (next) {
  if (!this.members) {
    this.members = [];
  }
  next();
});

export default mongoose.model('Class', classSchema);
