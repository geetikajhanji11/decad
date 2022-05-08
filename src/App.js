import './App.css';
import HomePage from './pages/HomePage';
import UserContextProvider from './store/user-context';
import Layout from "./components/Layout"
import { Routes, Route, Navigate } from 'react-router-dom';
import Companies from './components/Companies';
import Influencers from './components/Influencers';
import Products from './components/Products';

import NotFound from './pages/NotFound';
import ConnectWallet from './components/ConnectWallet';

function App() {
  
  return (
    <UserContextProvider>
      
        <Routes>
        <Route path='/' element={<Navigate replace to='/home' />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/connect-wallet' element={<ConnectWallet />} />
        <Route path='/companies' element={<Companies />}/>
        <Route path='/influencers' element={<Influencers />}/>
        <Route path='/products' element={<Products />}/>
        
        <Route path='*' element={<NotFound />} />
        </Routes>
      
    </UserContextProvider>
  );
}

export default App;
