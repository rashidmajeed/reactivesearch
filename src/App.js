
/**
 * ReactiveSearch components are wrapped inside a container component ReactiveBase.
 * ReactiveBase which glues the Elasticsearch index the ReactiveSearch components together.
 */
import React from 'react';
import { ReactiveBase } from '@appbaseio/reactivesearch';
import Navbar from './components/navbar';
import SearchData from './components/datasearch';
import Filterdata from './components/dropdownlist';
import Result from './components/result';
import Selectedfilters from './components/selectedfilters';
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <ReactiveBase
          app="MovieAppFinal"
          credentials="RxIAbH9Jc:6d3a5016-5e9d-448f-bd2b-63c80b401484"
        >
          <div className="header">
            <Navbar />
            <div className="search-container">
              <SearchData />
            </div>
            <span className="dropdownlist-genres-list">
              <Filterdata />
            </span>
          </div>
          <div class="result-container">
            <div className="selectedfilters-genres-list">
              <Selectedfilters />
            </div>
            <Result />
          </div>
        </ReactiveBase>
      </div>
    );
  }
}
export default App;
