import React from 'react';
import "../App.css";
import { ResultCard } from '@appbaseio/reactivesearch';

const Result = () => {
  return (
    <div>
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
            "mainSearch",
            "genres-list",
            "results"
              ]
        }}
        onData={(res) => {
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
  );
};

export default Result;