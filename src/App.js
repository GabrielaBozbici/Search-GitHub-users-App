import React, {Component} from 'react';
import Form from './components/Form.js';
import List from './components/List.js';

//styles
import './App.less';


export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Form />
      </div>
    )
  }
}
