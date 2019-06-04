const express = require('express');
const firebase = require('firebase');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser());
app.set('view engine', 'ejs');

firebase.initializeApp({
  apiKey: "AIzaSyCGpfb4f7aisiXGyolC0nvdQd3W1S63RAU",
  authDomain: "squadtop.firebaseapp.com",
  databaseURL: "https://squadtop.firebaseio.com",
  projectId: "squadtop",
  storageBucket: "squadtop.appspot.com",
  messagingSenderId: "151443633590",
  appId: "1:151443633590:web:0a3beedc214393de"
});

const db = firebase.database();

app.get('/', (req, res) => {
  db.ref('/').once('value').then((data) => {
    res.render('home', {lista: Object.keys(data.val()).map(key => data.val()[key])});
  });
});

app.post('/', (req, res) => {
  db.ref('/').push(req.body);
  res.redirect('/');
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
})