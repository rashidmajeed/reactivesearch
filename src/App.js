/**
 * ReactiveSearch components are wrapped inside a container component — 
 * ReactiveBase which glues the Elasticsearch index and the ReactiveSearch components together.
 */
import React from 'react';
import { ReactiveBase, DataSearch, ResultCard } from '@appbaseio/reactivesearch';
import "./App.css";
class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <ReactiveBase
          app="MovieAppFinal"
          credentials="RxIAbH9Jc:6d3a5016-5e9d-448f-bd2b-63c80b401484"
        >
          <div className="navbar">
            <div className="app-logo">
            MovieFinder
            </div>
            <div className="search-container">
              <DataSearch
                componentId="mainSearch"
                dataField={["original_title"]}
                categoryField="title"
                className="search-bar"
                queryFormat="and"
                placeholder="Browse your favourite movies.."
                iconPosition="left"
                autosuggest={false}
                filterLabel="search"
              />
            </div>
          </div>
          <div className="result-container">
            <ResultCard
              componentId="results"
              dataField="original_title"
              pagination={true}
              paginationAt="bottom"
              pages={5}
              size={12}
              Loader="Loading..."
              showResultStats={true}
              noResults="Sorry! nothing found..."

              react={{
                and: [
                  "mainSearch"
                ]
              }}
              onData={function (res) {
                return {
                  description: (
                    <div className="main-description">
                      <div className="ih-item square effect6 top_to_bottom">
                        <a
                          target="#"
                          href={"http://www.imdb.com/title/" + res.imdb_id}
                        >
                          <div className="img">
                            <img
                              src={
                                "https://image.tmdb.org/t/p/w500" +
                                res.poster_path
                              }
                              alt={res.original_title}
                              className="result-image"
                            />
                          </div>

                        </a>
                      </div>
                    </div>
                  ),
                  url: "http://www.imdb.com/title/" + res.imdb_id
                };
              }}
            />
          </div>
        </ReactiveBase>
      </div>
    );
  }
}
export default App;
