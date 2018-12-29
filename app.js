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
    // process.env.SEND_GRID_API
    sgMail.setApiKey(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);

    const msg = {
        to: 'keonimurray45@gmail.com',
        from: req.body.email,
        subject: req.body.sjt,
        text: req.body.mgs,
        html: `<strong>${req.body.mgs}</strong>`,

    };
    sgMail.send(msg);
    console.log("email sent!", msg);
    res.redirect('/')

})

app.listen(port, () => console.log(`listening on port ${port}`))