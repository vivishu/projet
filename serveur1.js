const express=require('express')
const app=express()
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/ttyACM0')
const parser = new Readline()
port.pipe(parser)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port:8082 });//creation d'une instance de l'objet websocket et specier le port de comminiation entre le client
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
  app.listen(8081,()=>console.log('connecting'));














  function date_heure(id)
{
        date = new Date;
        annee = date.getFullYear();
        moi = date.getMonth();
        mois = new Array('Janvier', 'F&eacute;vrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Ao&ucirc;t', 'Septembre', 'Octobre', 'Novembre', 'D&eacute;cembre');
        j = date.getDate();
        jour = date.getDay();
        jours = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
        h = date.getHours();
        if(h<10)
        {
                h = "0"+h;
        }
        m = date.getMinutes();
        if(m<10)
        {
                m = "0"+m;
        }
        s = date.getSeconds();
        if(s<10)
        {
                s = "0"+s;
        }
        resultat = 'Nous sommes le '+jours[jour]+' '+j+' '+mois[moi]+' '+annee+' il est '+h+':'+m+':'+s;
        document.getElementById(id).innerHTML = resultat;
        setTimeout('date_heure("'+id+'");','1000');
        return true;
}