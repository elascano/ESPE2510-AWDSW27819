import mongoose from 'mongoose';

const studentGuardianSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  guardianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guardian',
    required: true
  },
  relationship: {
    type: String,
    required: true
  },
  isPrimary: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'StudentGuardian'
});

// Index for faster lookups
studentGuardianSchema.index({ studentId: 1 });
studentGuardianSchema.index({ guardianId: 1 });

export default mongoose.model('StudentGuardian', studentGuardianSchema);
