import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Form from './components/Form'
import Table from './components/Table';
import { ContextProvider } from './components/UserContext';

function App() {
  return (
    <div className='app'>
      <ContextProvider>
          <Router>
            <Routes>
                <Route path='/' element={<Form/>}/>
                <Route path='/table' element={<Table/>}/>
            </Routes>
          </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
