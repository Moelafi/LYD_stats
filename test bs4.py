#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Nov 18 10:46:15 2020

@author: mohamedkhaled
"""

from bs4 import BeautifulSoup
import requests
import datetime


TargetURL = 'https://cbl.gov.ly/en/%d8%a3%d8%b3%d8%b9%d8%a7%d8%b1-%d8%a7%d9%84%d8%b9%d9%85%d9%84%d8%a7%d8%aa/'

Pagedata = requests.get(TargetURL)

def finalpricedate(Pagedata):

    soup = BeautifulSoup(Pagedata.text, 'html.parser')
    
    results = soup.find_all('input', id = 'curr-datepicker')
    
    result = results[0]
    
    lastpricedate = result['value']
    
    return (lastpricedate)
    
    
    
