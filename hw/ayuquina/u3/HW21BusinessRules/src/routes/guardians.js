import express from 'express';
import { getGuardianStudents } from '../controllers/guardianController.js';

const router = express.Router();

// Guardian relationships
router.get('/:id/students', getGuardianStudents);

export default router;
