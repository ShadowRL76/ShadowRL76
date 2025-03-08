const term = new Terminal({
    cols: 80,
    rows: 24,
    cursorBlink: true,
    theme: {
        background: '#000000',
        foreground: '#1fce40',
    },
});

term.open(document.getElementById('terminal-container'));
term.write('Welcome to ShadowModZ Interactive Terminal\n$ ');

let inputBuffer = '';
term.onKey(({ key, domEvent }) => {
    if (domEvent.key === 'Enter') {
        term.write('\n');
        handleCommand(inputBuffer.trim());
        inputBuffer = '';
        term.write('$ ');
    } else if (domEvent.key === 'Backspace') {
        inputBuffer = inputBuffer.slice(0, -1);
        term.write('\b \b');
    } else {
        inputBuffer += key;
        term.write(key);
    }
});

function handleCommand(input) {
    if (input === 'help') {
        term.write('Available commands:\n- show-projects\n- get-jokes\n- status\n');
    } else if (input === 'show-projects') {
        term.write('My Projects:\n- SpectralForge: https://github.com/ShadowRL76/SpectralForge\n- Portfolio: https://github.com/ShadowRL76/Portfolio\n');
    } else if (input === 'get-jokes') {
        term.write('Why do programmers prefer dark mode? Because light attracts bugs!\n');
    } else if (input === 'status') {
        term.write('System Uptime: 876 hours, 23 minutes, 14 seconds\n');
    } else {
        term.write(`Unknown command: ${input}\n`);
    }
}
