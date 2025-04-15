import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { evaluate } from "mathjs";

const GraphingCalculator = () => {
  const [expression, setExpression] = useState("x^2");
  const [dataPoints, setDataPoints] = useState(generateData("x^2"));

  function generateData(expr) {
    const xValues = [];
    const yValues = [];
    for (let x = -10; x <= 10; x += 0.5) {
      try {
        const scope = { x };
        const y = evaluate(expr, scope);
        xValues.push(x);
        yValues.push(y);
      } catch (err) {
        xValues.push(x);
        yValues.push(null);
      }
    }
    return { x: xValues, y: yValues };
  }

  function handleInputChange(e) {
    const expr = e.target.value;
    setExpression(expr);
    setDataPoints(generateData(expr));
  }

  const chartData = {
    labels: dataPoints.x,
    datasets: [
      {
        label: `y = ${expression}`,
        data: dataPoints.y,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        pointRadius: 0,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "x",
        },
      },
      y: {
        title: {
          display: true,
          text: "y",
        },
      },
    },
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Graphing Calculator</h1>
      <input
        type="text"
        value={expression}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded mb-6"
        placeholder="Enter an expression (e.g. x^2, sin(x), x^3 - x)"
      />
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default GraphingCalculator;
