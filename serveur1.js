const express=require('express')
const http = require('http') 


const app=express()
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/ttyACM0')
const parser = new Readline()
port.pipe(parser)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port:8082 });//creation d'une instance de l'objet websocket et specier le port de comminiation entre le client

//create db of temperature

 
//create table of temperature
/* 
 con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE table_temp (id int PRIMARY KEY AUTO_INCREMENT, temperature float(20), humidite float(20), temps varchar(40), image varchar(40))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
  */
 var mysql = require('mysql');

 var pool        = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "data_temp_db"
});
 
//heure

        date = new Date;
        annee = date.getFullYear();
        moi = date.getMonth();
        j = date.getDate();//jour(le 26)
        h = date.getHours();
        m = date.getMinutes();
        s = date.getSeconds();
        resultat =annee+'-'+moi+'-'+j
        heure= h+':'+m+':'+s
        






app.set('view engine','ejs')
app.use(express.static('public'))
 wss.on('connection', function connection(ws) { // verifier si un client est connecter
    console.log("a new client is connected ") // afficher un message lorsque le client se connecte
   
    /* nous devons envoyer que des chaines de caracter par le socket dont pour envoyer
     * des données structurés il faut les convertir en chaine
     */
   /* let messageClient= { "type":"text", "content":"Server ready."}
   messageClient=JSON.stringify(messageClient)//conversion en chaine de caractere
    ws.send(messageClient)//envoyer un tableau d'objet au client */

  
    parser.on('data',function(tmp){//reception des données du port de l'arduino
      var temp = Number(tmp.slice(0,5))
      var humidite = Number(tmp.slice(5,10))
      console.log(temp, humidite);
      ws.send(tmp)// envoie des données vers la page html par le socket

      
/* for (heure = 00; heure < 25; heure++) {
    if (minute == 00) {
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql1 = `INSERT INTO tmp_humidity (temperature, humidite) VALUES ('${temp}','${humidite}')`;
        con.query(sql1, function (err, result1) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });
    }
  }
 */
  for (heure = 00; heure < 25; heure++) {
    if (m == 00) {
      pool.getConnection(function(err, connection) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `INSERT INTO donnee (temperature, humidite) VALUES ('${temp}', '${humidite}');`
        connection.query(sql, function (err, result) {
          connection.release();
          if (err) throw err;
          console.log("1 record inserted");
        });
      });
    }
  }
    }) 
   


  port.write('ROBOT PLEASE RESPOND\n')
    ws.on("close", ()=>console.log('client has disconnected'))// afficher un message lorsque le client se deconnecte
  }); 
  http

app.get('/',(req,res)=>res.render('index'))
  app.listen(3000,()=> { 
  console.log('connectingy');

  //app.listen(port, host, () => {         
    console.log(`Server is running on http://localhost:${3000}`);   
    
    
    });


