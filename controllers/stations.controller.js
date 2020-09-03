const overpass = require('query-overpass');

const areaCode = 3605326784;
const query = `[out:json][timeout:25];area(${areaCode})->.searchArea;(node["amenity"="fuel"](area.searchArea);way["amenity"="fuel"](area.searchArea);relation["amenity"="fuel"](area.searchArea););out body;>;out skel qt;`;

module.exports.doQuery = (req, res, next) => {
    const queryResult = overpass(query, (error, data) => {
        if (error) {
            next(error);
        }
        //res.send(data.features);
        res.render('stations/list-stations', {stations: data.features} );
    });
};