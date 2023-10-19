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
                beginAtZero: false
            }
        }
    }
});

async function montarGrafico() {
    let selecionados = $('#selected').val();
    var resp;
    console.log(selecionados);
    if (selecionados.length == 0 || selecionados == null) {
        alert("selecione ao menos uma medição");
        return;
    }

    let url = baseUrl + "api/medicoes/mapa?itens=";
    url += selecionados.join("&itens=");

    var settings = {
        "url": url,
        "method": "GET",
        "timeout": 0,
        "success": function (data) {
            resp = data;
        },
        async: false
    };

    $.ajax(settings);

    myChart.clear();
    myChart.data.labels = []
    myChart.data.datasets[0].data = [];

    resp.forEach(function (item, i) {

        myChart.data.labels[i] = item.data_Medicao
        myChart.data.datasets[0].label = 'temperatura';
        myChart.data.datasets[0].data[i] = item.temperatura;

    });

    myChart.update()
}







/*function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 44.5452, lng: -78.5389 },
        zoom: 9,
    });
    const bounds = {
        north: 44.599,
        south: 44.49,
        east: -78.443,
        west: -78.649,
    };
    // Define a rectangle and set its editable property to true.
    const rectangle = new google.maps.Rectangle({
        bounds: bounds,
        editable: true,
        draggable: true,
    });

    rectangle.setMap(map);
    // listen to changes
    ["bounds_changed", "dragstart", "drag", "dragend"].forEach((eventName) => {
        rectangle.addListener(eventName, () => {
            console.log({ bounds: rectangle.getBounds()?.toJSON(), eventName });
        });
    });
}

window.initMap = initMap;*/