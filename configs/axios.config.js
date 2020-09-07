const axios = require('axios');

const apiData = () => {
    return axios.get('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres');
};

module.exports.apiData = apiData;

