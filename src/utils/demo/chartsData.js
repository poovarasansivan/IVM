export const doughnutLegends = [
  { title: "Shirts", color: "bg-blue-500" },
  { title: "Shoes", color: "bg-teal-600" },
  { title: "Bags", color: "bg-purple-600" },
];

export const lineLegends = [
  { title: "Organic", color: "bg-teal-600" },
  { title: "Paid", color: "bg-purple-600" },
];

export const barLegends = [
  { title: "Approved Request", color: "bg-teal-600" },
  { title: "Visits Conducted", color: "bg-purple-600" },
];
export const BudgetbarLegends = [
  { title: "Allocated Budget", color: "bg-blue-500" },
  { title: "Budget Utilized ", color: "bg-teal-500" },
];

export const doughnutOptions = {
  data: {
    datasets: [
      {
        data: [33, 33, 33],
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: ["#0694a2", "#1c64f2", "#7e3af2"],
        label: "Dataset 1",
      },
    ],
    labels: ["Shoes", "Shirts", "Bags"],
  },
  options: {
    responsive: true,
    cutoutPercentage: 80,
  },
  legend: {
    display: false,
  },
};

export const lineOptions = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Organic",
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: "#0694a2",
        borderColor: "#0694a2",
        data: [43, 48, 40, 54, 67, 73, 70],
        fill: false,
      },
      {
        label: "Paid",
        fill: false,
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: "#7e3af2",
        borderColor: "#7e3af2",
        data: [24, 50, 64, 74, 52, 51, 65],
      },
    ],
  },
  options: {
    responsive: true,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Month",
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Value",
        },
      },
    },
  },
  legend: {
    display: false,
  },
};

export const barOptions = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Total Approved Request",
        backgroundColor: "#0694a2",
        borderWidth: 1,
        data: [13, 14, 22, 34, 33, 20, 30],
      },
      {
        label: "Total visits Conducted",
        backgroundColor: "#7e3af2",
        borderWidth: 1,
        data: [13, 10, 20, 30, 28, 16, 25],
      },
    ],
  },
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
};

export const BudgetbarOptions = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Allocated Budget",
        backgroundColor: "#3b82f6",
        borderWidth: 1,
        data: [13000, 140000, 220000, 340000, 330000, 200000, 300000],
      },
      {
        label: "Utilized Budget",
        backgroundColor: "#14b8a6",
        borderWidth: 1,
        data: [13000, 100000, 200000, 300000, 280000, 160000, 250000],
      },
    ],
  },
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
};
