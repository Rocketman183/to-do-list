const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

let port = process.env.PORT || 3000;

app.listen(3000, () => {
	console.log(`Sever is running on port ${port}`);
})

var items = [];

app.get('/to-do-list', (req, res) => {

	var date = new Date();

	var options = {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
	}

	var day = date.toLocaleDateString('ru-RU', options);


	res.render('list', { kindOfDay: day, newListItems: items });
})

app.post('/to-do-list', (req, res) => {
	let item = req.body.newItem;

	items.push(item);

	res.redirect('/to-do-list');
})