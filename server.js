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
    
        
    
});
app.listen(port, ()=> console.log('잘 돌아가바니다.'))