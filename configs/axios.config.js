const axios = require('axios');

module.exports.getStation = (district) => {
    return axios.get(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipio/${district}`);
};
