import React from 'react';
import "../App.css";
import { DataSearch } from '@appbaseio/reactivesearch';

const SearchData = () => (
  <div className="search-container">
    <DataSearch
      componentId="mainSearch"
      dataField={["artists","artists.search","titles","titles.search","publishedYear","publishedYear.search"]}
      className="datasearch"
      innerClass={{
        "input": "searchbox",
        "list": "suggestionlist"
      }}
      queryFormat="and"
      placeholder="Search.."
      iconPosition="left"
      autosuggest={false}
      filterLabel="search"
    />
 </div>
);

export default SearchData;
