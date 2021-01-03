"""
@author: Moe Ibrahim 

This script collects the official exchange rate prices of currencies against LYD as provided 
by the Libyan Central Bank of Libya on their website.

"""
from bs4 import BeautifulSoup
from mysql.connector import (connection)
import pandas as pd
import numpy as np
import datetime
import requests
import time


def strippingfloat(_float, decimals): #specify decimal numbers length.
    
    decimals += 2
    _String = (str(_float))
    result = float(_String[:decimals])
    
    return result

#function that executes HTTP request and returns the response.

def requestHTML(target):

    while True:
        
        header = {'Connection':'close', 
                   'referer': 'https://cbl.gov.ly/en/',
                   'cache-control': 'max-age=0',
                   'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36'}
        
        try:
            pagesource = requests.get(target, headers = header)
            print(pagesource.request.headers)
 #checking if the response has a code of 200 for a successful response before breaking the loop
            if pagesource.status_code == 200:
                break
            else:
                continue
                time.sleep(5)
                    
        except:
    #if the request returns an error the script sleeps for 5 seconds before issuing another request
            time.sleep(5)
            continue
        
    return(pagesource)

#function that parses the HTTP response and scraps it for the forex table
def scrapTable(pagedata): 
    
    soup = BeautifulSoup(pagedata.text, 'html.parser')
    results = soup.find('table')
    body = results.find('tbody')
    maindata = body.find_all('td')
    
    cellarray = []
    
    for cell in maindata:
    
        name = str(cell.text)
        cellarray.append(name)
        
    return(cellarray)

#afunction which converts the HTML cells to a Pandas DataFrame and returns it
def creatforexDF(array):    
    
    Forex_array = np.array(array)
    Forex_dataframe = Forex_array.reshape(20,5)
    forexDF = pd.DataFrame(Forex_dataframe, columns=['Currency','Unit','Ave', 'Sell', 'Buy']) 
    
    return (forexDF)

#a function which connects to our SQL DB and returns the connection object.
def SQLconnect():
    
    config = {"user":'root', "password":'Mm0925219354*',
                                 "host":'localhost',
                                 "database":'LYD_Exrates'
    }
    sqlconnection = connection.MySQLConnection(**config)
    
    return (sqlconnection)

#funciton which takes in request content and return date of last available quotes
def pagepricedate(Pagedata):

    soup = BeautifulSoup(Pagedata.text, 'html.parser')
    
    results = soup.find_all('input', id = 'curr-datepicker')
    
    result = results[0]
    
    lastpricedate = result['value']
    
    return (lastpricedate)

"""
Taxed_USD = str(usdsell*2.63) #this variable 'Taxed USD' calculates the price of USD after tax.

"""

#An Object created for the Forex prices DF, it includes the method needed to clean and sort the table
class ForexTable():
    
    def __init__(self,Originaltable):
        self.Originaltable = Originaltable
        
    def cleantable(self):
        
        self.Originaltable.drop(self.Originaltable.columns[[1,2]], axis = 1, inplace = True)
        self.Originaltable.drop([3,4,5,6,7,8,9,10,11,13,14,15,16,17],inplace = True)
        self.Originaltable.reset_index(drop = True, inplace=True)
    
        self.Originaltable.iloc[5][0] = 'CNY'
        self.Originaltable.iloc[4][0] = 'TRY'
        self.Originaltable.iloc[3][0] = 'TND'
        self.Originaltable.iloc[2][0] = 'EUR'
        self.Originaltable.iloc[1][0] = 'GBP'
        self.Originaltable.iloc[0][0] = 'USD'
    
        self.Originaltable['Buy'] = self.Originaltable['Buy'].map(lambda x: x.rstrip(" LYD"))
        self.Originaltable['Sell'] = self.Originaltable['Sell'].map(lambda x: x.rstrip(" LYD"))
        
        cleantable = self.Originaltable
        
        return(cleantable)
    
#The main script 
if __name__ == "__main__":
    
    while True: #mainloop
     
        Todaydate = datetime.date.today() 
        weekday = Todaydate.isoweekday()
                
        SQLmap = { 'USD': 'USDLYD', 'GBP': 'GBPLYD',
                  'EUR': 'EURLYD', 'TND':'TNDLYD',
                  'TRY': 'TRYLYD', 'CNY':'CNYLYD'}
            
        TargetURL = 'https://cbl.gov.ly/en/%d8%a3%d8%b3%d8%b9%d8%a7%d8%b1-%d8%a7%d9%84%d8%b9%d9%85%d9%84%d8%a7%d8%aa/'
    
        Todaydate = datetime.date.today() 
        weekday = Todaydate.isoweekday()
                
        page = requestHTML(TargetURL)
            
        FOREXtable = scrapTable(page)
            
        MainDF = creatforexDF(FOREXtable)
            
        TableObj = ForexTable(MainDF)
            
        f = TableObj.cleantable()

        ToSQL = SQLconnect()
            
        for CUR,SELL,BUY in zip(f["Currency"],f["Sell"],f["Buy"]):
                
            destination = SQLmap[CUR]
            Buy = BUY
            Sell = SELL
            PriceDate = pagepricedate(page)
                
            Insert_Query = f"insert into {destination} (Price_Date,Buy,Sell) values ('{PriceDate}',{Buy},{Sell})"
                
            if CUR == "USD":
                    
                Taxed_USD = 0 #changed this variable because i dont want to use it anymore after jan 3rd and still want to keepe it inserting in the DB.
                Insert_Query = f"insert into {destination} (Price_Date,Buy,Sell,TaxUSD) values ('{PriceDate}',{Buy},{Sell},{Taxed_USD})"
                    
            print(Insert_Query)
            cursor = ToSQL.cursor()
                
            while True: #inserting to SQL loop REVISIT
    
                try:
                    cursor.execute(Insert_Query)
                    ToSQL.commit()
                    break
                    
                except: 
                        
                    print('instertt failed will try again in 5 seconds')
                    time.sleep(5)
                    continue
                    
        ToSQL.close()
            
        while True:
                            
            Refpage = requestHTML(TargetURL)
            lastDate = pagepricedate(Refpage)
                            
            print("Last date on the page atm is: ",lastDate)   
            print('checked at: ',datetime.datetime.now())
            
            time.sleep(2)
            
            if PriceDate != lastDate:
            
                print('out')
                PriceDate, lastDate = 0,0
                break
        
            else:
            
                time.sleep(360)
                continue
            
            
            
            

        
        

                

