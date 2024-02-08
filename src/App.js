// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useState, useEffect } from 'react';

export default function App() {
  const [amount, setAmount] = useState(0);
  const [currencyMain, setCurrencyMain] = useState('');
  const [currencySecondary, setCurrencySecondary] = useState('');
  const [converted, setConverted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currencyAPI = async () => {
      if (
        !amount ||
        amount < 0 ||
        currencyMain === currencySecondary ||
        !currencyMain ||
        !currencySecondary
      ) {
        setConverted(0);
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${currencyMain}&to=${currencySecondary}`
        );
        const data = await res.json();
        if (!data.rates) {
          setConverted(0);
          return;
        }
        if (currencyMain !== currencySecondary) {
          setConverted(data.rates[currencySecondary]);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    currencyAPI();
  }, [amount, currencyMain, currencySecondary]);

  return (
    <div className="converter">
      <input
        type="number"
        // value={amount}
        min={0}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        onChange={(e) => setCurrencyMain(e.target.value)}
        disabled={isLoading}
      >
        <option value="" hidden>
          Select Currency
        </option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        onClick={(e) => setCurrencySecondary(e.target.value)}
        disabled={isLoading}
      >
        <option value="" hidden>
          Select Currency
        </option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {converted ? (
        <p>{`${amount} ${currencyMain} is ${converted} ${currencySecondary}`}</p>
      ) : (
        ''
      )}
    </div>
  );
}
