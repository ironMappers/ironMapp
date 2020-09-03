const overpass = require('query-overpass');


const query = '[out:json][timeout:25];area(3605326784)->.searchArea;(node["amenity"="fuel"](area.searchArea);way["amenity"="fuel"](area.searchArea);relation["amenity"="fuel"](area.searchArea););out body;>;out skel qt;';


   

const queryResult = overpass(query, (error, data) => {
    if (error) {
        console.log('error');
    }
    console.log(data.features);
});

queryResult;