import mongoose from "mongoose";

const passengerSchema=mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  aadhaarNumber: { type: String, required: true, unique: true },
  documents: {
    aadhaarCard: { type: String, required: true },  
  },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Approved' },
})