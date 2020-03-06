const express = require('express');
const path = require('path');
const url = require('url');
const PORT = process.env.PORT || 5000;

express()
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => res.render('pages/index'))
	.get('/mail', function(req, res) {
		var parsedURL = url.parse(req.url, true);
		var params = parsedURL.query;
		var weight = parseFloat(params.weight);
		var mailType = params.mailType;
		var result = 0;

		console.log(weight);
		console.log(mailType);

		switch (mailType) {
			case '0': //stamped letter
				mailType = 'Stamped Letter';
				if (weight <= 1) {
					result = 0.55;
				}
				else if (weight > 1 && weight <= 2) {
					result = 0.7;
				}
				else if (weight > 2 && weight <= 3) {
					result = 0.85;
				}
				else if (weight > 3 && weight <= 3.5) {
					result = 1.0;
				}
				else if (weight > 3.5) {
					result = 'Letters over 3.5 ounces should be sent in a large envelope';
				}
				else {
					result = 'Error';
				}
				break;
			case '1': // metered letter
				mailType = 'Metered Letter';
				if (weight <= 1) {
					result = 0.5;
				}
				else if (weight > 1 && weight <= 2) {
					result = 0.65;
				}
				else if (weight > 2 && weight <= 3) {
					result = 0.8;
				}
				else if (weight > 3 && weight <= 3.5) {
					result = 0.95;
				}
				else if (weight > 3.5) {
					result = 'Letters over 3.5 ounces should be sent in a large envelope';
				}
				else {
					result = 'Error';
				}
				break;
			case '2': // large envelope (flats)
				mailType = 'Large Envelope';
				if (weight <= 1) {
					result = 1.0;
				}
				else if (weight > 1 && weight <= 2) {
					result = 1.2;
				}
				else if (weight > 2 && weight <= 3) {
					result = 1.4;
				}
				else if (weight > 3 && weight <= 4) {
					result = 1.6;
				}
				else if (weight > 4 && weight <= 5) {
					result = 1.8;
				}
				else if (weight > 5 && weight <= 6) {
					result = 2.0;
				}
				else if (weight > 6 && weight <= 7) {
					result = 2.2;
				}
				else if (weight > 7 && weight <= 8) {
					result = 2.4;
				}
				else if (weight > 8 && weight <= 9) {
					result = 2.6;
				}
				else if (weight > 9 && weight <= 10) {
					result = 2.8;
				}
				else if (weight > 10 && weight <= 11) {
					result = 3.0;
				}
				else if (weight > 11 && weight <= 12) {
					result = 3.2;
				}
				else if (weight > 12 && weight <= 13) {
					result = 3.4;
				}
				else {
					result = 'Error';
				}
				break;
			case '3': // first class package service
				mailType = 'First-Class Package Service';
				if (weight <= 5) {
					result = 3.8;
				}
				else if (weight > 5 && weight <= 9) {
					result = 4.6;
				}
				else if (weight > 9 && weight <= 12) {
					result = 5.3;
				}
				else if (weight > 12) {
					result = 5.9;
				}
				else {
					result = 'Error';
				}
				break;

			default:
				result = 'Error';
		}
		res.render('pages/results', {
			weight: weight,
			mailType: mailType,
			result: result
		});
	})
	.listen(PORT, () => console.log(`Listening on ${PORT}`));
