const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupons');
const Log = require('../models/Log');
const { v4: uuidv4 } = require('uuid');
const { protect } = require('../middleware/authMiddleware');

// Generate Coupon
router.post("/generate-coupon", protect, async (req, res) => {
    try {
        const { productId, discount, expirationDate } = req.body;

        // Validate input
        if (!productId || !discount || !expirationDate) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (discount < 1 || discount > 100) {
            return res.status(400).json({ error: "Discount must be between 1 and 100 percent" });
        }

        // Generate a unique coupon code
        const couponCode = uuidv4();

        // Create a new coupon
        const coupon = await Coupon.create({
            couponCode,
            productId,
            discount,
            expirationDate,
        });

        res.status(201).json({
            message: "Coupon generated successfully",
            coupon: {
                couponCode: coupon.couponCode,
                discount: `${coupon.discount}%`,
                expirationDate: coupon.expirationDate,
            },
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Validate Coupon for Specific User
router.post("/validate-coupon", protect, async (req, res) => {
    try {
        const { couponCode, productId } = req.body;

        // Get userId from the token (via protect middleware)
        const userId = req.user.id;

        // Validate input
        if (!couponCode || !productId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Find the coupon by couponCode and productId
        const coupon = await Coupon.findOne({ couponCode, productId });

        // If the coupon doesn't exist, return error
        if (!coupon) {
            return res.status(404).json({ error: "Invalid coupon or product" });
        }

        // Check if the coupon has already been used by the current user
        if (coupon.userId && coupon.userId.toString() === userId) {
            return res.status(400).json({ error: "Coupon already used by this user" });
        }

        // Check if the coupon is expired
        if (coupon.expirationDate < new Date()) {
            return res.status(400).json({ error: "Coupon expired" });
        }

        // Mark the coupon as used and associate it with the user
        coupon.isUsed = true;
        coupon.userId = userId;  // Associate coupon with the user
        await coupon.save();

        // Log the coupon usage
        await Log.create({
            requestType: "Validate Coupon",
            details: { couponCode, productId, userId },
        });

        // Return the discount details
        res.status(200).json({
            discount: `${coupon.discount}%`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
