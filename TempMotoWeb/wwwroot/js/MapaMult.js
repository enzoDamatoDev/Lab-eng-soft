
async function montarMapa(){
    let selecionados = $('#selected').val();
    var resp;

    if (selecionados.length == 0 || selecionados == null){
        alert("selecione ao menos uma medição");
        return;
    }

    let url = "https://tempmotoweb.azurewebsites.net//api/medicoes/mapa?itens=";
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

    const position = { lat: resp[0].latitude, lng: resp[0].longitude };
    // Request needed libraries.
    //@ts-ignore
    console.log(position)

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

    // The map, centered at Uluru
    map = new Map(document.getElementById("map"), {
        zoom: 15,
        center: position,
        mapId: "DEMO_MAP_ID",
    });

    // The marker, positioned at Uluru
    const marker = new AdvancedMarkerView({
        map: map,
        position: position,
        title: "Uluru",
    });
}