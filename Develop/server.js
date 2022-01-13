const express = require('express');
const path = require('path');
let notes = require('./db/db.json');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.delete('/api/notes/:id', (req, res) => {
  let id = req.params.id
  notes = notes.filter(item => item.id != id)
  let newNotes = JSON.stringify(notes)
  fs.writeFile(path.join(__dirname, 'db/db.json'), newNotes, (err) =>
  err
    ? console.error(err)
    : console.log(
        'Success!'
      )
);

const response = {
  status: 'success',
  body: newNotes,
};

res.status(200).json(response);
})

app.get('/api/notes', (req, res) => res.json(notes));

app.post('/api/notes', (req, res) => {
  req.body.id = Math.floor(Math.random() * 100)
  notes.push(req.body)
  const newNotes = JSON.stringify(notes);

    // Write the string to a file
    fs.writeFile(path.join(__dirname, 'db/db.json'), newNotes, (err) =>
      err
        ? console.error(err)
        : console.log(
            'Success!'
          )
    );

    const response = {
      status: 'success',
      body: newNotes,
    };

    res.status(201).json(response);
  
 
});



app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);