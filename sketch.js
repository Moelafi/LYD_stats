
const today =  Date()
var now = new Date(today)

var operationYear = now.getFullYear().toString();
var operationMonth = now.getMonth() + 1;
var operationDate = now.getDate().toString();

var finaldate = operationYear + "-" + operationMonth + "-" + operationDate;

console.log(finaldate)
