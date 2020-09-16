const form = document.getElementById('filter-form');
form.addEventListener('submit', event => event.preventDefault());

/*PUT ALL URLS INSIDE CONSTANTS.JS*/
const getStations = (query) => {
    let urlQuery;
    if (query.fuel) {
        if (query.municipio) {
            urlQuery = (`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipioProducto/${query.municipio}/${query.fuel}`);
        } else if (query.province) {
            urlQuery = (`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvinciaProducto/${query.province}/${query.fuel}`);
        } else if (query.region) {
            urlQuery = (`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroCCAAProducto/${query.region}/${query.fuel}`);
        } else {
            console.error('Query Error');
            return;
        }
    } else if (query.municipio) {
        urlQuery = (`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipio/${query.municipio}`);
    } else if (query.province) {
        urlQuery = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvincia/${query.province}`;
    } else if (query.region) {
        urlQuery = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroCCAA/${query.region}`;
    } else {

        console.error('Query Error');
        return;
    }
    return axios.get(PROXY_URL + urlQuery);
};


