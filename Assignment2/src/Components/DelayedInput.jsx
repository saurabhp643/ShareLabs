import React, { useState, useEffect } from 'react';


function DelayedInput() {
  const [currency, setCurrency] = useState('EST');
  const [borrowAmount, setBorrowAmount] = useState('');
  const [displayBorrowAmount, setDisplayBorrowAmount] = useState('');

  useEffect(() => {
    // Function to update displayBorrowAmount after a delay
    const updateDisplay = () => {
      setDisplayBorrowAmount(borrowAmount);
    };

    // Use a timer to delay the update
    const timer = setTimeout(updateDisplay, 1000); // 1000ms (1 second) delay

    // Clear the timer if the component unmounts or if borrowAmount changes
    return () => {
      clearTimeout(timer);
    };
  }, [borrowAmount]);

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
  };

  const handleBorrowAmountChange = (e) => {
    const newBorrowAmount = e.target.value;
    // Validate the input (only allow positive numbers including decimals)
    if (/^\d*\.?\d*$/.test(newBorrowAmount) || newBorrowAmount === '') {
      setBorrowAmount(newBorrowAmount);
    }
  };

  return (
    <div className="main">
      <div className="left"> 
     <div className="dotted-div-right">
    <div className="delayed-input">
      <div className="input-container">
       <label htmlFor="currencyDropdown">Select Asset</label>
        <select
          id="currencyDropdown"
          value={currency}
          onChange={handleCurrencyChange}
        >
          <option value="EST">EST</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          {/* Add more currency options as needed */}
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="borrowAmount" className='borrow2'>Borrow Amount:</label>
        <label className='borrow'>Max Held Amount:200</label>
        <input
          type="text"
          id="borrowAmount"
          placeholder='Enter Supply Amount'
          value={borrowAmount}
          onChange={handleBorrowAmountChange}
        />
        
      </div>
      <button className='button'>Execute</button>
      
    </div></div></div>
    <div className="right">
    <div className="dotted-right1">
    
        
       <div> <span>{currency}</span></div>
       </div>
       <div className="dotted-right2">
    
        
       <div> <span>{displayBorrowAmount}</span></div>
       </div>
  
    </div>
    </div>
  );
}

export default DelayedInput;
