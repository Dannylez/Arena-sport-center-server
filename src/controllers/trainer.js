import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import Trainer from '../models/trainer.js';
import bcrypt from 'bcrypt';

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find().populate({
      path: 'classes',
      populate: [{ path: 'members' }, { path: 'activity' }],
    });
    return res.status(200).json({
      data: trainers,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const getTrainerById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      data: undefined,
    });
  }
  try {
    const trainer = await Trainer.findById(id).populate({
      path: 'classes',
      populate: [{ path: 'members' }, { path: 'activity' }],
    });
    if (!trainer) {
      return res.status(404).json({
        message: `El usuario que estás buscando no existe`,
        data: undefined,
      });
    }
    return res.status(200).json({
      data: trainer,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const createTrainer = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    ci,
    birthDay,
    phone,
    medService,
    classes,
    fee,
    feeHistory,
  } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const alreadyExists = await Trainer.findOne({ $or: [{ ci }, { email }] });
    if (alreadyExists) {
      return res.status(400).json({
        message: 'Ya existe un profesor con ese email o ci',
        data: req.body,
      });
    }

    const passHash = await bcrypt.hash(password, salt);
    const trainerCreated = await Trainer.create({
      firstName,
      lastName,
      email,
      password: passHash,
      ci,
      birthDay,
      phone,
      medService,
      classes,
      fee,
      feeHistory,
    });
    return res.status(200).json({
      message: 'Profesor registrado exitosamente!',
      data: trainerCreated,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: error.message,
      error,
    });
  }
};

const updateTrainer = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      data: undefined,
    });
  }
  const {
    firstName,
    lastName,
    email,
    password,
    ci,
    birthDay,
    phone,
    medService,
    classes,
    fee,
    feeHistory,
  } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const trainerToUpdate = await Trainer.findById(id);
    if (!trainerToUpdate) {
      return res.status(404).json({
        message: 'El usuario que estás buscando no existe',
        data: undefined,
      });
    }
    const alreadyExists = await Trainer.findOne({
      $or: [{ ci }, { email }],
    });
    if (alreadyExists && !alreadyExists?._id.equals(new ObjectId(id))) {
      return res.status(400).json({
        message: 'Ya existe un profesor con ese email o ci',
        data: req.body,
      });
    }
    const passHash = await bcrypt.hash(password, salt);
    const trainerUpdated = await Trainer.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      password: passHash,
      ci,
      birthDay,
      phone,
      medService,
      classes,
      fee,
      feeHistory,
    });
    return res.status(200).json({
      message: 'Profesor actualizado exitosamente!',
      data: trainerUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const deleteTrainer = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      data: undefined,
    });
  }
  try {
    const trainerToDelete = await Trainer.findByIdAndDelete(id);
    if (!trainerToDelete) {
      return res.status(404).json({
        message: 'El usuario que estas buscando no existe',
        data: undefined,
      });
    }
    return res.status(200).json({
      message: 'Usuario eliminado exitosamente!',
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
  getAllTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer,
};
