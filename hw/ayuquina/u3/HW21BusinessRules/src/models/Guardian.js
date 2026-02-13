import mongoose from 'mongoose';

const guardianSchema = new mongoose.Schema({
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
  relationship: {
    type: String,
    required: true
  },
  phone: String,
  email: String,
  address: String,
  occupation: String,
  workPhone: String,
  isActive: {
    type: Boolean,
    default: true
  },
  isEmergencyContact: {
    type: Boolean,
    default: false
  },
  isAuthorizedPickup: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: 'Guardian'
});

export default mongoose.model('Guardian', guardianSchema);
