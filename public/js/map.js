const mymap = L.map('mapid').setView([40.417, -3.703], 6);
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    maxZoom: 18,
}).addTo(mymap);

const submitQueryButton = document.getElementById('query-button');

submitQueryButton.addEventListener('click', () => {
    getStations(query)
        .then(response => {
            response.data.ListaEESSPrecio.forEach(station => {
                
                const lat = (station.Latitud).replace(',', '.');
                const lon = (station['Longitud (WGS84)']).replace(',', '.');
                const marker = L.marker([lat, lon]);

                marker.addTo(mymap).on('click', function(event) {
                    const popup = L.popup();
                    popup
                        .setLatLng(event.latlng)
                        .setContent(`
                            <p>${station['Rótulo']}</p>
                            <a href="http://localhost:3000/station/${station.IDEESS}/${station.IDMunicipio}">Visit Station</a>
                            `)
                        .openOn(mymap);
                });
            });

        })
        .catch(e => console.error(e)) ;
});
