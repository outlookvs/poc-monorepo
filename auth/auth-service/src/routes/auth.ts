import express from 'express';
import { registerTenant, registerUser, login, listTenantsAndUsers } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register-tenant', registerTenant);
router.post('/register-user', registerUser);
router.post('/login', login);
router.get('/tenants-users', listTenantsAndUsers);

export default router;
