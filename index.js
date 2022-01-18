var express = require("express");
var app = express();
app.set('port',process.env.PORT || 3004);

var handlebars = require("express3-handlebars").create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

var fortunes = [
    "Conquer your fears or they will conquer you",
    "Rivers need springs",
    "Do not fear what you don't know",
    "You will have a pleasant surprise",
    "Whenever possible, keep it simple"
];

app.get('/', (req,res) => {
    res.render('home');
});

app.get('/about', (req,res) => {
    var randomForune = fortunes[Math.floor(Math.random()*fortunes.length)];
    res.render('about', { fortune : randomForune });    
});


//custom 404 page

app.use((req,res)=>{
    res.status(404);
    res.render('404');
});

app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' + app.get('port'));
});