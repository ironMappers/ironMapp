const mymap = L.map('mapid').setView([40.417, -3.703], 6);
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    maxZoom: 18,
}).addTo(mymap);

const gasIcon = L.icon({
    iconUrl: '../img/gas_station.png',
    iconSize:     [36, 53], // size of the icon
    iconAnchor:   [17, 52] // point of the icon which will correspond to marker's location
 // point from which the popup should open relative to the iconAnchor
});

const submitQueryButton = document.getElementById('query-button');
let layerGroup = L.layerGroup().addTo(mymap);
submitQueryButton.addEventListener('click', () => {
    getStations(query)
        .then(response => {
            const markerArr = [];
            layerGroup.clearLayers();

            response.data.ListaEESSPrecio.forEach(station => {
                
                const lat = (station.Latitud).replace(',', '.');
                const lon = (station['Longitud (WGS84)']).replace(',', '.');
                const marker = L.marker([lat, lon], {icon: gasIcon});
                markerArr.push(marker);

                marker.addTo(layerGroup);
                marker.on('click', function(event) {
                    const popup = L.popup({
                        offset: [-3, -53],
                        className: 'custom-popup'
                    });
                    const stationUrl = `${APP_URL}/station/${station.IDEESS}/${station.IDMunicipio}`;
                    popup
                        .setLatLng(event.latlng)
                        .setContent(`
                            <p>${station['Rótulo']}</p>
                            <a href="${stationUrl}">Visit Station</a>
                            `)
                        .openOn(mymap);
                });
            });
            group = new L.featureGroup(markerArr);
            mymap.fitBounds(group.getBounds());
        })
        .catch(e => console.error(e)) ;
});
