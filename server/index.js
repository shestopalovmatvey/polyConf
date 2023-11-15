const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.status(200).json('Сервер работает.')
});

app.listen(5000, () => {
    console.log('Server running on port 3000');
});