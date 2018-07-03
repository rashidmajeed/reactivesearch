import React from 'react';
import "../App.css";
import { ResultCard } from '@appbaseio/reactivesearch';

const Result = () => {
  return (
    <div>
      <ResultCard
        componentId="results"
        title="Results"
        dataField={["artists","titles","publishedYear"]}
        pagination={true}
        paginationAt="bottom"
        pages={10}
        size={12}
        Loader="Loading..."
        showResultStats={true}
        noResults="Sorry! nothing found..."

        react={{
          and: [
            "mainSearch",
            "all-filter",
            "artist-filter",
            "title-filter",
            "year-filter"
              ]
        }}
        onData={(res)=>({
          "title": res.titles  
        })}
    
  />
      
    </div>
  );
};

export default Result;