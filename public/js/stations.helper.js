const form = document.getElementById('filter-form');
form.addEventListener('submit', event => event.preventDefault());

const getStations = (query) => {
    let urlQuery;
    if (query.fuel) {
        if (query.municipio) {
            urlQuery = (`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/PostesMaritimos/FiltroMunicipioProducto/${query.municipio}/${query.fuel}`);
        } else if (query.province) {
            urlQuery = (`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvinciaProducto/${query.province}/${query.fuel}`);
        } else if (query.region) {
            urlQuery = (`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroCCAAProducto/${query.region}/${query.fuel}`);
        } else {
            console.error('You dumb');
            return;
        }
    } else if (query.municipio) {
        urlQuery = (`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/PostesMaritimos/FiltroMunicipio/${query.municipio}`);
    } else if (query.province) {
        urlQuery = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvincia/${query.province}`;
    } else if (query.region) {
        urlQuery = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroCCAA/${query.region}`;
    } else {
        console.error('You really dumb');
        return;
    }
    console.log(query)
    console.log(urlQuery)
    return axios.get('https://thingproxy.freeboard.io/fetch/' + urlQuery);
};

const submitQueryButton = document.getElementById('query-button');

submitQueryButton.addEventListener('click', () => {
    getStations(query)
        .then(data => console.log(data))
        .catch(e => console.error(e)) ;
});