// backend/routes/ticketRoutes.js

const express = require('express');
const router = express.Router();

const { getTickets } = require('../controllers/ticketController');

// Route to get all tickets
// router.get('/', getTickets);
router.get('/', (req, res) => {
  console.log("Fetching tickets...");
  const sampleTickets = [
    { _id: "1", title: "Room AC not working", status: "OPEN" },
    { _id: "2", title: "Wi-Fi issue on 3rd floor", status: "OPEN" }
  ];
  return res.status(200).json(sampleTickets);
});
module.exports = router;