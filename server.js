const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');

const server = express();
const port = process.env.PORT || 3030;

const db = knex(knexConfig.development);

server.use(express.json());

server.get('/', (req, res) => {
    res.send('howdy friendo');
});

server.get('/users', (req, res) => {
    db.select('name')
        .from('users')
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err));
})

server.post('/users', (req, res) => {
    const newUser = req.body;

    console.log(newUser);

    db.insert(newUser)
        .into('users')
        .then(ids => res.status(201).json(ids))
        .catch(err => res.status(500).json(err));
});


server.listen(port, () => console.log(`The server is listening on port ${port}`));