const express=require('express')
const app=express()
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/ttyUSB0')
const parser = new Readline()
port.pipe(parser)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port:8081 });//creation d'une instance de l'objet websocket et specier le port de comminiation entre le client
//app.set('view engine','ejs')

 wss.on('connection', function connection(ws) {// verifier si un client est connecter
    console.log("a new client is connected ")// afficher un message lorsque le client se connecte
    /** nous devons envoyer que des chaines de caracter par le socket dont pour envoyer
     * des données structurés il faut les convertir en chaine
     */
   /* let messageClient= { "type":"text", "content":"Server ready."}
   messageClient=JSON.stringify(messageClient)//conversion en chaine de caractere
    ws.send(messageClient)//envoyer un tableau d'objet au client */

     parser.on('data',function(tmp){//reception des données du port de l'arduino
      console.log(tmp)
      ws.send(tmp)// envoie des données vers la page html par le socket
  }) 
  port.write('ROBOT PLEASE RESPOND\n')
    ws.on("close", ()=>console.log('client has disconnected'))// afficher un message lorsque le client se deconnecte
  }); 
  
app.get('/',(req,res)=>res.end('hello'))
  app.listen(8080,()=>console.log('connecting'));