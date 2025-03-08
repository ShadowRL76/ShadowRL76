// Initialize Terminal
const term = new Terminal({
    cols: 80,
    rows: 24,
    cursorBlink: true,
    theme: {
        background: '#000000', // Black background
        foreground: '#1fce40', // Green text
    },
});

term.open(document.getElementById('terminal-container'));
term.write('Welcome to ShadowModZ Interactive Terminal\n$ ');

let inputBuffer = '';

// Handle Key Events
term.onKey(({ key, domEvent }) => {
    if (domEvent.key === 'Enter') {
        term.write('\n'); // Move to a new line
        handleCommand(inputBuffer.trim()); // Process command
        inputBuffer = ''; // Clear buffer
        term.write('$ '); // Add prompt
    } else if (domEvent.key === 'Backspace') {
        if (inputBuffer.length > 0) { // Prevent negative length
            inputBuffer = inputBuffer.slice(0, -1); // Remove last character
            term.write('\b \b'); // Visually clear last character
        }
    } else {
        inputBuffer += key; // Add character to buffer
        term.write(key); // Display character on terminal
    }
});

// Handle Commands
function handleCommand(input) {
    switch (input) {
        case 'help':
            term.write('Available commands:\n- show-projects\n- get-jokes\n- status\n');
            break;
        case 'show-projects':
            term.write('My Projects:\n- SpectralForge: https://github.com/ShadowRL76/SpectralForge\n- Portfolio: https://github.com/ShadowRL76/Portfolio\n');
            break;
        case 'get-jokes':
            term.write('Why do programmers prefer dark mode? Because light attracts bugs!\n');
            break;
        case 'status':
            term.write(`System Uptime: ${getUptime()}\n`);
            break;
        default:
            term.write(`Unknown command: ${input}\n`);
            break;
    }
}

// Calculate Uptime
const startTime = new Date('2025-01-01T00:00:00Z'); // Example start time
function getUptime() {
    const now = new Date();
    const diff = Math.floor((now - startTime) / 1000); // Seconds
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}
