import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';

import App from 'App';

const Main: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Main />, document.getElementById('root'));
