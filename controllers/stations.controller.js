const axiosConfig = require('../configs/axios.config');

module.exports.renderStation = (req, res, next) => {
    const id = req.params.id;

    Promise.all([axiosConfig.apiData()])
        .then(response => {
            const stationsArr = response[0].data.ListaEESSPrecio;
            const station = stationsArr.filter(st => st.IDEESS === id)[0];
            console.log(station);
            //const {name, price} = {station['Rótulo'], }
            res.render('stations/details', {station});
        })
        .catch(e => console.error(e));
};
