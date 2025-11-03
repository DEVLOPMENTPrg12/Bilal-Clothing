// routes/contactRoute.js
const express = require("express");
const { sendMessage, getAllContacts } = require("../controllers/contactController");

const router = express.Router();

// Route pour envoyer un message depuis le formulaire
router.post("/", sendMessage);

// Route pour récupérer tous les messages (optionnel pour dashboard admin)
router.get("/", getAllContacts);

module.exports = router;
