// chart component
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({}) => {
  const [homeValue, setHomeValue] = useState(0);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(20); // Default down payment percentage
  const [interestRate, setInterestRate] = useState(4.5); // Default interest rate
  const [loanAmount, setLoanAmount] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30); // Default loan term in years
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
  }, [
    monthlyPayment,
    homeValue,
    downPaymentPercentage,
    interestRate,
    loanTerm,
  ]);

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
    <div className="align-items-center">
      <h5>Monthly Mortgage Payment: ${monthlyPayment}</h5>
      <div
        className="card align-items-center"
        style={{ width: '400px', height: '300px' }}
      >
        <Doughnut data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Chart;
