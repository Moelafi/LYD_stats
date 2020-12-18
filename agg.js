const mongoose = require('mongoose');

const DBconnection = mongoose.connect('mongodb+srv://Anas:Boursaly@testingmongo.edkxx.mongodb.net/TestingMongo?retryWrites=true&w=majority', 
{useNewUrlParser: true , useUnifiedTopology: true});

const assets = ["BITCOINProd","EURUSDProd","FTSEProd"]; //array for training 

/* this would be the actual list
const assets = ["BITCOINProd","EURUSDProd","FTSEProd","USDCNHProd","NASDAQProd","SPTRDProd","ETHUSDProd","GBPUSDProd","CFDGOLDProd",
    "LCOProd","APPLEProd","TESLAProd","MICROSOFTProd","ALPHABETProd","WHEAT_CHICAGOProd","SUGAR_NY_NO_11Prod","USDTRYProd",];
*/

const asset = mongoose.Schema({BPID: {type: String, required: true},
    IGCode: {type: String, required: true},
    Ticker: {type: String, required: true},
    AssetClass: {type: String, required: true},
    ProductName: {type: String, required: true},
    avebuy: {type: Number, required: true},  // offer
    avesell: {type: Number, required: true}, // sell
    //Low52Week: Number,
    //High52Week: Number,
    OP_TimeStamp: {type: Date, default: Date.now},
    MarketStatus: {type: String, enum: ["TRADEABLE", "EDITS_ONLY","OFFLINE", "ON_AUCTION", "ON_AUCTION_NO_EDITS", "SUSPENDED", "CLOSED"]},
    //_id : {type: String, required: true},
    Asset : {type: String, required: true}
    
    
});

//const insertmod = mongoose.model(collectionName, asset); //model used for insertion of the averaged prices


function AggregationDate(){

    const today =  Date()
    var yesterday = new Date(today)

    yesterday.setDate(yesterday.getDate() - 1) //set thte date inside the id to yest, and also inside the date in match query

    var operationYear = yesterday.getFullYear().toString();
    var operationMonth = yesterday.getMonth() + 1;
    var operationDate = '08' //'0' + yesterday.getDate().toString();

    var AggDate = operationYear + "-" + operationMonth + "-" + operationDate;

    return AggDate
}

function DailyAggregate(collections, aggdate){

for (var i = 0; i < collections.length; i++) {

    const permod = mongoose.model(collections[i], asset); //model usesd to import the aggregated document

    //console.log(collections[i]); //made for debugging
    
    var collectionName = collections[i] + " daily average"; //name of the collection receiving the aggregated price i.e. Bitcoinprods daily average, for inserting
    const insertmod = mongoose.model(collectionName, asset); //meant for insertion

// actual aggregation pipeline starts from here

permod.
  aggregate(
    [{$match: {
        TimeStamp : {
          "$gte" : new Date(aggdate + 'T00:00:00.000Z'), //this to be changed final step
          "$lt" : new Date(aggdate + 'T23:59:59.000Z') //this to be changed final step
      }
      }}, {$group: {
        _id: collections[i] + " " + aggdate,
        //oppdate: aggdate,
        BPID: {$first: "$BPID"},
        IGCode: {$first: "$IGCode"},
        Ticker: {$first: "$Ticker"},
        AssetClass: {$first: "$AssetClass"},
        avesell: {
          $avg: "$Sell"
        },
        avebuy: {$avg: "$Buy"},
        ProductName:{$first: "$ProductName"},
      
          marketStatus:{$first: "$MarketStatus"},
      
        }}, {
          $addFields: {
              Asset: collections[i],
          }
      }]
         
  ).exec(function (err, data) {
    //console.log(data[0]); //made for debugging
    if (err) return handleError(err);
    delete data[0]._id
    var finalAgg = new insertmod(data[0]);
    finalAgg.save();
    console.log(finalAgg); //logging the final document for viewing. 

  });

}
}

//the below function combines both of the functions above for export reasons. 

function PerformAgg(){

var processDate = AggregationDate(); //calling the function for gettting yesterday's date

//console.log(processDate); //made for debugging 

DailyAggregate(assets,processDate); //calling the function of the acctual aggregation and passing the Aggregation date and the list of assets to it.

};

exports.PerformAgg = PerformAgg; //making the function available globally