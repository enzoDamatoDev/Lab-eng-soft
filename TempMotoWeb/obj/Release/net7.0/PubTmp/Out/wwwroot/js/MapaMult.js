
async function montarMapa(){
    let selecionados = $('#selected').val();
    var resp;

    if (selecionados.length == 0 || selecionados == null){
        alert("selecione ao menos uma medição");
        return;
    }

    let url = baseUrl +"api/medicoes/mapa?itens=";//"https://tempmotoweb.azurewebsites.net/api/medicoes/mapa?itens=";
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
    //console.log(resp);
    // Request needed libraries.
    //@ts-ignore

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerView } = await google.maps.importLibrary("marker");
    var bounds = new google.maps.LatLngBounds();

    // The map, centered at Uluru
    map = new Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: 0, lng: 0 },
        mapId: "DEMO_MAP_ID",
    });

    // The marker, positioned at Uluru
    resp.forEach(function (item, i) {
        var html = `<div class="conteiner">
                        <span>Latitude: ${item.latitude}</span><br>
                        <span>Longitude: ${item.longitude}</span><br>
                        <span>Temperatura: ${item.temperatura}</span><br>
                        <span>Umidade: ${item.umidade}</span><br>
                        <span>Velocidade: ${item.velocidade}</span><br>
                        <span>Data: ${item.data_Medicao}</span><br>

                    </div>`;

        var marker = new AdvancedMarkerView({
            map: map,
            position: {
                lat: item.latitude,
                lng: item.longitude
            }
            ,
            title: item.data_medicao,
        });
        var infowindow = new google.maps.InfoWindow({
            content: html,
            ariaLabel: "marker",
        });
        marker.addListener("click", () => {
            infowindow.open({
                anchor: marker,
                map,
            });
        });
        bounds.extend(marker.position);

    });
    map.fitBounds(bounds);

}