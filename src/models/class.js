import mongoose from 'mongoose';

const { Schema } = mongoose;

const classSchema = new Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 20,
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
    required: true,
  },
});

export default mongoose.model('Class', classSchema);
