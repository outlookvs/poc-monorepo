import express from 'express';
import { registerTenant, registerUser, login } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register-tenant', registerTenant);
router.post('/register-user', registerUser);
router.post('/login', login);

export default router;
