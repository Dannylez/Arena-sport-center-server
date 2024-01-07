import mongoose from 'mongoose';
import Activity from '../models/activity.js';

const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    return res.status(200).json({
      data: activities,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const createActivity = async (req, res) => {
  const { name } = req.body;
  try {
    const activityCreated = await Activity.create({
      name,
    });
    return res.status(200).json({
      message: 'Actividad creada exitosamente!',
      data: activityCreated,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error,
    });
  }
};

const deleteActivity = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: 'ID inválido',
      data: undefined,
    });
  }
  try {
    const activityToDelete = await Activity.findByIdAndDelete(id);
    if (!activityToDelete) {
      return res.status(404).json({
        message: 'La actividad que estas buscando no existe',
        data: undefined,
      });
    }
    return res.status(200).json({
      message: 'Activitdad eliminado exitosamente!',
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
  getAllActivities,
  createActivity,
  deleteActivity,
};
