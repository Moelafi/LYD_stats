
CREATE TABLE USDLYD (
  ID INT PRIMARY KEY auto_increment,
  Price_Date DATE,
  Buy float(5,4),
  Sell float(5,4),
  TaxUSD float(5,4),
  creation_time DATETIME DEFAULT CURRENT_TIMESTAMP);
  
  CREATE TABLE GBPLYD (
  ID INT PRIMARY KEY auto_increment,
  Price_Date DATE,
  Buy float(5,4),
  Sell float(5,4),
  creation_time DATETIME DEFAULT CURRENT_TIMESTAMP);
  
  CREATE TABLE EURLYD (
  ID INT PRIMARY KEY auto_increment,
  Price_Date DATE,
  Buy float(5,4),
  Sell float(5,4),
  creation_time DATETIME DEFAULT CURRENT_TIMESTAMP);
  
  CREATE TABLE TNDLYD (
  ID INT PRIMARY KEY auto_increment,
  Price_Date DATE,
  Buy float(5,4),
  Sell float(5,4),
  creation_time DATETIME DEFAULT CURRENT_TIMESTAMP);
  
  CREATE TABLE TRYLYD (
  ID INT PRIMARY KEY auto_increment,
  Price_Date DATE,
  Buy float(5,4),
  Sell float(5,4),
  creation_time DATETIME DEFAULT CURRENT_TIMESTAMP);
  
  CREATE TABLE CNYLYD (
  ID INT PRIMARY KEY auto_increment,
  Price_Date DATE,
  Buy float(5,4),
  Sell float(5,4),
  creation_time DATETIME DEFAULT CURRENT_TIMESTAMP);
  

#insert into USDLYD (Price_Date,Sell,Buy,TaxedSell) values ('2020-11-17',1.4342,1.3456,3.4565);

#select * from USDLYD;

#drop table USDLYD;