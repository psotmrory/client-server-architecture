document.getElementById('getRoot').addEventListener('click', () => {
    fetch('http://localhost:3000/')  // Changed to http
        .then(response => response.text())
        .then(data => {
            // Додаємо отриманий HTML до сторінки, а не відображаємо як текст
            const output = document.getElementById('output');
            output.innerHTML = data;
        })
        .catch(err => displayOutput(`Error: ${err.message}`));
});

document.getElementById('postData').addEventListener('click', () => {
    const jsonData = prompt('Enter JSON data:');
    try {
        const parsedData = JSON.parse(jsonData); // Перевірка валідності JSON
        fetch('http://localhost:3000/data', {  // Changed to http
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(parsedData),
        })
            .then(response => response.json())
            .then(data => displayOutput(JSON.stringify(data, null, 2)))
            .catch(err => displayOutput(`Error: ${err.message}`));
    } catch (err) {
        displayOutput('Invalid JSON!');
    }
});

document.getElementById('getStatus').addEventListener('click', () => {
    fetch('http://localhost:3000/status')  // Changed to http
        .then(response => response.json())
        .then(data => displayOutput(JSON.stringify(data, null, 2)))
        .catch(err => displayOutput(`Error: ${err.message}`));
});

function displayOutput(message) {
    const output = document.getElementById('output');
    output.innerText = message; // Відображення тексту (наприклад, JSON або помилки)
}
