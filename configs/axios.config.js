const axios = require('axios');

const apiData = () => {
    return axios.get('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvincia/05')
};

module.exports.apiData = apiData;

