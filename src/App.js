
/**
 * ReactiveSearch components are wrapped inside a container component ReactiveBase.
 * ReactiveBase which glues the Elasticsearch index the ReactiveSearch components together.
 */
import React from 'react';
import { ReactiveBase } from '@appbaseio/reactivesearch';
import Navbar from './components/navbar';
import SearchData from './components/datasearch';
import Searchbyfields from './components/filters';
import Result from './components/result';
import "./App.css";


class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <ReactiveBase
          app="africanmusicapp"
          credentials="A9hoNRoS8:ef3bf790-6d96-4b50-9125-31ff596ebe21"
        >
          <div className="header">
            <Navbar />
            <div className="search-container">
              <SearchData />
            </div>
            <div>
            <span>
            <Searchbyfields />
            </span>
            </div>
          </div>
          <div class="result-container">
            <Result />
          </div>
        </ReactiveBase>
      </div>
    );
  }
}
export default App;
