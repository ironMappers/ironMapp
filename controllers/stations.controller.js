
const axiosConfig = require('../configs/axios.config');

module.exports.renderStation = (req, res, next) => {
    const index = req.params.index
    Promise.all([axiosConfig.apiData()])
        .then(response => {
            req.params.token
            res.send(response[0].data.ListaEESSPrecio[index])
        })
        .catch(e => console.error(e))

};
