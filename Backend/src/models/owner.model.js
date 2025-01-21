import mongoose from "mongoose";
const OwnerDetailsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    carDetails: {
      carMake: { type: String, required: true },
      carModel: { type: String, required: true },
      registrationNumber: { type: String, required: true, unique: true },
      carColor: { type: String, required: true },
      carPicture:{type},
    },
    documents: {
      license: { type: String, required: true }, 
      registrationCertificate: { type: String, required: true }, 
    },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
});
  