import { useEffect, useState } from "react";

function CoinTracker() {
  const [loding, setLoding] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState(0);
  const [selected, setSelected] = useState(0);
  const onChange = (event) => setAmount(event.target.value);
  const onSelect = (event) => setSelected(event.target.value);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers") //코인 API
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoding(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins World {loding ? "" : `(${coins.length})`}</h1>
      <h2>Have Coins</h2>
      <input value={amount} onChange={onChange} type="number" /> USD
      <hr />
      <h2>To change Coins</h2>
      {loding ? (
        <strong>Loding...</strong>
      ) : (
        <select onChange={onSelect}>
          {coins.map((coin, index) => (
            <option value={index} key={coin.id} id={coin.symbol}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <hr />
      <h2>Result</h2>
      <input
        type="number"
        value={
          amount !== 0 ? amount / coins[parseInt(selected)].quotes.USD.price : 0
        }
        disabled
      />{" "}
      {loding ? null : coins[parseInt(selected)].symbol}
    </div>
  );
}

export default CoinTracker;
