var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

app.use(bodyParser.json());

app.use(cors())

var transporter = nodemailer.createTransport({
    service: 'gmail',
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
    // res.send(req.body);

});

app.post('/sendmail', function (req, res) {

    console.log(req.body);

    var mailOptions = {
        from: req.body.email,
        to:  req.body.mail_to,
        subject: 'African blockchain conference',
        text:  req.body.message
    };
    transporter.sendMail(mailOptions, function(error, info){
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
app.listen(port);
console.log('Listening on localhost:' + port);