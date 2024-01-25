import Trainer from '../models/trainer.js';
import Admin from '../models/admin.js';
import SuperAdmin from '../models/superAdmin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user, userType;

    user = await Trainer.findOne({ email });
    userType = 'TRAINER';

    if (!user) {
      user = await Admin.findOne({ email });
      userType = 'ADMIN';
    }

    if (!user) {
      user = await SuperAdmin.findOne({ email });
      userType = 'SUPER';
    }
    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.sign(
          {
            sub: user._id,
            role: userType,
            exp: Date.now() + 60 * 60 * 24 * 30 * 1000,
          },
          secret,
        );

        return res.status(200).json({
          message: token,
        });
      } else {
        return res.status(401).json({
          message: 'Invalid password',
        });
      }
    } else {
      return res.status(404).json({
        message: 'User not found',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const verifyToken = async (req, res) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    const payload = jwt.verify(token, secret);
    if (Date.now() > payload.exp) {
      return res.status(401).json({
        message: 'token expired',
      });
    }
    res.status(200).json({
      message: payload,
    });
  } catch (error) {
    console.error(error);
  }
};

export default { login, verifyToken };
