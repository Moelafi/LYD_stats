LYD-Forex-API
LYD Forex API

This is an API project for LYD currency forex prices.

This Project is made of:

forex quotes webscraper:
the scrapper is built in python, it uses beautiful soup, request and Pandas as its' main libraries. it excutes the scraping on daily basis whenever the Central Bank updates quotes on the website.
API Backend:
the backend of this API is developed using Javascript's Node JS framework and Express module.

It has 7 end points. 1 for the list of quotes, and 6 for the 6 currencies covered by the API which are as follows: USD,EUR,GBP,TRY,TND,CNY.

The user is also required to enter a date for the required price or enter "Today" to get the prices of today.

The backend handles errors in inputs with specific custom responses and instructions for each error.