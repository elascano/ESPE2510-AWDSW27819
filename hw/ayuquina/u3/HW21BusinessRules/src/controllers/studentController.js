import Student from '../models/Student.js';
import { calculateDateDifference, calculateBirthdayCountdown, formatDate } from '../services/dateCalculations.js';

/**
 * Get student study time (time since enrollment)
 * GET /api/students/:id/study-time
 */
export async function getStudyTime(req, res) {
  try {
    const studentId = parseInt(req.params.id);
    
    if (isNaN(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    const student = await Student.findOne({ id: studentId });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    if (!student.enrollmentDate) {
      return res.status(400).json({ error: 'Student has no enrollment date' });
    }

    const today = new Date();
    const enrollmentDate = new Date(student.enrollmentDate);
    
    if (isNaN(enrollmentDate.getTime())) {
      return res.status(400).json({ error: 'Invalid enrollment date' });
    }

    const diff = calculateDateDifference(enrollmentDate, today);

    res.json({
      studentId: student.id,
      years: diff.years,
      months: diff.months,
      days: diff.days,
      totalDays: diff.totalDays,
      since: formatDate(enrollmentDate),
      asOf: formatDate(today)
    });
  } catch (error) {
    console.error('Error calculating study time:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Get student age
 * GET /api/students/:id/age
 */
export async function getAge(req, res) {
  try {
    const studentId = parseInt(req.params.id);
    
    if (isNaN(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    const student = await Student.findOne({ id: studentId });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    if (!student.birthDate) {
      return res.status(400).json({ error: 'Student has no birth date' });
    }

    const today = new Date();
    const birthDate = new Date(student.birthDate);
    
    if (isNaN(birthDate.getTime())) {
      return res.status(400).json({ error: 'Invalid birth date' });
    }

    const age = calculateDateDifference(birthDate, today);

    res.json({
      studentId: student.id,
      years: age.years,
      months: age.months,
      days: age.days,
      totalDays: age.totalDays,
      birthDate: formatDate(birthDate),
      asOf: formatDate(today)
    });
  } catch (error) {
    console.error('Error calculating age:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Get birthday countdown
 * GET /api/students/:id/birthday-countdown
 */
export async function getBirthdayCountdown(req, res) {
  try {
    const studentId = parseInt(req.params.id);
    
    if (isNaN(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    const student = await Student.findOne({ id: studentId });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    if (!student.birthDate) {
      return res.status(400).json({ error: 'Student has no birth date' });
    }

    const birthDate = new Date(student.birthDate);
    
    if (isNaN(birthDate.getTime())) {
      return res.status(400).json({ error: 'Invalid birth date' });
    }

    const today = new Date();
    const countdown = calculateBirthdayCountdown(birthDate, today);

    res.json({
      studentId: student.id,
      daysUntil: countdown.daysUntil,
      nextBirthday: countdown.nextBirthday,
      asOf: formatDate(today)
    });
  } catch (error) {
    console.error('Error calculating birthday countdown:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Get guardians for a student
 * GET /api/students/:id/guardians
 */
export async function getStudentGuardians(req, res) {
  try {
    const studentId = parseInt(req.params.id);
    
    if (isNaN(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    // Import here to avoid circular dependency
    const StudentGuardian = (await import('../models/StudentGuardian.js')).default;
    
    const student = await Student.findOne({ id: studentId });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Fetch guardians with relationship information
    const relationships = await StudentGuardian
      .find({ studentId: student._id })
      .populate('guardianId', 'id firstName lastName');

    // Format response
    const formattedGuardians = relationships.map(rel => ({
      GuardianID: rel.guardianId.id,
      FirstName: rel.guardianId.firstName,
      LastName: rel.guardianId.lastName,
      Relationship: rel.relationship || 'Not specified'
    }));

    res.json(formattedGuardians);
  } catch (error) {
    console.error('Error fetching student guardians:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
