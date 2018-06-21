## Elasticsearch and Reactivesearch concepts
Below is a few concepts for elasticsearch and reactivesearch...

# What is Elastic Search and why we need?
Elasticsearch is a super fast, open-source, full-text search engine. It allows us to store, search, and analyze amount of data quickly (we are talking milliseconds here).Its a technology that powers applications that have complex search features and requirements.

With Elasticsearch, you can build a fast search utilizing its powerful Query DSL. However, setting up Elasticsearch correctly requires a lot of work. For instance, the data mapping, analyzers and tokenizers need to be set correctly or you may not receive accurate search results back. Besides, the more filters that get applied along with the search query, the more complex the resulting search query becomes.

# Why Elasticsearch is better to use?
Elasticsearch is developed on Java, which makes it compatible on almost every platform.
Elasticsearch is real time, in other words after one second the added document is searchable in this engine.
Creating full backups are easy by using the concept of gateway, which is present in Elasticsearch.
Elasticsearch uses JSON objects as responses, which makes it possible to invoke the Elasticsearch server with a large number of different programming languages.

# Comparison of Elasticsearch with RDBMS
Elasticsearch invloves => Index, Mapping, Field, JSON Object
RDBMS invloves => Database, Table, Field, Tuple

# What is Reactivesearch and why we used to make a prototype 
It is an open-source library has highly customizable rich UI components that can connect with any Elasticsearch server and provide us queries for all generic use-cases ( like E-commerce, Aggregators, Events etc) bundled into these components. Reactivesearch will help us to build UI widgets for filters and search related UI elements.

# abc import to address the problem of indexing and syncing data from source X into Elasticsearch 
It can import MongoDB, SQL, JSON, CSV Data Into Elasticsearch.
Key Benefit is Whether your data resides in Postgres or a JSON file or MongoDB or in all three places, abc can index the data into Elasticsearch. It is the only tool that allows working with all these sources at once or individually: csv, json, postgres, mysql, sqlserver, mongodb, elasticsearch. It can keep the Elasticsearch index synced in realtime with the data source. Note: This is currently only supported for MongoDB and Postgres.

## Running Prototype is a Moviefinder demo using elasticsearch with react. 
This demo is quite basic and just for the learning purpose using the resourses.
In this prototype, User can search for movies from a large dataset given by appbase.io. Search is too fast using the reactivesearch components backed by elasticsearch engine. 

It uses builtin reactivesearch components such as ReactiveBase, DataSearch, ResultCard in this prototype.
Reactivebase is used as a wrapper to all components.
Datasearch component is used to search the desired data.
ResultCard component is used to present fetched data into the browser.
Using Resultcard component it is so easy to implement pagination on this seached data.
User can search movies in just few milliseconds. 
-when prototype runs elasticsearch brings 13001 movies in 2ms. much faster :)

# Useful resources:
https://www.tutorialspoint.com/elasticsearch/index.htm
https://www.elastic.co/products/elasticsearch
https://opensource.appbase.io/reactivesearch/

## Link to prototype running on github pages
https://rashidmajeed.github.io/reactivesearch/ 

# Installation locally
npm install inside the project folder

# To Start Demo
npm start
   
# Visit browser
https://localhost:3000
