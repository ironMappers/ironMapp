const mymap = L.map('mapid').setView([40.417, -3.703], 6);
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    maxZoom: 18,
}).addTo(mymap);

document.getElementById

const getStationsInfo = () => {
    let lat = '';
    let lon = '';
    axios
        .get(`https://cors-anywhere.herokuapp.com/https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipio/4354`)
        .then(response => {
            console.log(response.data); 
            response.data.ListaEESSPrecio.forEach(station => {
                lat = (station.Latitud).replace(',', '.');
                lon = (station['Longitud (WGS84)']).replace(',', '.');
                const marker = L.marker([lat, lon]);
                marker.addTo(mymap).on('click', function(e) {
                    const popup = L.popup();
                    let index = response.data.ListaEESSPrecio.indexOf(station)
                    popup
                        .setLatLng(e.latlng)
                        .setContent(`
                            <p>${station['Rótulo']}</p>
                            <a href="http://localhost:3000/station/${index}/${station.IDEESS}">Visit Station</a>
                            `)
                        .openOn(mymap);
                })
            });
        })
        .catch(e => console.error(e))
}

getStationsInfo()

const popup = L.popup();

function onMapClick(e) {
popup
    .setLatLng(e.latlng)
    .setContent(e.latlng.toString() + '<a href="http://localhost:3000/login">Visit Google</a>"')
    .openOn(mymap);
}

mymap.on('click', onMapClick);



// mymap.locate({enableHightAccuracy: true});
// mymap.on('locationfound', e => {
//     const coords = [e.latlng.lat, e.latlng.lng]
//     const marker = L.marker(coords);
//     marker.bindPopup('You are here!');
//     mymap.addLayer(marker);
// });

// const marker = L.marker([40.417, -3.703]);
// marker.bindPopup('Hello there');
// mymap.addLayer(marker);
