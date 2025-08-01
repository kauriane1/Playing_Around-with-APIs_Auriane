const express = require('express');
const app = express();

app.get('/', (req, res) => {
res.send('Hello from my API!');
});

app.listen(8080, '0.0.0.0', () => {
console.log('Server is running on port 8080');
});
