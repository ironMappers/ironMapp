const axiosConfig = require('../configs/axios.config');

function capitalize(string) {
    const result = string.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    return result;
}

module.exports.renderStation = (req, res, next) => {
    const id = req.params.id;

    Promise.all([axiosConfig.apiData()])
        .then(response => {
            const stationsArr = response[0].data.ListaEESSPrecio;
            const station = stationsArr.filter(st => st.IDEESS === id)[0];

            const stationDetails = {
                info: {
                    name: station['Rótulo'],
                    address: {
                        street: capitalize(station['Dirección']),
                        district: station.Municipio,
                        province: capitalize(station.Provincia)
                    },
                    open: station.Horario
                },
                prices: {
                    bio: {
                        biodiesel: station['Precio Biodiesel'],
                        bioetanol: station['Precio Bioetanol'],
                    },
                    gas: {
                        compressed: station['Precio Gas Natural Comprimido'],
                        liquefied: station['Precio Gas Natural Licuado']
                    },
                    gasoil: {
                        a: station['Precio Gasoleo A'],
                        b: station['Precio Gasoleo B'],
                        premium: station['Precio Gasoleo Premium']
                    },
                    petrol: {
                        octanes95E10: station['Precio Gasolina 95 E10'],
                        octanes95E5: station['Precio Gasolina 95 E5'],
                        octanes95E5Premium: station['Precio Gasolina 95 E5 Premium'],
                        octanes98E10: station['Precio Gasolina 98 E10'],
                        octanes98E5: station['Precio Gasolina 98 E5'],
                    },
                    hidrogen: station['Precio Hidrogeno']
                },
                reviews: [{
                    user: {
                        username: 'Pedro33',
                        avatar: 'https://i.ytimg.com/vi/ln7lCbexP5s/hqdefault.jpg'
                    },
                    body: 'ta bn'
                }]
            };
            //should make a function 'parseProperties' that does all of the above and substitutes undefined properties for 'not available'
            console.log(capitalize('eskEErEE'))
            res.render('stations/details', {
                stationDetails
            });
        })
        .catch(e => console.error(e));
};
