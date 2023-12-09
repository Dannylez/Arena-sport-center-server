import mongoose from 'mongoose';

const { Schema } = mongoose;

const paymentSchema = new Schema({
  contractToPay: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract',
    required: true,
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
  },
  paymentDate: {
    type: String,
    required: true,
  },
  paymentMonth: {
    type: String,
    enum: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model('Payment', paymentSchema);
