// Layout component for chart js
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Layout() {
  const [homeValue, setHomeValue] = useState(0);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(20);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanAmount, setLoanAmount] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const calculateMonthlyPayment = () => {
      const principal = homeValue * (1 - downPaymentPercentage / 100);
      const monthlyInterestRate = interestRate / 100 / 12;
      const numberOfPayments = loanTerm * 12;

      const calculatedMonthlyPayment =
        (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

      setMonthlyPayment(calculatedMonthlyPayment.toFixed(2));
    };

    calculateMonthlyPayment();
  }, [homeValue, downPaymentPercentage, interestRate, loanTerm]);

  const [chartData, setChartData] = useState({
    labels: [
      'Monthly Payment',
      'Down Payment',
      'Interest Rates',
      'Loan Amount',
    ],
    datasets: [
      {
        data: [monthlyPayment, downPaymentPercentage, interestRate, loanAmount],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#33FF8F'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#33FF8F'],
      },
    ],
  });
  // useEffect for fetching chart data
  useEffect(() => {
    setChartData({
      labels: [
        'Monthly Payment',
        'Down Payment',
        'Interest Rates',
        'Loan Amount',
      ],
      datasets: [
        {
          data: [
            monthlyPayment,
            downPaymentPercentage,
            interestRate,
            loanAmount,
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#33FF8F'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#33FF8F'],
        },
      ],
    });
  }, [
    monthlyPayment,
    downPaymentPercentage,
    interestRate,
    loanAmount,
    loanTerm,
  ]);
  return (
    <>
      <div className="container mt-5 pt-5">
        <div className="row py-4">
          <div className="col-md-6">
            <h2 className=" text-center fw-bold">Calculator</h2>
            <div className="mt-4">
              {/* calculator component */}
              <div className="container">
                <div className="mb-3">
                  <label htmlFor="homeValue" className="form-label">
                    Home Value
                  </label>
                  <h6>${homeValue}</h6>
                  <input
                    type="range"
                    className="form-range"
                    id="homeValue"
                    min="70000"
                    max="1000000"
                    step="1000"
                    value={homeValue}
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
                      setDownPaymentPercentage(
                        parseFloat(e.target.value).toFixed(2)
                      )
                    }
                  />
                </div>
                {/* <div className="mb-3">
      <div className="mb-3">
        <label htmlFor="loanAmount" className="form-label">
          Loan Amount
        </label>
        <input
          type="range"
          className="form-range"
          id="loanAmount"
          min="0"
          max={homeValue}
          step="1000"
          value={loanAmount}
          onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
        />
      </div>
        </div> */}
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
                    onChange={(e) =>
                      setInterestRate(parseFloat(e.target.value))
                    }
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
            </div>
          </div>
          <div className="col-md-6">
            <h3 className="text-center fw-bold mt-2">Chart</h3>
            <div className="mt-3">
              {/* chart component */}
              <div className="align-items-center">
                <h5 className="text-center">
                  Monthly Payment: ${monthlyPayment}
                </h5>
                <div
                  className="card align-items-center"
                  style={{ width: '400px', height: '300px' }}
                >
                  <Doughnut data={chartData} options={{ responsive: true }} />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end"></div>
          </div>
        </div>
      </div>
    </>
  );
}
