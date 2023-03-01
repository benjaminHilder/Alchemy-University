import { Link } from "react-router-dom"
import logo from "../Eth Logo spinning.gif"

export const Navbar = () => {
    return (
        <div>
            <img src={logo} style={{height: "10vh", width: "15vh", position: "absolute", left: "15vh"}} />
            <h2 style={{position: "absolute", left: "30vh", top: "2vh"}}>Ethersearch</h2>
            <Link to="/">Home</Link>
            <Link to="/Block"> Block </Link>
            <Link to="/LatestTransactions"> LatestTransactions</Link>
            <Link to="/Transactions"> Transactions </Link>
            <Link to="/TokenHoldings"> Token Holdings</Link>
            <Link to="/NFTHoldings"> NFT Holdings</Link>

        </div>
    )
}