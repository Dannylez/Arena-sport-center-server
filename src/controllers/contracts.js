import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import Contract from '../models/contract.js';

const getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find().populate('activity');
    return res.status(200).json({
      data: contracts,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const getContractById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      data: undefined,
    });
  }
  try {
    const contract = await Contract.findById(id).populate('activity');
    if (!contract) {
      return res.status(404).json({
        message: `El servicio que estás buscando no existe`,
        data: undefined,
      });
    }
    return res.status(200).json({
      data: contract,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const createContract = async (req, res) => {
  const { name, activity, description, price } = req.body;
  try {
    const alreadyExists = await Contract.findOne({ name });
    if (alreadyExists) {
      return res.status(400).json({
        message: 'Ya existe un servicio con ese nombre',
        data: req.body,
      });
    }
    const contractCreated = await Contract.create({
      name,
      activity,
      description,
      price,
    });
    return res.status(200).json({
      message: 'Servicio creado exitosamente!',
      data: contractCreated,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const updateContract = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      data: undefined,
    });
  }
  const { name, activity, description, price } = req.body;
  try {
    const contractToUpdate = await Contract.findById(id);
    if (!contractToUpdate) {
      return res.status(404).json({
        message: 'El servicio que estás buscando no existe',
        data: undefined,
      });
    }
    const alreadyExists = await Contract.findOne({ name });
    if (alreadyExists && !alreadyExists?._id.equals(new ObjectId(id))) {
      return res.status(400).json({
        message: 'Ya existe un servicio con ese nombre',
        data: req.body,
      });
    }
    const contractUpdated = await Contract.findByIdAndUpdate(id, {
      name,
      activity,
      description,
      price,
    });
    return res.status(200).json({
      message: 'Servicio actualizado exitosamente!',
      data: contractUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const deleteContract = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      data: undefined,
    });
  }
  try {
    const contractToDelete = await Contract.findByIdAndDelete(id);
    if (!contractToDelete) {
      return res.status(404).json({
        message: 'El servicio que estas buscando no existe',
        data: undefined,
      });
    }
    return res.status(200).json({
      message: 'Servicio eliminado exitosamente!',
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
  getAllContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract,
};
