//requesting list of available currencies query

var quotes = {1:"US DOLLAR, USD",2:"BRITISH POUND, GBP",
    3:"EURO, EUR",4:"TURKISH LIRA, TRY",
    5:"TUNISIAN DINAR, TND",6:"CHINESE YUAN, CNY"}

//response to request of a non available currency
var currencynotin = {response_status:'quote not available',
    message:'We apologize, quotes the base currency you requested are not available at the moment, please refer to "/LYD/listquoets" to view available quotes '}

//response to providing invalid date
var notaDate = {response_status: "invalid date format",
                message:'the date you inserted does no match the required format, please make sure the date matches the following format: YYYY-MM-DD, or input Today to get the quotes of today'}


//response to requesting a date not available
var datenotcovered = {response_status: 'date is not covered',
                    message:'there are no rates available for the date you requested'}

//response to a successful query
var success = { Response_Status: 'successful',
                Currency_Pair: "",
                Price_Date: "",
                Buy: "",
                Sell: "",
                //USD_After_Tax: "",
                Request_DateTime: ""

}

var Notavailable = {
    Response_status : 'Date not available',
    message : 'prices for the date you requested are not available, please note that no official prices are available for fridays and saturdays'
}

//a function that constructs the response JSON using the row returned from mySQL query. 
var JSONConstruct = (currency,date,Data)=>{

    var output = success;
        
    output.Currency_Pair = currency + "LYD";
    output.Price_Date = date;
    output.Buy = Data.Buy;
    output.Sell = Data.Sell;
    if(currency == 'USD'){output.USD_After_Tax = Data.TaxUSD}; //This statement adds a TaxUSD property which is only available for USDLYD
    output.Request_DateTime = new Date();

    return(output)
}

var sendresponse = function(req,output){

    //header assignment
    const reqHeader = req.headers; //write HEADERS
    console.log(reqHeader);

    const {referer} = reqHeader;
    //sitechecking
    if(referer === undefined){var sitechecker = false} else { var sitechecker = true};    
    console.log(sitechecker);

    if(sitechecker){
        res.render('index',{output})}
        else{
            res.json(output)};
}



//Expporting responses
exports.quotes = quotes;
exports.currencynotin = currencynotin;
exports.notaDate = notaDate;
exports.datenotcovered = datenotcovered;
exports.JSONConstruct = JSONConstruct;
exports.Notavailable = Notavailable;
exports.sendresponse = sendresponse;