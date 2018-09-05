const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
var mysql      = require('mysql');
/*
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'test'
});
connection.connect();
app.get('/users', (req, res) => {
	//connection.connect();
	connection.query('SELECT * from users', function(err, rows, fields) {
		if (!err) {
      console.log(rows[0]);
      //res.send(rows);
      //var toSend = JSON.stringify( { data: [{ id: 1, name: 'Josh' }, {id: 2, name: Jeremy }] });
      //console.log(toSend);

      toSend = {
        data: JSON.stringify(rows)
      };
      res.send(rows);
      //res.send({ data: 'Hello From Express' });
		} else {
			console.log('Error while performing Query.');
		}
	});
});
*/
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
