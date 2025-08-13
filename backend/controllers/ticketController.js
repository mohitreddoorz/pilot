// backend/controllers/ticketController.js

const Ticket = require('../models/Ticket');

const getTickets = async (req, res) => {
    try {
        // Find all tickets and sort by newest first
        const tickets = await Ticket.find({}).sort({ createdAt: -1 });
        console.log("Yes, tickets found:", tickets.length);
        // Convert image buffers to a format the frontend can use
        const ticketsWithImages = tickets.map(ticket => {
            const ticketObject = ticket.toObject(); // Convert Mongoose document to plain object
            if (ticketObject.images && ticketObject.images.length > 0) {
                ticketObject.images = ticketObject.images.map(image => ({
                    ...image,
                    // Create a Base64 Data URI for the img src attribute
                    dataURI: `data:${image.contentType};base64,${image.data.toString('base64')}`
                }));
            }
            return ticketObject;
        });

        res.json(ticketsWithImages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getTickets,
};