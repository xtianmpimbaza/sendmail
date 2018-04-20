var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
// var nodemailer = require('nodemailer');
// var xoauth2 = require('xoauth2');
// var mail = require("nodemailer").mail;
const sendmail = require('sendmail')();


app.use(bodyParser.json());
app.use(cors())

// var transporter = nodemailer.createTransport({
//     service: 'yahoo',
//     auth: {
//         // user: 'xtianm4@gmail.com',
//         user: 'mpimbaza.christian@yahoo.com',
//         pass: '1992xtian'
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });

    // generator.on('token', function(token){
    //     console.log('New token for %s: %s', token.user, token.accessToken);
    // });

// var selfSignedConfig = {
//     host: 'smtp.mail.yahoo.com',
//     port: 587,
//     secure: false, // use SSL
//     auth: {
//         user: 'mpimbaza.christian@yahoo.com',
//         pass: '1992xtian'
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// };

// var selfSignedConfig = {
//     host: 'send.one.com',
//     port: 465,
//     secure: false, // use SSL
//     auth: {
//         user: 'christianm@autosoftug.com',
//         pass: '1992xtian'
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// };
// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         xoauth2: xoauth2.createXOAuth2Generator({
//             user: '{username}',
//             clientId: '{Client ID}',
//             clientSecret: '{Client Secret}',
//             refreshToken: '{refresh-token}',
//             accessToken: '{cached access token}'
//         })
//     }
// });
// var transporter = nodemailer.createTransport(selfSignedConfig);
// const transporter = nodemailer.createTransport({
//     debug: true,
//     host: 'mpimbaza.christian@yahoo.com',
//     secureConnection: false, //also tried secure: false
//     port: 587,
//     tls: {cipher:'SSLv3'},
//     auth: {
//         user: 'mpimbaza.christian@yahoo.com',
//         pass: '1992xtian' //triple checked, even tried changing it to something very simple (without any special characters)
//     }
// })

// Routes
app.get('/', function (req, res) {
    res.send('Wrong location');
    // res.send(req.body);

});

app.post('/sendmail', function (req, res) {

    console.log(req.body);



    sendmail({
        from: 'no-reply@yourdomain.com',
        to: 'xtianm4@gmail.com',
        subject: 'test sendmail',
        html: 'Mail of test sendmail ',
    }, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });

    // mail({
    //     from: req.body.email, // sender address
    //     to: req.body.mail_to, // list of receivers
    //     subject: "African blockchain conference", // Subject line
    //     text: "Hello world ✔", // plaintext body
    //     html: "<p>"+req.body.message +"</p>" // html body
    // });

    // if (feedback) {
    //     res.json({feedback: 'success'});
    // }else {
    //     res.json({feedback: 'failed'});
    // }

    // var mailOptions = {
    //     from: 'christianm@autosoftug.com',
    //     to: req.body.mail_to,
    //     subject: 'African blockchain conference',
    //     text: req.body.message
    // };
    // var mailOptions = {
    //     from: req.body.email, // sender address
    //     to: req.body.mail_to, // list of receivers
    //     subject: 'Hello ✔', // Subject line
    //     text: 'Hello world text🐴', // plaintext body
    //     html: '<b>Hello world 🐴</b>' // html body
    // };
    //
    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //         res.json({feedback: 'failed'});
    //     } else {
    //         // console.log('Email sent: ' + info.response);
    //         res.json({feedback: 'success'});
    //     }
    // });

});

// Listen
var port = process.env.PORT || 4000;
// app.listen(port);
// console.log('Listening on localhost:' + port);

app.listen(port, function(){
    console.log('listening on', port);
})