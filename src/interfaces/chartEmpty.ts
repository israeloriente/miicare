export const BarChartEmpty = (): any => {
  return {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        {
          label: '',
          data: [],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            autoSkip: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };
};

export const PieChartEmpty = (): any => {
  return {
    type: 'pie',
    data: {
      labels: [],
      datasets: [
        {
          label: '',
          data: [],
          backgroundColor: ['#2bb8f1', '#192a43', '#13556f'],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        datalabels: {
          formatter: (value: string) => {
            return value;
          },
          color: '#fff',
          font: {
            weight: 'bold',
            size: 12,
          },
        },
      },
    },
  };
};
