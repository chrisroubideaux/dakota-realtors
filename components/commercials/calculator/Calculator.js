// Calculator component

import { useEffect, useState } from 'react';

const Calculator = ({}) => {
  const [propertyValue, setHomeValue] = useState(0);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(20);
  const [loanAmount, setLoanAmount] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const calculateMonthlyPayment = () => {
      const principal = propertyValue * (1 - downPaymentPercentage / 100);
      const monthlyInterestRate = interestRate / 100 / 12;
      const numberOfPayments = loanTerm * 12;

      const calculatedMonthlyPayment =
        (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

      setMonthlyPayment(calculatedMonthlyPayment.toFixed(2));
    };

    calculateMonthlyPayment();
  }, [propertyValue, downPaymentPercentage, interestRate, loanTerm]);

  return (
    <div className="container">
      <div className="mb-3">
        <label htmlFor="homeValue" className="form-label">
          Home Value
        </label>
        <h6>${propertyValue}</h6>
        <input
          type="range"
          className="form-range"
          id="homeValue"
          min="70000"
          max="1000000"
          step="1000"
          value={propertyValue}
          onChange={(e) => setHomeValue(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="downPayment" className="form-label">
          Down Payment (%)
        </label>
        <h6>{downPaymentPercentage}%</h6>
        <input
          type="range"
          className="form-range"
          id="downPayment"
          min="0"
          max="100"
          step="1"
          value={downPaymentPercentage}
          onChange={(e) =>
            setDownPaymentPercentage(parseFloat(e.target.value).toFixed(2))
          }
        />
      </div>

      <div className="mb-3">
        <label htmlFor="loanAmount" className="form-label">
          Loan Amount
        </label>
        <input
          type="range"
          className="form-range"
          id="loanAmount"
          min="0"
          max={propertyValue}
          step="1000"
          value={loanAmount}
          onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="interestRate" className="form-label">
          Interest Rate (%)
        </label>
        <h6>{interestRate}%</h6>
        <input
          type="range"
          className="form-range"
          id="interestRate"
          min="0"
          max="10"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="loanTerm" className="form-label">
          Loan Term (Years)
        </label>
        <select
          className="form-select"
          id="loanTerm"
          value={loanTerm}
          onChange={(e) => setLoanTerm(parseInt(e.target.value))}
        >
          <option value="15">15 years</option>
          <option value="30">30 years</option>
        </select>
      </div>
      <div className="mt-4">
        <h5>Monthly Mortgage Payment: ${monthlyPayment}</h5>
      </div>
    </div>
  );
};

export default Calculator;
