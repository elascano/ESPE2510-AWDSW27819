import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  address: String,
  email: String,
  phone: String,
  gradeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grade'
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  medicalInfo: String,
  emergencyContact: String,
  emergencyPhone: String
}, {
  timestamps: true,
  collection: 'Student'
});

export default mongoose.model('Student', studentSchema);
