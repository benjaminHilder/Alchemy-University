import "../css/search.css"

export const Search = () => {

    return (
        <div className="main">
            <div className="infoBlock">
                <div className="titles">
                    <h3>Transaction Hash</h3>
                    <h3>Status</h3>
                    <h3>Block</h3>
                    <h3>Timestamp</h3>

                    <h3>From</h3>
                    <h3>To</h3>

                    <h3>Value</h3>
                    <h3>Transaction Fee</h3>
                    <h3>Gas Price</h3>
                </div>

                <div className="data">
                    <h3>{localStorage.getItem("Transaction Hash")}</h3>
                    <h3>{localStorage.getItem("Status")}</h3>
                    <h3>{localStorage.getItem("Block")}</h3>
                    <h3>{localStorage.getItem("Timestamp")}</h3>

                    <h3>{localStorage.getItem("From")}</h3>
                    <h3>{localStorage.getItem("To")}</h3>

                    <h3>{localStorage.getItem("Value")}</h3>
                    <h3>{localStorage.getItem("Fee")}</h3>
                    <h3>{localStorage.getItem("GasPrice")}</h3>
                </div>
            </div>
        </div>
    )
}