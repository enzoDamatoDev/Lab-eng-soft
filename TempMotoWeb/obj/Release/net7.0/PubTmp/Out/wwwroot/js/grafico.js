const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: [],
            data: [],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

async function montarGrafico() {

    myChart.clear();
    myChart.data.labels = []
    myChart.data.datasets[0].data = [];
    myChart.data.datasets[0].label = 'temperatura';

    pontosGrafico.forEach(function (item, i) {

        myChart.data.labels[i] = item.data_Medicao
        myChart.data.datasets[0].data[i] = item.temperatura;

    });

    myChart.update()
}