import { Chart as ChartJS } from 'chart.js/auto';
import { useEffect } from 'react';
import { useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
const App = () => {
  const [data, setData] = useState({});

  function getDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0'); // two digits
    const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const year = String(now.getFullYear()).slice(-2); // last 2 digits
    return `${day}/${month}/${year}`;
  }
  function onViewIncrement() {
    const date = getDate();
    setData((prev) => ({
      ...prev,
      views: {
        ...prev.views,
        [date]: (prev.views?.[date] || 0) + 1,
      },
    }));

    fetch('http://localhost:3000/api/view', { method: 'POST' });
  }
  function onClickIncrement() {
    const date = getDate();
    setData((prev) => ({
      ...prev,
      clicks: {
        ...prev.clicks,
        [date]: (prev.clicks?.[date] || 0) + 1,
      },
    }));
    fetch('http://localhost:3000/api/click', { method: 'POST' });
  }

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch('http://localhost:3000/api/analytics');
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const barData = {
    labels: Object.keys(data.views || {}),
    datasets: [
      {
        label: 'Views',
        data: Object.values(data.views || {}),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const lineData = {
    labels: Object.keys(data.clicks || {}),
    datasets: [
      {
        label: 'Clicks',
        data: Object.values(data.clicks || {}),
        borderColor: 'rgba(255, 99, 132, 0.8)',
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
        fill: true,
      },
    ],
  };

  return (
    <div className="container">
      <div className="charts-container">
        <div className="chart">
          <Bar data={barData} />
        </div>
        <div className="chart">
          {' '}
          <Line data={lineData} />
        </div>
      </div>
      <div className="buttons">
        <button onClick={onViewIncrement}>+ View</button>
        <button onClick={onClickIncrement}>+ Click</button>
      </div>
    </div>
  );
};

export default App;
