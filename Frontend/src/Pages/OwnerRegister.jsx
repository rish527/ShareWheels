import React, { useState } from "react";
import { useAuthStore } from "../Store/useAuthStore"; // Ensure the path to your authStore is correct
import { toast } from "react-hot-toast";
import {useNavigate } from "react-router-dom";

function OwnerRegistration() {
  const { ownerRegister, isRegistering } = useAuthStore();
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    registrationNumber: "",
    carPicture: "",
    license: "",
    registrationCertificate: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle image upload as Base64
  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Image = reader.result;
      setFormData((prev) => ({ ...prev, [fieldName]: base64Image }));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form Validation
    if (!formData.registrationNumber.trim()) {
      toast.error("Vehicle Registration Number is required");
      return;
    }
    if (!formData.carPicture) {
      toast.error("Car picture is required");
      return;
    }
    if (!formData.license) {
      toast.error("Driving license is required");
      return;
    }
    if (!formData.registrationCertificate) {
      toast.error("Registration Certificate is required");
      return;
    }

    try {
      await ownerRegister(formData);
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Failed to submit the registration request.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-lg bg-base-100">
        <h2 className="text-2xl font-bold mb-4">Owner Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Vehicle Registration Number */}
          <div>
            <label className="block text-sm font-medium mb-1">Vehicle Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              className="input input-bordered w-full"
              placeholder="Enter vehicle registration number"
              value={formData.registrationNumber}
              onChange={(e) =>
                setFormData({ ...formData, registrationNumber: e.target.value })
              }
            />
          </div>

          {/* Car Picture */}
          <div>
            <label className="block text-sm font-medium mb-1">Car Picture</label>
            <input
              type="file"
              name="carPicture"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={(e) => handleImageUpload(e, "carPicture")}
            />
          </div>

          {/* Driving License */}
          <div>
            <label className="block text-sm font-medium mb-1">Driving License</label>
            <input
              type="file"
              name="license"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={(e) => handleImageUpload(e, "license")}
            />
          </div>

          {/* Registration Certificate */}
          <div>
            <label className="block text-sm font-medium mb-1">Registration Certificate</label>
            <input
              type="file"
              name="registrationCertificate"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={(e) => handleImageUpload(e, "registrationCertificate")}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`btn bg-primary text-white w-full ${isRegistering ? "loading" : ""}`}
            disabled={isRegistering}
          >
            {isRegistering ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OwnerRegistration;
