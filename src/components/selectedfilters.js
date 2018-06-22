import React from 'react';
import { SelectedFilters } from '@appbaseio/reactivesearch';


const Selectedfilters = () => (

  <div className="selectedfilters">
    <SelectedFilters
      showClearAll={true}
      clearAllLabel="Clear All"
    />
  </div>
);

export default Selectedfilters;
