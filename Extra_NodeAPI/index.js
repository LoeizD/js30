// Import Packages
const express = require('express');
const morgan = require('morgan');

// App
const app = express();

// Morgan
app.use(morgan('tiny'));

app.get('/api/', (req, res) => {
    res.json({ message: 'Hello world' })
});

// Starting server
app.listen('1337');