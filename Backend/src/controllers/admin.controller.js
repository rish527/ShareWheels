import Owner from "../models/owner.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getOwnerRequests = async (req, res) => {
    try {
        const owners = await Owner.find({ status: "Pending" });
        res.status(200).json(owners);
    } catch (error) {
        console.log("Error in getOwnerRequests Controller:", error.message);
        return res.status(400).json({ message: "Internal Server Error" });
    }
}

export const approveOwner = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the owner by ID and populate user details
        const owner = await Owner.findById(id);
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        const user = await User.findById(owner.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.role.includes("Owner")) {
            user.role.push("Owner"); // Use push to add "Owner" to the role array
            await user.save();
        }

        // Update the status to 'Approved'
        owner.status = "Approved";
        await owner.save();

        res.status(200).json({
            message: "Owner approved successfully",
            // owner: {
            //     _id: owner._id,
            //     registrationNumber: owner.registrationNumber,
            //     user: owner.userId, // Populated user details
            //     status: owner.status,
            // },
        });
    } catch (error) {
        console.error("Error in approveOwner Controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.log("Error in getUsers Controller:", error.message);
        return res.status(400).json({ message: "Internal Server Error" });
    }
}
