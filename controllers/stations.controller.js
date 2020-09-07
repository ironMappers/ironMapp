
const axiosConfig = require('../configs/axios.config');

module.exports.renderStation = (req, res, next) => {
    const id = req.params.id
    Promise.all([axiosConfig.apiData()])
        .then(response => {
            const stationsArr = response[0].data.ListaEESSPrecio
            res.send(stationsArr.filter(el => el.IDEESS === id))
        })
        .catch(e => console.error(e))

};
