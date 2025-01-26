import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  carOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner', // Reference to the Owner model
    required: true,
  },
  carOwnerContact: {
    type: String,
  },
  riders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the Rider model
    },
  ],
  rideStatus: {
    type: String,
    enum: ["Scheduled", "In Progress", "Completed", "Cancelled"],
    default: "Scheduled",
  },
  rideStart: {
    type: String,
  },
  rideEnd: {
    type: String,
  },
  startPlace: {
    type: String,
    required: true,
  },
  endPlace: {
    type: String,
    required: true,
  },
  currentPlace: {
    type: String,
    required: true,
  },
  progress: {
    type: String, // e.g., "62%"
    default: "0",
  },
  securityStatus: {
    type: String,
    enum: ["Safe", "Stage1","Stage2","Stage3"],
    default: "Safe",
  },
  farePerPerson: {
    type: Number,
  },
  totalFare: {
    type: Number,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

// Create the model
const Ride = mongoose.model('Ride', rideSchema);
export default Ride;
