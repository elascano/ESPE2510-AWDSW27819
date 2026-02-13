import Guardian from '../models/Guardian.js';
import StudentGuardian from '../models/StudentGuardian.js';

/**
 * Get students for a guardian
 * GET /api/guardians/:id/students
 */
export async function getGuardianStudents(req, res) {
  try {
    const guardianId = parseInt(req.params.id);
    
    if (isNaN(guardianId)) {
      return res.status(400).json({ error: 'Invalid guardian ID' });
    }

    const guardian = await Guardian.findOne({ id: guardianId });

    if (!guardian) {
      return res.status(404).json({ error: 'Guardian not found' });
    }

    // Fetch students with relationship information
    const relationships = await StudentGuardian
      .find({ guardianId: guardian._id })
      .populate('studentId', 'id firstName lastName gradeId');

    // Format response
    const formattedStudents = relationships.map(rel => ({
      StudentID: rel.studentId.id,
      FirstName: rel.studentId.firstName,
      LastName: rel.studentId.lastName,
      GradeID: rel.studentId.gradeId,
      Relationship: rel.relationship || 'Not specified'
    }));

    res.json(formattedStudents);
  } catch (error) {
    console.error('Error fetching guardian students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
