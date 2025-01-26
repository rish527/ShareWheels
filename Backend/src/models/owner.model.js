import mongoose from "mongoose";
const OwnerDetailsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    carDetails: {
      registrationNumber: { type: String, required: true, unique: true },
      carPicture:{ type: String, required: true, unique: true },
    },
    documents: {
      license: { type: String, required: true }, 
      registrationCertificate: { type: String, required: true }, 
    },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
});

const Owner=mongoose.model("Owner",OwnerDetailsSchema);
export default Owner;
  