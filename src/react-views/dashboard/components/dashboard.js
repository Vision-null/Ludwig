import Chart from 'chart.js/auto';
console.log("Running...");
function createChart() {
  const ctx = document.getElementById('myChart').getContext('2d');
  const progressionChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Errors Over Time',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false
      }]
    },
    options: {
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true
        }
      }
    }
  });
  return progressionChart;
}

let chart = createChart();

window.addEventListener('message', event => {
  const message = event.data;
  switch (message.command) {
    case 'updateErrors':
      const timestamp = new Date().toLocaleTimeString();
      chart.data.labels.push(timestamp);
      chart.data.datasets[0].data.push(message.errorCount);
      chart.update();
      break;
  }
});
