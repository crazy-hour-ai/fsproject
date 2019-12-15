// load libraries
const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const morgan = require('morgan');
const db = require('./dbutil');
const cors = require('cors');
const configss = require('./config')

const aws = require('aws-sdk');

const s3 = new aws.S3({
	endpoint: new aws.Endpoint('sgp1.digitaloceanspaces.com'),
	accessKeyId: configss.s3.accessKey,
	secretAccessKey: configss.s3.secret
})

let config;

if (fs.existsSync(__dirname + '/config.js')) {
	config = require(__dirname + '/config');
	console.log('config:', __dirname + '/config.js');
	config.ssl = {
		ca: fs.readFileSync(config.mysql.cacert)
	};
} else {
	console.info('using env');
	config = {
		mysql: {
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: 'restaurant',
			connectionLimit: 4,
			ssl: {
				ca: process.env.DB_CA
			}
		},
		s3: {
			accessKey: process.env.S3_HOST,
			secret: process.env.S3_SECRET

		}
	};
}

// configurations
const pool = mysql.createPool(config.mysql);
const PORT = parseInt(process.argv[2] || process.env.APP_PORT || process.env.PORT) || 3000;

// SQL statements

const CREATE_CONTACT = 'insert into contact(firstname, lastname, tel, email,message,contacttype) values(?,?,?,?,?,?)';
const GET_ALL_CONTACT = 'select * from contact order by contact_id desc';

const CREATE_COMMENT = 'insert into comments(author) values(?)';
// const GET_COMMENT = 'select * from comments join restaurants where comments.restaurant_id = restaurants.id';
const GET_COMMENT = 'select * from comments ';

const GET_ALL_ORDERS = 'select * from restaurants';
const FIND_ORDER_BY_ID = 'select * from restaurants r where r.id = ?';

const GET_RESTAURANT_BY_NAME = 'select * from restaurants where restaurant_name like ?';


const createContact = db.mkQueryFromPool(db.mkQuery(CREATE_CONTACT), pool);
const getAllContact = db.mkQueryFromPool(db.mkQuery(GET_ALL_CONTACT), pool);

const createComment = db.mkQueryFromPool(db.mkQuery(CREATE_COMMENT), pool);
const getComment = db.mkQueryFromPool(db.mkQuery(GET_COMMENT), pool);

const getAllOrders = db.mkQueryFromPool(db.mkQuery(GET_ALL_ORDERS), pool);
const getOrderByOrderId = db.mkQueryFromPool(db.mkQuery(FIND_ORDER_BY_ID), pool);

const getRestaurantByName = db.mkQueryFromPool(db.mkQuery(GET_RESTAURANT_BY_NAME), pool);


// start the application
const app = express();

app.use(cors());
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/orders',
	(req, resp) => {
		getAllOrders()
			.then(result => {
				console.info('>>>> getAllOrders: ', result);
				resp.status(200).type('application/json').json(result)
			})
			.catch(error => {
				resp.status(400).type('application/json').json({ error })
			})
	}
)

app.get('/api/order/:orderId',
	(req, resp) => {
		const orderId = parseInt(req.params.orderId);
		getOrderByOrderId([orderId])
			.then(result => {
				if (result.length <= 0)
					return resp.status(404).type('application/json').json({});
				resp.status(200).type('application/json').json(result);
			})
			.catch(error => {
				resp.status(400).type('application/json').json({ error })
			})
	}
)

app.post('/contact', express.json(),
	(req, res) => {
		console.log(req.body);
		res.status(200).json({
			message: 'Post add successfully'
		})

		createContact([req.body.firstname, req.body.lastname, req.body.tel, req.body.email, req.body.message, req.body.contacttype])
			.then(result => {
				console.log(result);
				res.status(200).type('application/json').json(result);
			})
			.catch(error => {
				res.status(400).type('application/json').json({ error });
			})
	})

app.get('/contact',
	(req, resp) => {
		getAllContact()
			.then(result => {
				console.info('>>>> getAllContact: ', result);
				resp.status(200).type('application/json').json(result)
			})
			.catch(error => {
				resp.status(400).type('application/json').json({ error })
			})
	}
)


app.get('/api/search',
	(req, res) => {
		const q = `%${req.query.q}%` || '';

		getRestaurantByName([q])
			.then(result => {
				console.log(' >>> getRestaurantByName', result)
				res.status(200).type('application/json').json(result);
			})
			.catch(error => {
				res.status(400).type('application/json').json({ error });
			})
	}
)

app.get('/api/comment',
	(req, res) => {
		getComment()
			.then(result => {
				console.log('>>> getComment', result)
				res.status(200).type('application/json').json(result);
			})
			.catch(error => {
				res.status(400).type('application/json').json({ error });
			})
	}
)

app.post('/test', express.json(),
	(req, res) => {
		// id = req.params.id;
		// console.log(req.body);
		createComment([req.body.title])
			.then(result => {
				res.status(200).type('applicaiton/json').json(result);
			})
			.catch(error => {
				res.status(400).type('application/json').json({ error })
			})
	}
)


app.use(express.static(__dirname + '/public/dist/client'));

pool.getConnection(
	(err, conn) => {

		if (err) {
			console.error('Cannot get database: ', err);
			return process.exit(0);
		}
		conn.ping((err) => {
			conn.release();
			if (err) {
				console.error('Cannot ping database: ', err);
				return process.exit(0);
			}
			app.listen(PORT,
				() => {
					console.info(`Application stared on ${PORT} at ${new Date().toString()}`);
				}
			)
		})
	}
)