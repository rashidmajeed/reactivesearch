import React from 'react';
import "../App.css";
import { SingleRange } from '@appbaseio/reactivesearch';

const Searchbyfields = () => (
<div className="search-range">
<span className="width-adjust">
<SingleRange
	componentId="all-filter"
	title="All"
	dataField={["artists.search","titles.search","publishedYear.search"]}
	data={[
        {"start": 1, "end": 1859}
	]}
	defaultSelected="All"
/>
</span>
<span className="width-adjust">
<SingleRange
	componentId="artist-filter"
	title="Artist"
	dataField="titles.search"
	data={[
        {"start": 1, "end": 1859}
	]}
/>
</span>
<span className="width-adjust">
<SingleRange
	componentId="title-filter"
	title="Title"
	dataField="titles.search"
	data={[
        {"start": 1, "end": 1859}
	]}
/>
</span>
<span className="width-adjust">
<SingleRange
	componentId="year-filter"
	title="Year"
	dataField="publishedYear.search"
	data={[
        {"start": 1, "end": 1859}
	]}
/>
</span>
</div>
);

export default Searchbyfields;