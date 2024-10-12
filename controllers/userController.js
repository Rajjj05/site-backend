// controllers/userController.js
const { users } = require("@clerk/clerk-sdk-node");
const User = require("../models/userModel"); // Your User model

// Handle Clerk webhooks
const handleWebhook = async (req, res) => {
  const { type, data } = req.body;

  try {
    if (type === "user.created" || type === "user.updated") {
      // Extract user information from the webhook data
      const { id, emailAddresses, phoneNumbers } = data;

      // Upsert user into your MongoDB database
      const user = await User.findOneAndUpdate(
        { clerkId: id },
        {
          email:
            emailAddresses.length > 0 ? emailAddresses[0].emailAddress : null,
          phoneNumber:
            phoneNumbers.length > 0 ? phoneNumbers[0].phoneNumber : null,
        },
        { upsert: true, new: true }
      );

      console.log(`User ${user.email} has been stored/updated.`);
    }

    res.status(200).send("Webhook received");
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { handleWebhook };
