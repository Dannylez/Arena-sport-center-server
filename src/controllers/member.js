import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import Member from '../models/member.js';

const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find()
      .populate({
        path: 'classes',
        populate: { path: 'trainer' },
      })
      .populate('contracts');
    return res.status(200).json({
      data: members,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const getMemberById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      data: undefined,
    });
  }
  try {
    const member = await Member.findById(id)
      .populate({
        path: 'classes',
        populate: { path: 'trainer' },
      })
      .populate('contracts');
    if (!member) {
      return res.status(404).json({
        message: `El usuario que estás buscando no existe`,
        data: undefined,
      });
    }
    return res.status(200).json({
      data: member,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const createMember = async (req, res) => {
  const {
    firstName,
    lastName,
    ci,
    phone,
    email,
    birthDay,
    medService,
    healthCardUpToDate,
    healthCardVigency,
    classes,
    contracts,
  } = req.body;
  try {
    const alreadyExists = await Member.findOne({ ci });
    if (alreadyExists) {
      return res.status(400).json({
        message: 'Ya existe un alumno con ese ci',
        data: req.body,
      });
    }
    const memberCreated = await Member.create({
      firstName,
      lastName,
      ci,
      phone,
      email,
      birthDay,
      medService,
      healthCardUpToDate,
      healthCardVigency,
      classes,
      contracts,
    });
    return res.status(200).json({
      message: 'Alumno registrado exitosamente!',
      data: memberCreated,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const updateMember = async (req, res) => {
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
    ci,
    phone,
    email,
    birthDay,
    medService,
    healthCardUpToDate,
    healthCardVigency,
    classes,
    contracts,
  } = req.body;
  try {
    const memberToUpdate = await Member.findById(id);
    if (!memberToUpdate) {
      return res.status(404).json({
        message: 'El usuario que estás buscando no existe',
        data: undefined,
      });
    }
    const aMemberAlreadyHas = await Member.findOne({ ci });
    if (aMemberAlreadyHas && !aMemberAlreadyHas?._id.equals(new ObjectId(id))) {
      return res.status(400).json({
        message: 'Ya existe un alumno con ese ci',
        data: req.body,
      });
    }
    const memberUpdated = await Member.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        ci,
        phone,
        email,
        birthDay,
        medService,
        healthCardUpToDate,
        healthCardVigency,
        classes,
        contracts,
      },
      { new: true },
    );
    return res.status(200).json({
      message: 'Alumno actualizado exitosamente!',
      data: memberUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const deleteMember = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      data: undefined,
    });
  }
  try {
    const memberToDelete = await Member.findByIdAndDelete(id);
    if (!memberToDelete) {
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
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
