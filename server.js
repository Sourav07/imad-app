var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var app = express();
app.use(morgan('combined'));

var config = {
  user:"souravnayak111",
  database:"souravnayak111",
  host:"db.imad.hasura-app.io",
  port:"5432",
  password:process.env.DB_PASSWORD
};

var pool = new Pool(config);

var articles = {
    'article-one' : {
        title : "Article One | Sourav Nayak",
        heading : "Article One",
        date : "September 19, 2017",
        content : ` <p>
                        This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article.
                    </p>
                    <p>
                        This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article.
                    </p>
                    <p>
                        This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article.
                    </p>`
    },
    'article-two' : {
        title : "Article Two | Sourav Nayak",
        heading : "Article Two",
        date : "September 19, 2017",
        content : ` <p>
                        This is the content of my second article. 
                    </p>`
    },
    'article-three' : {
        title : "Article Three | Sourav Nayak",
        heading : "Article Three",
        date : "September 19, 2017",
        content : ` <p>
                        This is the content of my third article. 
                    </p>`
    }
};


function createTemplate(dataObj){
    var title = dataObj.title;
    var content = dataObj.content;
    var date = dataObj.date;
    var heading = dataObj.heading;
    var htmlTemplate = `
      <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date.toDateString()}
                </div>
                <div>
                   ${content}
                </div>
            </div>
        </body>
      </html>`;
      
     return htmlTemplate;
}

app.get('/test-db', function(req, res){
    pool.query("SELECT * FROM test", function(err, result){
        if(err){
            res.status("500").send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    })
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function(req, res){
   counter = counter + 1;
   res.send(counter.toString());
});



var namesList = [];
app.get('/submit-name', function(req, res){
   var name = req.query.name
   namesList.push(name);
   res.send(JSON.stringify(namesList));
});

app.get('/articles/:articleName', function(req, res){
  var articleName = req.params.articleName;    
  
  pool.query("SELECT * FROM article WHERE title = $1",[articleName], function(err, result){
      if(err){
          res.status("500").send(err.toString());
      }else{
          if(result.rows.length === 0){
              res.status("404").send("Article Not Found");
          }else{
              var articledata = result.rows[0];
              res.send(createTemplate(articledata));
          }
      }
  })
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
