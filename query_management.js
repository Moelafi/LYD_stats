
// a function which return's date of today string in case date provided was "today"

function TodayDateStr(){

    const today =  Date()
    var now = new Date(today)

    var operationYear = now.getFullYear().toString();
    var operationMonth = now.getMonth() + 1;
    var operationDate = now.getDate().toString();

    var todaydatestr = operationYear + "-" + operationMonth + "-" + operationDate;

    return(todaydatestr)

}

// a function which constructs the SQL query, it takes the date and currency as positional arguments and returns the query as STR.

var queryconstruct = (currency,date)=>{

    var Today = 'Today'; 
    const SQLmap = { 'USD':'USDLYD','TRY':'TRYLYD',
                    'EUR':'EURLYD','CNY':'CNYLYD',
                    'TND':'TNDLYD', 'GBP': 'GBPLYD'};

    var SQLTable = SQLmap[currency];
    var Querydate = date
    
    var test = Today.localeCompare(date, undefined, { sensitivity: 'accent' });

    if (test == 0){

        var Querydate = TodayDateStr()
    }
    else{
        var Querydate = date 
    }
    
    var SQLquery = `select * from ${SQLTable} where Price_Date = "${Querydate}"`;

    return(SQLquery);
}

//Price_Date,Buy,Sell
//var q = queryconstruct('USD', '2020-10-11');

exports.queryconstruct = queryconstruct;

