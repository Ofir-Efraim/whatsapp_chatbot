require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}))

app.post('/sms', (req, res) => {
  let message = "default message";
  if (req.body.Body === 'hi') {
    message = 'bye';
  } else if (req.body.Body === 'bye') {
    message = 'hi';
  }
  client.messages
    .create({
      body: message,
      from: 'whatsapp:+14155238886',
      // mediaUrl: ['*insert image url*'],
      // add this property to send an image.
      to: req.body.From //phone number that sent the message to the bot
    })
    .then(message => console.log(message.sid)) //info about the message that the bot sent
    .done();
  console.log(req.body) //info about the message that the user sent
      //  body: req.body.Body (the message content that was sent to the bot),
      // if media is sent NumMedia property is 1 and url is req.body.MediaUrl0 
      // note that every picture is treated like a new message.
})

app.post('/callback', (req, res) => {
  console.log(req)
})

app.listen(3000, () => {
  console.log("this app is running on port 3000");
})