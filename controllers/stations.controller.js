const axiosConfig = require('../configs/axios.config');
const Review = require('../models/review.model');
const Rating = require('../models/rating.model');
const Favorite = require('../models/favorite.model');

function capitalize(string) {
    const result = string.split(' ').filter(v => v).map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    return result;
}

function renderReviews(IDEESS) {
    return Review.find({
            'station.IDEESS': IDEESS,
        })
        .populate('user');
}

function renderRating(IDEESS, user) {
    if (!user) {
        return;
    }
    return Rating.findOne({
        'station.IDEESS': IDEESS,
        user: user.id
    });
}


function renderFavorite(IDEESS, user) {
    if (!user) {
        return;
    }
    return Favorite.findOne({
        'station.IDEESS': IDEESS,
        user: user.id
    });
}

module.exports.renderStation = (req, res, next) => {
    const {
        stationId,
        stationDistrict
    } = req.params;

    Promise.all([
            axiosConfig.getStation(stationDistrict),
            renderReviews(stationId),
            renderRating(stationId, req.currentUser),
            renderFavorite(stationId, req.currentUser),
        ])
        .then(data => {
            const [getStationResponse, reviews, rating, favorite] = data;
            const districtStations = (getStationResponse.data.ListaEESSPrecio);
            const station = districtStations.filter(st => st.IDEESS === stationId)[0];
            const isFavorite = (favorite) ? true : false;

            const stationDetails = {
                stationId,
                stationDistrict,
                reviews,
                rating,
                isFavorite,
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
            };
            


            //should make a function 'parseProperties' that does all of the above and substitutes undefined properties for 'not available'
            res.render('stations/details', {
                stationDetails
            });
        })
        .catch(next);
};