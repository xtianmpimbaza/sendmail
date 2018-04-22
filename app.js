var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
// var xoauth2 = require('xoauth2');
// var mail = require("nodemailer").mail;



app.use(bodyParser.json());

app.use(cors())

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'xtianm4@gmail.com',
        pass: '1992mcdigital'
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Routes
app.get('/', function (req, res) {
    res.send('Wrong location');
});

app.post('/sendmail', function (req, res) {

    console.log(req.body);

    var mailOptions = {
        from: req.body.email_from,
        to: req.body.email_to,
        subject: 'African blockchain conference',
        text: req.body.no_html,
        html: "<p>"+req.body.no_html+"</p>"
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json({feedback: 'failed'});
        } else {
            // console.log('Email sent: ' + info.response);
            res.json({feedback: 'success'});
        }
    });

});

// Listen
var port = process.env.PORT || 4000;
app.listen(port, function(){
    console.log('listening on', port);
})