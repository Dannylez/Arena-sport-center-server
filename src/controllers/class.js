import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import Class from '../models/class.js';
import { isAfter, isBefore, parse } from 'date-fns';

const existingClass = async (req, res, day, start, end, room) => {
  const classesThatDay = await Class.find({ day });
  const newClassStart = parse(start, 'HH:mm', new Date());
  const newClassEnd = parse(end, 'HH:mm', new Date());

  const foundClass = classesThatDay.find((element) => {
    const classStart = parse(element.startsAt, 'HH:mm', new Date());
    const classEnd = parse(element.endsAt, 'HH:mm', new Date());
    return (
      isBefore(classStart, newClassEnd) &&
      isAfter(classEnd, newClassStart) &&
      (element.room === 'Ambos salones' ||
        element.room === room ||
        room === 'Ambos salones')
    );
  });

  if (foundClass) {
    return foundClass;
  }

  return undefined;
};

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('trainer').populate('members');
    return res.status(200).json({
      data: classes,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const getClassById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      data: undefined,
    });
  }
  try {
    const selectedClass = await Class.findById(id)
      .populate('trainer')
      .populate('members');
    if (!selectedClass) {
      return res.status(404).json({
        message: `La clase que estás buscando no existe`,
        data: undefined,
      });
    }
    return res.status(200).json({
      data: selectedClass,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const createClass = async (req, res) => {
  const { name, day, startsAt, endsAt, room, trainer, members } = req.body;
  try {
    const classExists = await existingClass(
      req,
      res,
      day,
      startsAt,
      endsAt,
      room,
    );
    if (classExists !== undefined) {
      return res.status(400).json({
        message: 'Ya existe una clase en ese día, horario y lugar',
        data: req.body,
      });
    }
    const classCreated = await Class.create({
      name,
      day,
      startsAt,
      endsAt,
      room,
      trainer,
      members,
    });
    return res.status(200).json({
      message: 'Clase creada exitosamente!',
      data: classCreated,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const updateClass = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      data: undefined,
    });
  }
  const { name, day, startsAt, endsAt, room, trainer, members } = req.body;
  try {
    const classToUpdate = await Class.findById(id);
    if (!classToUpdate) {
      return res.status(404).json({
        message: 'La clase que estás buscando no existe',
        data: undefined,
      });
    }
    const classExists = await existingClass(
      req,
      res,
      day,
      startsAt,
      endsAt,
      room,
    );
    if (classExists !== undefined && !classExists?._id.equals(new ObjectId(id)))
      return res.status(400).json({
        message: 'Ya existe una clase en ese día, horario y lugar',
        data: req.body,
      });
    const classUpdated = await Class.findByIdAndUpdate(id, {
      name,
      day,
      startsAt,
      endsAt,
      room,
      trainer,
      members,
    });
    return res.status(200).json({
      message: 'Clase actualizada exitosamente!',
      data: classUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const deleteClass = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      data: undefined,
    });
  }
  try {
    const classToDelete = await Class.findByIdAndDelete(id);
    if (!classToDelete) {
      return res.status(404).json({
        message: 'La clase que estás buscando no existe',
        data: undefined,
      });
    }
    return res.status(200).json({
      message: 'Clase eliminada exitosamente!',
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
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};
