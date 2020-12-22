const ejs = require('ejs');
const express = require('express');
const SQLconnection = require('./SQLconnection');
const query_management = require('./query_management');
const responses = require('./responses');
const sitechecker = require('./sitechecker');
const paramvalidate = require('./paramvalidate');
const path = require('path');
const helmet = require('helmet');

const app = express();
const con = SQLconnection.con;

app.use(express.static('public'));
app.set('view engine', 'ejs');


app.listen(3000, ()=>{
    console.log('yo server running on port 3000');
});

app.get('/',(req,res)=>{
    const output = ''
    //console.log(req.url);
    res.render('index',{output});
})

//localhost:3000/LYD/:base/:Date
app.get('/LYD/:base/:Date', (req,res)=> {
     
	console.log(req.url);
    var currency = req.params.base.toUpperCase();
    var date = req.params.Date;
    var ValidationCode = paramvalidate.validateCurrencyAndDate(currency, date)

    if (ValidationCode == '2') {
        output = responses.currencynotin
        sitechecker(req,res,output);}
        //res.status(400).send(Answer)}

    else if (ValidationCode == '3'){
        output = responses.notaDate
        sitechecker(req,res,output);}
        //res.status(400).send(Answer)}
    
    else{
    var query = query_management.queryconstruct(currency, date);

    con.query(query, function (err, result, fields) {      
        if (err) throw err;
        if(result[0]){
        
        var input = result[0];
        var output = responses.JSONConstruct(currency, date,input)
        } 
        else { 
            var output = responses.Notavailable };

        sitechecker(req,res,output);

    });
            }
})


//localhost:3000/LYD/listquoets
app.get('/LYD/listquotes', (req,res)=> {

    //res.status(200).json(responses.quotes);
    const output = responses.quotes;
    sitechecker(req,res,output);
});




