// Function to display the user's message
function displayUserMessage(message) {
    const chatWindow = document.getElementById('chat-window');
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'chat-message user-message';
    userMessageElement.innerHTML = `<p>${message}</p>`;
    chatWindow.appendChild(userMessageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Function to display the bot's message
function displayBotMessage(message) {
    const chatWindow = document.getElementById('chat-window');

    // Hide the typing indicator when the bot finishes typing
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.style.display = 'none';
    }

    const botMessageElement = document.createElement('div');
    botMessageElement.className = 'chat-message bot-message';
    botMessageElement.innerHTML = `<p>${message}</p>`;
    chatWindow.appendChild(botMessageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
}

// Function to show the typing indicator
function showTypingIndicator() {
    const chatWindow = document.getElementById('chat-window');
    
    // Remove any existing typing indicator to prevent duplicates
    const existingTypingIndicator = document.querySelector('.typing-indicator');
    if (existingTypingIndicator) {
        existingTypingIndicator.remove();
    }
    
    // Create and append the new typing indicator
    const typingElement = document.createElement('div');
    typingElement.className = 'chat-message typing-indicator';
    typingElement.innerHTML = `
        <div class="typing-indicator"></div>
        <div class="typing-indicator"></div>
        <div class="typing-indicator"></div>
    `;
    chatWindow.appendChild(typingElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
}

// Function to display the bot's message and hide the typing indicator
function displayBotMessage(message) {
    const chatWindow = document.getElementById('chat-window');
    
    // Hide the typing indicator when the bot finishes typing
    const typingElement = document.querySelector('.typing-indicator');
    if (typingElement) {
        typingElement.remove(); // Remove the typing indicator
    }

    const botMessageElement = document.createElement('div');
    botMessageElement.className = 'chat-message bot-message';
    botMessageElement.innerHTML = `<p>${message}</p>`;
    chatWindow.appendChild(botMessageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
}

// Function to send the user's message
function sendMessage(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    const userMessage = document.getElementById('user-input').value.trim();
    if (!userMessage) return; // Do nothing if the input is empty

    displayUserMessage(userMessage); // Display the user's message

    // Show typing indicator while waiting for the bot's response
    showTypingIndicator();

    // Send the user's message to the backend
    fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: userMessage })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Chatbot response:', data.response);
        displayBotMessage(data.response); // Display the bot's response
    })
    .catch(error => {
        console.error('Error:', error);
        displayBotMessage("Oops! Something went wrong. Please try again later.");
    });

    // Clear the input field after sending the message
    document.getElementById('user-input').value = '';
}

// Add an event listener to the form, not the button, to handle form submission
document.getElementById('chat-form').addEventListener('submit', sendMessage);
