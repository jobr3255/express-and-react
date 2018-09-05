const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');

const app = express();

var mysql      = require('mysql');

var connection = mysql.createConnection({
	host     : process.env.AWS_HVZ_HOST,
	user     : process.env.AWS_HVZ_USER,
	password : process.env.AWS_HVZ_PASS,
	database : process.env.AWS_HVZ_NAME
});

connection.connect();
app.get('/api/users', (req, res) => {
	connection.query('SELECT * from users', function(err, rows, fields) {
		if (!err) {
      toSend = {
        data: JSON.stringify(rows)
      };
      res.send(rows);
		} else {
			console.log('Error while performing Query.');
		}
	});
});


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

app.get('/api/something', (req, res) => {
  res.send({ data: 'SOMETHING' });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
