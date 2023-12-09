import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import Payment from '../models/payment.js';

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('classToPay')
      .populate('member');
    return res.status(200).json({
      data: payments,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const getPaymentById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      data: undefined,
    });
  }
  try {
    const payment = await Payment.findById(id)
      .populate('classToPay')
      .populate('member');
    if (!payment) {
      return res.status(404).json({
        message: `El pago que estás buscando no existe`,
        data: undefined,
      });
    }
    return res.status(200).json({
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const createPayment = async (req, res) => {
  const { classToPay, member, paymentDate, paymentMonth, paid } = req.body;
  try {
    const alreadyExists = await Payment.findOne({
      classToPay,
      member,
      paymentMonth,
    });
    if (alreadyExists) {
      return res.status(400).json({
        message: 'Ya existe esta cuota',
        data: req.body,
      });
    }
    const paymentCreated = await Payment.create({
      classToPay,
      member,
      paymentDate,
      paymentMonth,
      paid,
    });
    return res.status(200).json({
      message: 'Cuota creada exitosamente!',
      data: paymentCreated,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const updatePayment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      data: undefined,
    });
  }
  const { classToPay, member, paymentDate, paymentMonth, paid } = req.body;
  try {
    const paymentToUpdate = await Payment.findById(id);
    if (!paymentToUpdate) {
      return res.status(404).json({
        message: 'La cuota que estás buscando no existe',
        data: undefined,
      });
    }
    const alreadyExists = await Payment.findOne({
      classToPay,
      member,
      paymentMonth,
    });
    if (alreadyExists && !alreadyExists?._id.equals(new ObjectId(id))) {
      return res.status(400).json({
        message: 'Ya existe esta cuota',
        data: req.body,
      });
    }
    const paymentUpdated = await Payment.findByIdAndUpdate(id, {
      classToPay,
      member,
      paymentDate,
      paymentMonth,
      paid,
    });
    return res.status(200).json({
      message: 'Cuota actualizada exitosamente!',
      data: paymentUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const deletePayment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      data: undefined,
    });
  }
  try {
    const paymentToDelete = await Payment.findByIdAndDelete(id);
    if (!paymentToDelete) {
      return res.status(404).json({
        message: 'La cuota que estás buscando no existe',
        data: undefined,
      });
    }
    return res.status(200).json({
      message: 'Cuota eliminada exitosamente!',
      data: undefined,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

export default {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
