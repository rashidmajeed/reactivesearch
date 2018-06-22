import { MultiDropdownList } from '@appbaseio/reactivesearch';
import React from 'react';

const Filterdata = () => (
  <div>
    <MultiDropdownList
      componentId="genres-list"
      dataField="genres_data.raw"
      className="genres-filter"
      size={20}
      sortBy="asc"
      queryFormat="or"
      selectAllLabel="All Genres"
      showCount={true}
      showSearch={true}
      placeholder="Browse movies by Genre"
      react={{
        and: [
          "mainSearch",
          "results",
        ]
      }}
      showFilter={true}
      filterLabel="Genre"
      URLParams={false}
      innerClass={{
        label: "list-item",
        input: "list-input"
      }}
    />
  </div>
);

export default Filterdata;



