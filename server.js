const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname + '/views/partials') // tells handlebars where to find partials
app.set('view engine', 'hbs'); // key value pair to set view templating engine

app.use((req, res, next) => { // set current year and log requests to console
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url} `
	console.log(log)
	fs.appendFile('server.log', log + '\n', (err) => {
		console.log('unable to append to server log.  so sorry');
	});

	next();
})

app.use((req, res, next) => { // forward all requests to the maintenance page.
	res.render('maintenance.hbs')
})

app.use(express.static(__dirname + '/public'));  // points to static pages or files in public folder

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})


app.get('/', (req, res) => {
	// res.send(`<h1> Hi there </h1>`);
	res.render('home', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Hello and welcome to this shitty website',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		pageTitle: 'About Page',
	})
})

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'unable to fulfill this request',
	})
})

app.get('/name/:name', (req, res) => {
	res.send(req.params.name)
})

app.listen(port, () => {
	console.log(`Server is running on port ${port} 😍`)
}) 









































// const express = require('express');

// const app = express();

// app.get('/', (req, res) => {
// 	res.send('hello express');
// });

// app.listen(3000);