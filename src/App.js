import React, {Component} from 'react';
import Form from './components/Form.js';
import List from './components/List.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941


//styles
import './App.less';


export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Form />
        </div>
      </MuiThemeProvider>
    )
  }
}
