import { Alchemy, Network } from 'alchemy-sdk';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { Home } from "./Pages/Home"
import { Navbar } from "./Pages/Navbar"
import { Block } from "./Pages/Block"
import { Transactions } from "./Pages/Transactions"
import { LatestTransactions } from './Pages/LatestTransactions';
import { TokenHoldings } from './Pages/TokenHoldings';
import { NFTHoldings } from './Pages/NFTHoldings';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Block" element={<Block />} />
          <Route path="/Transactions" element={<Transactions />} />
          <Route path="/LatestTransactions" element={<LatestTransactions />} />
          <Route path="/TokenHoldings" element={<TokenHoldings /> } />
          <Route path="/NFTHoldings" element={<NFTHoldings />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
