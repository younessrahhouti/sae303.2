

const spending = {
  years: [2022, 2023, 2024, 2025],
  home: [33.45, 32.32, 33.33, 33.63],
  out: [8.07, 8.45, 8.95, 9.87]
};


const categorySelect = document.querySelector('#category');

const rangeButtons = document.querySelectorAll('[data-range]');

const detail = document.querySelector('#chartDetail');

let selectedRange = 'all';


const chart = new Chart(document.querySelector('#spendingChart'), {

  type: 'line',

  data: {
    labels: [],
    datasets: []
  },

  options: {

    responsive: true,

    maintainAspectRatio: false,

    interaction: {
      mode: 'nearest',
      intersect: false
    },


    onClick: (event, elements, chartInstance) => {

      if (!elements.length) return;

      const point = elements[0];

      const label =
        chartInstance.data.datasets[point.datasetIndex].label;

      const year =
        chartInstance.data.labels[point.index];

      const value =
        chartInstance.data.datasets[point.datasetIndex].data[point.index];

      detail.textContent =
        `${year} — ${label}: £${value.toFixed(2)} per person per week.`;

    },


    plugins: {


      legend: {
        position: 'bottom',

        labels: {
          usePointStyle: true,
          padding: 18
        }
      },


      tooltip: {

        callbacks: {

          label: context =>
            `${context.dataset.label}: £${context.parsed.y.toFixed(2)}`

        }

      }

    },


    scales: {

      y: {

        beginAtZero: true,

        title: {
          display: true,
          text: '£ per person per week'
        },

        ticks: {
          callback: value => '£' + value
        }

      },

      x: {

        grid: {
          display: false
        }

      }

    }

  }

});


function updateChart() {

  const first = selectedRange === 'recent' ? 2 : 0;

  const choice = categorySelect.value;

  chart.data.labels = spending.years.slice(first);

  const datasets = [];


  if (choice === 'both' || choice === 'home') {

    datasets.push({

      label: 'At home',

      data: spending.home.slice(first),

      borderColor: '#27644d',

      backgroundColor: '#27644d',

      tension: 0.2,

      borderWidth: 3,

      pointRadius: 6,

      pointHoverRadius: 9

    });

  }



  if (choice === 'both' || choice === 'out') {

    datasets.push({

      label: 'Eating out',

      data: spending.out.slice(first),

      borderColor: '#ea8569',

      backgroundColor: '#ea8569',

      tension: 0.2,

      borderWidth: 3,

      pointRadius: 6,

      pointHoverRadius: 9

    });

  }



  chart.data.datasets = datasets;

  chart.update();



  detail.textContent =
    'Tip: hover over or click a data point for its exact value. Click the legend to hide a line.';

}



categorySelect.addEventListener('change', updateChart);



rangeButtons.forEach(button => {

  button.addEventListener('click', () => {

    selectedRange = button.dataset.range;

    rangeButtons.forEach(item => {

      const active = item === button;

      item.classList.toggle('active', active);

      item.setAttribute('aria-pressed', String(active));

    });

    updateChart();

  });

});



updateChart();