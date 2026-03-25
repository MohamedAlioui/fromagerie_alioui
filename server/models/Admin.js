import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, default: '' },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'commercial'], default: 'admin' },
  },
  { timestamps: true }
);

export default mongoose.model('Admin', adminSchema);
