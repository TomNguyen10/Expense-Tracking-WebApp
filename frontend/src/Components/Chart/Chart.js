import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { dateFormat } from "../../utils/dateFormat";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { incomes, expenses } = useGlobalContext();

  const data = {
    labels: [
      ...incomes.map((inc) => dateFormat(inc.date)),
      ...expenses.map((exp) => dateFormat(exp.date)),
    ],
    datasets: [
      {
        label: "Income",
        data: [
          ...incomes.map((income) => income.amount),
          ...Array(expenses.length).fill(null), // To align data with expenses
        ],
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "Expenses",
        data: [
          ...Array(incomes.length).fill(null), // To align data with incomes
          ...expenses.map((expense) => expense.amount),
        ],
        backgroundColor: "red",
        tension: 0.2,
      },
    ],
  };

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

export default Chart;
