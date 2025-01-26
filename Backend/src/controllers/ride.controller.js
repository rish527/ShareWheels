import Ride from "../models/ride.model.js";
import User from "../models/user.model.js";
import Owner from "../models/owner.model.js";

export const createRide = async (req, res) => {
  try {
    const { ownerId, startLocation, endLocation, availableSeats, price } = req.body;
    // console.log(endLocation);
    // Validate required fields
    if (!ownerId || !startLocation || !endLocation || !availableSeats || !price) {
        return res.status(400).json({ message: "All fields are required." });
      }

    // Check if the owner exists
    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found." });
    }

    // Create a new ride
    const newRide = new Ride({
      carOwner: ownerId,
      startPlace:startLocation,
      endPlace:endLocation,
      currentPlace:startLocation,
      availableSeats,
      totalFare:price,
    });

    // Save the ride to the database
    const savedRide = await newRide.save();

    res.status(201).json({
      message: "Ride created successfully.",
      ride: savedRide,
    });
  } catch (error) {
    console.error("Error in createRide Controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
