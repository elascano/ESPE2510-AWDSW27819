import express from 'express';
import {
  getStudyTime,
  getAge,
  getBirthdayCountdown,
  getStudentGuardians
} from '../controllers/studentController.js';

const router = express.Router();

// Student calculation endpoints
router.get('/:id/study-time', getStudyTime);
router.get('/:id/age', getAge);
router.get('/:id/birthday-countdown', getBirthdayCountdown);

// Student relationships
router.get('/:id/guardians', getStudentGuardians);

export default router;
