const overpass = require('query-overpass');

const areaCode = 3605326784;
const query = `[out:json][timeout:25];area(${areaCode})->.searchArea;(node["amenity"="fuel"](area.searchArea);way["amenity"="fuel"](area.searchArea);relation["amenity"="fuel"](area.searchArea););out body;>;out skel qt;`;

module.exports.doQuery = overpass(query, (err, data) => {
    (req, res, next) => {
        if (err) {
            console.error(err);
            next(err);
        }
        res.send(data);
    };
});