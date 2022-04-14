import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'

import store from './store'

// console.log('index.js -> store -> state', store.getState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)