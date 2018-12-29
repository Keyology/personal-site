//Dependcies 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
require('dotenv').config('./.env');
const sgMail = require('@sendgrid/mail');



//middleware
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.static(__dirname + '/public'));

//routes 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/email', (req, res) => {
    //this route will handle sending emails
    sgMail.setApiKey(process.env.SEND_GRID_API);

    const msg = {
        to: 'keonimurray45@gmail.com',
        from: req.body.email,
        subject: req.body.sjt,
        text: req.body.mgs,
        html: `<strong>${req.body.mgs}</strong>`,

    };
    sgMail.send(msg, function (err, json) {
        if (err) {
            console.log("email did not go through", err);
        }
        console.log(json)

    });
    console.log("email sent!", msg);
    res.redirect('/')

})

app.listen(port, () => console.log(`listening on port ${port}`))