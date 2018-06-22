import React from 'react';
import "../App.css";
import { DataSearch } from '@appbaseio/reactivesearch';

const SearchData = () => (
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
);

export default SearchData;
