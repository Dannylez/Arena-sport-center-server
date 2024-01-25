import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import Admin from '../models/admin.js';
import bcrypt from 'bcrypt';

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    return res.status(200).json({
      data: admins,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const getAdminById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      data: undefined,
    });
  }
  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({
        message: `El usuario que estás buscando no existe`,
        data: undefined,
      });
    }
    return res.status(200).json({
      data: admin,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const createAdmin = async (req, res) => {
  const { firstName, lastName, email, phone, password, ci } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const alreadyExists = await Admin.findOne({ $or: [{ ci }, { email }] });
    if (alreadyExists) {
      return res.status(400).json({
        message: 'Ya existe un administrador con ese email o ci',
        data: req.body,
      });
    }
    const passHash = await bcrypt.hash(password, salt);
    const adminCreated = await Admin.create({
      firstName,
      lastName,
      email,
      phone,
      password: passHash,
      ci,
    });
    return res.status(200).json({
      message: 'Administrador creado exitosamente!',
      data: adminCreated,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      data: undefined,
    });
  }
  const { firstName, lastName, email, phone, password, ci } = req.body;
  try {
    const adminToUpdate = await Admin.findById(id);
    if (!adminToUpdate) {
      return res.status(404).json({
        message: 'El usuario que estás buscando no existe',
        data: undefined,
      });
    }
    const anAdminAlreadyHas = await Admin.findOne({ $or: [{ ci }, { email }] });
    if (anAdminAlreadyHas && !anAdminAlreadyHas?._id.equals(new ObjectId(id))) {
      return res.status(400).json({
        message: 'Ya existe un administrador con ese email o ci',
        data: req.body,
      });
    }
    const adminUpdated = await Admin.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      phone,
      password,
      ci,
    });
    return res.status(200).json({
      message: 'Admin actualizado exitosamente!',
      data: adminUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      data: undefined,
    });
  }
  try {
    const adminToDelete = await Admin.findByIdAndDelete(id);
    if (!adminToDelete) {
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
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
