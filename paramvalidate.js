//check if currency requested is available

var checkmatch = (cur) => {

    var _input = cur.toUpperCase();
    var curArray = ['USD','GBP','EUR','TRY','TND','CNY'];
    var status = curArray.includes(_input);

    return(status);
}

//validate if the date provided matches the YYYY-MM-DD format, returns true or false
var isdate = (date)=> {

    status = false;
    if (date.includes('-') & date.length == 10) {
        datearray = date.split('-')

        if (datearray.length == 3){
            status = true;
        }}

    return(status);
}


//check if the Date provided is convertable to a date, retutrns true or false
var convertable = (date)=> {
    status = true;

    var dateswitch = new Date(date)
    var ifdate = String(dateswitch)
    if (ifdate == "Invalid Date"){
        status = false;
    }

    return(status)
}

//combining both date validation techniques in one function, return true or false

var datevalidate = (date)=>{

    if (date != 'Today' & date != 'today'){

    dateconvertable = convertable(date);
    stringisdate = isdate(date);

        if (dateconvertable == true & stringisdate == true){
          return(true)
        }
        else{return(false)}
    } 
    else if(date == 'Today' || date == 'today'){ return(true)}
    else{return(false)}
}

//a function which returns a status code for the validation of date and currency inputs.
var validateCurrencyAndDate = (currency,date)=>{
    
    //response codes: 1 : successful , 2 : invalid cur, 3 : invalid date

    var Curvalidation = checkmatch(currency);
    var Datevalidation = datevalidate(date);
    
    validationstatus = '1'

    if (Curvalidation == false){
        validationstatus = '2'
    };
    if (Datevalidation == false){
        validationstatus = '3'
    };
    
    //if (reponsestatus == '2'){Answer = responses.currencynotin}
    //else if (reponsestatus == '3'){Answer = responses.notaDate}
    return(validationstatus);
}


exports.checkmatch = checkmatch;
exports.datevalidate = datevalidate;
exports.validateCurrencyAndDate = validateCurrencyAndDate;
