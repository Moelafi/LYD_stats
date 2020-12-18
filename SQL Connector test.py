#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Nov 16 11:54:37 2020

@author: mohamedkhaled

"""

"""
from mysql.connector import (connection)

config = {"user":'root', "password":'Mm0925219354*',
                                 "host":'localhost',
                                 "database":'LYD_Exrates'
    }

cnx = connection.MySQLConnection(**config)



cursor = cnx.cursor()

#cursor.execute("select * from USDLYD")

cursor.execute("insert into USDLYD (Price_Date,Buy,Sell) values ('2020-11-18',1.4342,1.3456)")


cnx.commit()

cnx.close()

"insert into USDLYD (Price_Date,Buy,Sell) values ('2020-11-18',1.4342,1.3456)"

"insert into USDLYD (Price_Date,Buy,Sell) values ('2020-11-17',1.3548,1.3616)"


"""

import datetime

Todaydate = datetime.datetime.now() 

weekday = Todaydate.isoweekday()

thing = Todaydate.strftime('%H:%M')

print(datetime.date.today())
