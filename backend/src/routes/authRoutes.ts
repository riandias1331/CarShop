import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import validateUser from '../utils/validator';

const route = Router();

route.post('/register', validateUser, registerUser);
route.post('/login', validateUser, loginUser);

export default route;

