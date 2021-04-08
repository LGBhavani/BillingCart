import Navbar from './components/elements/Navbar';
import Item from './components/items/Items';
import './styles/App.scss';
import store from './store';
import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store = {store}>
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="py-3">
          <Item />
        </div>
      </div>
    </div>
    </Provider>
  );
}

export default App;
