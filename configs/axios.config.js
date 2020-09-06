const axios = require('axios');

const apiData = () => {
    return axios.get('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipio/4354')
}

module.exports.apiData = apiData

