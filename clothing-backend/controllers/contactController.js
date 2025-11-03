const Contact = require("../models/Contact");

// POST contact
const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

// GET all contacts (optional)
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, contacts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch contacts." });
  }
};

module.exports = { sendMessage, getAllContacts };
