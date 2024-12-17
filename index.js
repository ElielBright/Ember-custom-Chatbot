const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Middleware to parse JSON requests
app.use(express.json());

// Basic route to check if the server is running
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Serve your main HTML file
});

// Endpoint to handle chat requests with custom responses
app.post('/api/chat', (req, res) => {
    const userInput = req.body.input.toLowerCase(); // Capture user input and make it lowercase

    // Define custom responses
    const responses = {
        "hello": "Hi there! How can I help you today?",
        "how are you": "I'm just a bot, but I'm doing great! How about you?",
        "what is your name": "I'm Ember, your virtual assistant.",
        "bye": "Goodbye! Have a great day!",
        "help": "Sure! You can ask me anything or type 'hello' to get started."
    };

    // Match user input to a response or provide a default
    const botResponse = responses[userInput] || "I'm sorry, I didn't understand that. Can you try asking something else?";

    // Send the response back to the frontend
    res.json({ response: botResponse });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
