var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var request = require("request")
var htmlToText = require('html-to-text');

// import fetch from 'node-fetch';
app.use(bodyParser.json());

app.use(cors())

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'xtianm4@gmail.com',
        pass: ''
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Routes
app.get('/', function (req, res) {
    res.send('Wrong location');
});

//------------------------------------------rest api to get delegates
app.get('/getdelegates', function (req, res) {

    var delegates = [];

    var url = 'https://adin.ug/abc2018/api/christian.php?auth=246fb595064db95e76bbdd828cf7207662a6baaf&table=delegates';
    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            body.forEach(function (item) {

                delegates.push({
                    id: item.id,
                    ticket: item.ticket,
                    email: decodeURIComponent(item.email),
                    first_name: item.first_name.replace(/\+/g, " "),
                    last_name: item.last_name.replace(/\+/g, " "),
                    company: item.company.replace(/\+/g, " "),
                    position: item.position.replace(/\+/g, " ")
                });
            });

            res.send(delegates);
        }
    })
});
//------------------------------------------rest api to get delegates
app.get('/getprogram', function (req, res) {

    var program = [];

    var url = 'https://www.adin.ug/abc2018/api/christian.php?auth=246fb595064db95e76bbdd828cf7207662a6baaf&table=program';
    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            body.forEach(function (item) {

                program.push({
                    id: item.id,
                    activity: item.p_activity.replace(/\+/g, " "),
                    topic: item.p_topic.replace(/\+/g, " "),
                    venue: decodeURIComponent(item.p_venue).replace(/\+/g, " "),
                    description: item.p_description.replace(/\+/g, " "),
                    speaker: decodeURIComponent(item.p_speaker).replace(/\+/g, " "),
                    type: item.p_type.replace(/\+/g, " "),
                    panelist: decodeURIComponent(item.p_panelist).replace(/\+|\r|\n/g, " ").replace("   "," "),
                    sponsor: item.p_sponsor.replace(/\+/g, " "),
                    time: decodeURIComponent(item.p_time).replace(/\+/g, " "),
                    date: decodeURIComponent(item.p_date).replace(/\+/g, " "),
                    website: decodeURIComponent(item.p_website).replace(/\+/g, " ")
                });
            });

            res.send(program);
        }
    })
});


//------------------------------------------ login
app.post('/login', function (req, res) {

    var valid = false;

    var url = 'https://adin.ug/abc2018/api/christian.php?auth=246fb595064db95e76bbdd828cf7207662a6baaf&table=delegates';
    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            body.forEach(function (item) {
                if (req.body.email.match(item.email) && req.body.ticket.match(item.ticket)) {
                    valid = true;
                }
            });

            res.send({feedback: valid});
        }
    })
});

//------------------------------------------rest api to get schedules
app.get('/getspeakers', function (req, res) {

    var speaker = [];

    // var url = 'https://africanblockchain.org//wp-json/wp/v2/speaker/?_embed&&status=publish';
    var url = 'https://africanblockchain.org//wp-json/wp/v2/speaker/?_embed&&status=publish&per_page=100&page=1';
    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            body.forEach(function (item) {
                // speaker.push({name:item.title.rendered, type : item.type, company : item.acf.company, picture:item.source_url});
                speaker.push({
                    id: item.id,
                    name: item.title.rendered,
                    company: item.acf.company,
                    title: item.acf.role,
                    country: item.acf.country,
                    // picture: item._embedded.wp:featuredmedia
                    picture: item._embedded["wp:featuredmedia"][0].source_url,
                    content: htmlToText.fromString(item.content.rendered).replace(/\n/g, " ")
                    // content: (item.content.rendered).replace('<>','')
                });
            });

            res.send(speaker);
            // res.send(body);
            // console.log(body) // Print the json response
        }
    })
});

//------------------------------------------rest api to get exhibitors
app.get('/getexhibitors', function (req, res) {

    var exhibitors = [];

    var url = 'https://africanblockchain.org//wp-json/wp/v2/exhibitor/?_embed&&status=publish&per_page=100&page=1';
    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            body.forEach(function (item) {
                exhibitors.push({
                    id: item.id,
                    name: item.title.rendered,
                    // company: item.acf.company,
                    // title: item.acf.role,
                    // country: item.acf.country,
                    // picture: item._embedded.wp:featuredmedia
                    picture: item._embedded["wp:featuredmedia"][0].source_url
                });
            });
            res.send(exhibitors);
        }
    })
});

//------------------------------------------rest api to get sponsors
app.get('/getsponsors', function (req, res) {

    var sponsor = [];
    var url = 'https://africanblockchain.org//wp-json/wp/v2/sponsor/?_embed&&status=publish&per_page=100&page=1';
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            body.forEach(function (item) {
                sponsor.push({
                    id: item.id,
                    name: item.title.rendered,
                    // company: item.acf.company,
                    picture: item._embedded["wp:featuredmedia"][0].source_url
                });
            });
            res.send(sponsor);
        }
    })
});

app.get('/getschedule', function (req, res) {

    var sponsor = [];
    // var url = 'https://adin.ug/abc2018/api/christian.php?auth=246fb595064db95e76bbdd828cf7207662a6baaf&table=program';
    var url = encodeURI('https://adin.ug/abc2018/api/christian.php?auth=246fb595064db95e76bbdd828cf7207662a6baaf&table=program');
    // decodeURI(encoded)
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            body.forEach(function (item) {
                sponsor.push({
                    id: item.id,
                    name: item.title.rendered,
                    // company: item.acf.company,
                    picture: item._embedded["wp:featuredmedia"][0].source_url
                });
            });

            console.log(body);
            // var s = JSON.parse(body);
            // var c = json(body);
            res.send(body);
        }
    })
});


app.post('/sendmail', function (req, res) {

    console.log(req.body);

    var mailOptions = {
        from: req.body.email_from,
        to: req.body.email_to,
        subject: 'African blockchain conference',
        text: req.body.no_html,
        html: "<p>" + req.body.no_html + "</p>"
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
app.listen(port, function () {
    console.log('listening on', port);
})