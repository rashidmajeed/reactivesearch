# Moviefinder using elasticsearch with react.

## Link to prototype running on github pages
https://rashidmajeed.github.io/reactivesearch/  

### Description
* In a prototype, User can search for movies from a large dataset given by appbase.io. 
* Search is too fast using the reactivesearch components backed by elasticsearch engine. 
* Reactivesearch components such as ReactiveBase, DataSearch,MultiDropDownList,   ResultCard.

### Reasoning of usage
* Reactivebase is used as a wrapper to all components.
* Datasearch component is used to search the desired data.
* MultiDropDownList component works for selecting movies for different genres.
* ResultCard component is used to present fetched data into the browser.
* Using Resultcard component it is so easy to implement pagination.
* User can search movies in just few milliseconds. 
* when prototype runs elasticsearch brings 13001 movies in 2ms. much faster :)


# Elasticsearch and Reactivesearch concepts
Below is a few concepts for elasticsearch and reactivesearch…

### What is Elastic Search and why we need?
* Elasticsearch is a super fast, open-source, full-text search engine. 
* It allows us to store, search, and analyze amount of data quickly.
* With Elasticsearch, you can build a fast search utilizing its powerful Query DSL.  

### Why Elasticsearch is better to use?
* Elasticsearch is developed on Java, compatible on almost every platform.
* Elasticsearch after one second the added document is searchable in this engine.
* Creating full backups are easy by using Elasticsearch.
* Elasticsearch uses JSON objects as responses, which makes it possible to invoke the * Elasticsearch server with a large number of different programming languages.

### Comparison of Elasticsearch with RDBMS
* Elasticsearch involves => Index, Mapping, Field, JSON Object
* RDBMS involves => Database, Table, Field, Tuple

## What is Reactivesearch and why we used to make a prototype
* Elasticsearch data mapping, analyzers and tokenizers need to be set correctly otherwise you may not receive accurate search results back.
* More filters with the search query, the more complex the resulting search query becomes. 
* Reactivesearch components connect with any Elasticsearch server and provide us queries. 
* Reactivesearch will help us to build UI widgets for filters and search related UI elements.

## a`ETLs`, or `Syncing data to Elasticsearch` 
* It can import MongoDB, SQL, JSON, CSV Data Into Elasticsearch.
* abc can index the data into Elasticsearch.
* This is currently only supported for MongoDB and Postgres.

## Useful resources:
 https://www.tutorialspoint.com/elasticsearch/index.htm/
 https://www.elastic.co/products/elasticsearch
 https://opensource.appbase.io/reactivesearch/

## Installation locally
npm install inside the project folder

## To Start Demo
npm start
   
## Visit browser
https://localhost:3000