const axiosConfig = require('../configs/axios.config');
const Review = require('../models/review.model');
const Rating = require('../models/rating.model');
const Favorite = require('../models/favorite.model');

function capitalize(string) {
    const result = string.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    return result;
}

function renderReviews(IDEESS, district) {
    return Review.find({
            station: {
                IDEESS,
                district
            }
        })
        .populate('user');
}

function renderRatings(IDEESS, district, userId) {
    return Rating.findOne({
        station: {
            IDEESS,
            district
        },
        user: userId
    });
}

module.exports.renderStation = (req, res, next) => {
    const {
        stationId,
        stationDistrict
    } = req.params;

    // console.log(stationId)

    axiosConfig.getStation(stationDistrict)
        //This would be cleaner if the functions returned objects instead of promises
        .then(response => {
            const districtStations = (response.data.ListaEESSPrecio);
            const station = districtStations.filter(st => st.IDEESS === stationId)[0];

            renderReviews(stationId, stationDistrict).then(reviews => {
                    renderRatings(stationId, stationDistrict, req.currentUser.id)
                        .then(rating => {
                            // console.log(reviews)
                            const stationDetails = {
                                stationId,
                                stationDistrict,
                                reviews,
                                rating,
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
                                stationDetails,
                                
                            });
                            // console.log(stationDetails)
                        })
                        .catch(next);
                })
                .catch(next);
        })
        .catch(next);
};

module.exports.addFavorite = (req, res, next) => {

    const userId = req.currentUser._id;
    const stationId = req.params.stationId;
    const district = req.params.district

    const params = { user: req.currentUser._id, station: req.params.stationId, district:req.params.district};
    console.log(params)

    const newFavorite = new Favorite({
        user:userId,
        station: {
            IDEESS: stationId,
            district: district
        }
    })

    Favorite.findOne({user: userId, station: {IDEESS: stationId, district}})
        .then(favorite => {
            if (favorite) {
                favorite.remove()
            } else {
                newFavorite.save()
            }
        })
        .catch(next)
}