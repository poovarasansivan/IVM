import React, { useState, useEffect } from "react";
import InfoCard from "../components/Cards/InfoCard";
import ChartCard from "../components/Chart/ChartCard";
import ChartLegend from "../components/Chart/ChartLegend";
import PageTitle from "../components/Typography/PageTitle";
import { MdOutlinePendingActions } from "react-icons/md";
import { PiGitPullRequestDuotone } from "react-icons/pi";
import { TbPlaceholder } from "react-icons/tb";
import { GoVerified } from "react-icons/go";
import { Bar } from "react-chartjs-2";
import RoundIcon from "../components/RoundIcon";

import response from "../utils/demo/tableData";
import {
  BudgetbarOptions,
  BudgetbarLegends,
  barOptions,
  barLegends,
} from "../utils/demo/chartsData";

function Dashboard() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalvisits, setTotalVisits] = useState(0);
  const [approvedreq, setApprovedReq] = useState(0);
  const [pendingreq, setPendingReq] = useState(0);
  const [barData, setBarData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Total Approved Request",
        backgroundColor: "#0694a2",
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 0, 0], // Default data
      },
      {
        label: "Total Visits Conducted",
        backgroundColor: "#7e3af2",
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 0, 0], // Default data
      },
    ],
  });

  const [budgetData, setBudgetData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Allocated Budget",
        backgroundColor: "#3b82f6",
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 0, 0], // Default data
      },
      {
        label: "Utilized Budget",
        backgroundColor: "#14b8a6",
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 0, 0], // Default data
      },
    ],
  });

  const resultsPerPage = 10;
  const totalResults = response.length;

  useEffect(() => {
    fetchTotalApprovedReq();
    fetchTotalVisitConducted();
    fetchTotalPendingReq();
    fetchMonthlyData();
    fetchBudgetData();
  }, []);

  const fetchTotalApprovedReq = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/protected/get-total-req",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setApprovedReq(data.total_approved_request);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTotalVisitConducted = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/protected/get-total-visit",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setTotalVisits(data.total_visit_conducted);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTotalPendingReq = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/protected/get-total-pending",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setPendingReq(data.total_pending_request);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetching data for the chart (monthly requests and reports)
  const fetchMonthlyData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/protected/get-total-monthly-request",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      processChartData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Processing the data and updating chart
  const processChartData = (data) => {
    const approvedRequestCounts = new Array(7).fill(0);
    const visitCounts = new Array(7).fill(0);
    const months = ["01", "02", "03", "04", "05", "06", "07"];

    data.forEach((item) => {
      const monthIndex = months.indexOf(item.request_month);
      if (monthIndex !== -1) {
        if (item.type === "Requests") {
          approvedRequestCounts[monthIndex] += item.count;
        } else if (item.type === "Reports") {
          visitCounts[monthIndex] += item.count;
        }
      }
    });

    setBarData({
      labels: months.map((month) => {
        const date = new Date(2023, months.indexOf(month));
        return date.toLocaleString("default", { month: "long" });
      }),
      datasets: [
        {
          label: "Total Approved Request",
          backgroundColor: "#0694a2",
          borderWidth: 1,
          data: approvedRequestCounts,
        },
        {
          label: "Total Visits Conducted",
          backgroundColor: "#7e3af2",
          borderWidth: 1,
          data: visitCounts,
        },
      ],
    });
  };
  const fetchBudgetData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/protected/get-total-monthly-budget", // Adjust endpoint if necessary
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      processBudgetData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const processBudgetData = (data) => {
    const allocatedData = new Array(7).fill(0);
    const utilizedData = new Array(7).fill(0);
    const months = ["01", "02", "03", "04", "05", "06", "07"];
    console.log(allocatedData);
    data.allocated_budgets.forEach((item) => {
      const monthIndex = months.indexOf(item.month);
      if (monthIndex !== -1) {
        allocatedData[monthIndex] = item.total_allocated_budget;
      }
    });

    data.utilized_amounts.forEach((item) => {
      const monthIndex = months.indexOf(item.month);
      if (monthIndex !== -1) {
        utilizedData[monthIndex] = item.total_utilized_amount;
      }
    });

    setBudgetData({
      labels: months.map((month) => {
        const date = new Date(2023, months.indexOf(month));
        return date.toLocaleString("default", { month: "long" });
      }),
      datasets: [
        {
          label: "Allocated Budget",
          backgroundColor: "#3b82f6",
          borderWidth: 1,
          data: allocatedData,
        },
        {
          label: "Utilized Budget",
          backgroundColor: "#14b8a6",
          borderWidth: 1,
          data: utilizedData,
        },
      ],
    });
  };

  function onPageChange(p) {
    setPage(p);
  }

  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);
  return (
    <>
      <PageTitle>Admin Dashboard</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Approved Request" value={approvedreq}>
          <RoundIcon
            icon={PiGitPullRequestDuotone}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total visits Conducted" value={totalvisits}>
          <RoundIcon
            icon={TbPlaceholder}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Approved Request" value={approvedreq}>
          <RoundIcon
            icon={GoVerified}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending Request" value={pendingreq}>
          <RoundIcon
            icon={MdOutlinePendingActions}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <PageTitle>Total Industrial Visits Analytics And Budget</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Last 6 Months Industrial Visits">
          <Bar data={barData} options={barOptions.options} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
        <ChartCard title="Last 6 Months Industrial Visits Budget">
          <Bar data={budgetData} options={barOptions.options} />
          <ChartLegend legends={BudgetbarLegends} />
        </ChartCard>
      </div>
    </>
  );
}

export default Dashboard;
