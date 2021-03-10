const fs = require('fs');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql =require('mysql');

const connection =mysql.createConnection({
	host:conf.host,
	user: conf.user,
	password: conf.password,
	port:conf.port,
	database : conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest:'./upload'})


app.get('/api/customers',(req, res)=> {
    connection.query(
		"SELECT * FROM CUSTOMER",
		(err, rows, fields) => {
			try {
			res.send(rows);		
			} catch (error) {
			console.log("!!!!!!오류입니다.")	
			}
		
		}
	);


	app.use('/image',express.static('./upload'));
	app.post('/api/customers',upload.single('image'),(req,res)=> 
	{
		console.log("!!!");
		let sql = "insert into CUSTOMER values (null,?,?,?,?,?,now())";
		let image ='/image/' + req.file.filename;
		let name = req.body.name;
		let birthday =req.body.birthday;
		let gender = req.body.gender;
		let job = req.body.job;
		let params = [image, name , birthday, gender ,job];
		connection.query(sql, params,
			(err,rows,fields)=> {
				res.send(rows);
				console.log(err)
				console.log(rows)
			})
	}
	
	)

});


app.delete('/api/customers/:id', (req,res) => {
	let sql = 'DELETE FROM CUSTOMER WHERE id= ?';
	let params = [req.params.id];
	connection.query(sql,params,
		(err,rows,fields) =>{
		res.send(rows);
	}
	)
});



app.listen(port, ()=> console.log('잘 돌아갑니다!!!.'))