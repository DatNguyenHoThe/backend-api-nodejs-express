import express from 'express';
import authsController from '../../controllers/auths.controller';
import validateSchemaYup from '../../middlewares/validate.middleware';
import authsValidation from '../../validations/auths.validation';
import { authenticateToken } from '../../middlewares/auth.middleware'

const router = express.Router();

router.post('/login', validateSchemaYup(authsValidation.loginSchema), authsController.login);
router.get('/get-profile', authenticateToken, authsController.getProfile)

export default router