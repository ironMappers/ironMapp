const REG_CODES = [{
    "IDCCAA": "01",
    "CCAA": "Andalucia"
}, {
    "IDCCAA": "02",
    "CCAA": "Aragón"
}, {
    "IDCCAA": "03",
    "CCAA": "Asturias"
}, {
    "IDCCAA": "04",
    "CCAA": "Baleares"
}, {
    "IDCCAA": "05",
    "CCAA": "Canarias"
}, {
    "IDCCAA": "06",
    "CCAA": "Cantabria"
}, {
    "IDCCAA": "07",
    "CCAA": "Castilla la Mancha"
}, {
    "IDCCAA": "08",
    "CCAA": "Castilla y León"
}, {
    "IDCCAA": "09",
    "CCAA": "Cataluña"
}, {
    "IDCCAA": "10",
    "CCAA": "Comunidad Valenciana"
}, {
    "IDCCAA": "11",
    "CCAA": "Extremadura"
}, {
    "IDCCAA": "12",
    "CCAA": "Galicia"
}, {
    "IDCCAA": "13",
    "CCAA": "Madrid"
}, {
    "IDCCAA": "14",
    "CCAA": "Murcia"
}, {
    "IDCCAA": "15",
    "CCAA": "Navarra"
}, {
    "IDCCAA": "16",
    "CCAA": "País Vasco"
}, {
    "IDCCAA": "17",
    "CCAA": "Rioja (La)"
}, {
    "IDCCAA": "18",
    "CCAA": "Ceuta"
}, {
    "IDCCAA": "19",
    "CCAA": "Melilla"
}];

const PR_CODES = [
    {
        "IDPR": "02",
        "IDCCAA": "07",
        "PR": "Albacete",
        "CCAA": "Castilla la Mancha"
    },
    {
        "IDPR": "03",
        "IDCCAA": "10",
        "PR": "Alicante",
        "CCAA": "Comunidad Valenciana"
    },
    {
        "IDPR": "04",
        "IDCCAA": "01",
        "PR": "Almería",
        "CCAA": "Andalucia"
    },
    {
        "IDPR": "01",
        "IDCCAA": "16",
        "PR": "Araba/Álava",
        "CCAA": "País Vasco"
    },
    {
        "IDPR": "33",
        "IDCCAA": "03",
        "PR": "Asturias",
        "CCAA": "Asturias"
    },
    {
        "IDPR": "05",
        "IDCCAA": "08",
        "PR": "Ávila",
        "CCAA": "Castilla y León"
    },
    {
        "IDPR": "06",
        "IDCCAA": "11",
        "PR": "Badajoz",
        "CCAA": "Extremadura"
    },
    {
        "IDPR": "07",
        "IDCCAA": "04",
        "PR": "Balears (Illes)",
        "CCAA": "Baleares"
    },
    {
        "IDPR": "08",
        "IDCCAA": "09",
        "PR": "Barcelona",
        "CCAA": "Cataluña"
    },
    {
        "IDPR": "48",
        "IDCCAA": "16",
        "PR": "Bizkaia",
        "CCAA": "País Vasco"
    },
    {
        "IDPR": "09",
        "IDCCAA": "08",
        "PR": "Burgos",
        "CCAA": "Castilla y León"
    },
    {
        "IDPR": "10",
        "IDCCAA": "11",
        "PR": "Cáceres",
        "CCAA": "Extremadura"
    },
    {
        "IDPR": "11",
        "IDCCAA": "01",
        "PR": "Cádiz",
        "CCAA": "Andalucia"
    },
    {
        "IDPR": "39",
        "IDCCAA": "06",
        "PR": "Cantabria",
        "CCAA": "Cantabria"
    },
    {
        "IDPR": "12",
        "IDCCAA": "10",
        "PR": "Castellón / Castelló",
        "CCAA": "Comunidad Valenciana"
    },
    {
        "IDPR": "51",
        "IDCCAA": "18",
        "PR": "Ceuta",
        "CCAA": "Ceuta"
    },
    {
        "IDPR": "13",
        "IDCCAA": "07",
        "PR": "Ciudad Real",
        "CCAA": "Castilla la Mancha"
    },
    {
        "IDPR": "14",
        "IDCCAA": "01",
        "PR": "Córdoba",
        "CCAA": "Andalucia"
    },
    {
        "IDPR": "15",
        "IDCCAA": "12",
        "PR": "Coruña (A)",
        "CCAA": "Galicia"
    },
    {
        "IDPR": "16",
        "IDCCAA": "07",
        "PR": "Cuenca",
        "CCAA": "Castilla la Mancha"
    },
    {
        "IDPR": "20",
        "IDCCAA": "16",
        "PR": "Gipuzkoa",
        "CCAA": "País Vasco"
    },
    {
        "IDPR": "17",
        "IDCCAA": "09",
        "PR": "Girona",
        "CCAA": "Cataluña"
    },
    {
        "IDPR": "18",
        "IDCCAA": "01",
        "PR": "Granada",
        "CCAA": "Andalucia"
    },
    {
        "IDPR": "19",
        "IDCCAA": "07",
        "PR": "Guadalajara",
        "CCAA": "Castilla la Mancha"
    },
    {
        "IDPR": "21",
        "IDCCAA": "01",
        "PR": "Huelva",
        "CCAA": "Andalucia"
    },
    {
        "IDPR": "22",
        "IDCCAA": "02",
        "PR": "Huesca",
        "CCAA": "Aragón"
    },
    {
        "IDPR": "23",
        "IDCCAA": "01",
        "PR": "Jaén",
        "CCAA": "Andalucia"
    },
    {
        "IDPR": "24",
        "IDCCAA": "08",
        "PR": "León",
        "CCAA": "Castilla y León"
    },
    {
        "IDPR": "25",
        "IDCCAA": "09",
        "PR": "Lleida",
        "CCAA": "Cataluña"
    },
    {
        "IDPR": "27",
        "IDCCAA": "12",
        "PR": "Lugo",
        "CCAA": "Galicia"
    },
    {
        "IDPR": "28",
        "IDCCAA": "13",
        "PR": "Madrid",
        "CCAA": "Madrid"
    },
    {
        "IDPR": "29",
        "IDCCAA": "01",
        "PR": "Málaga",
        "CCAA": "Andalucia"
    },
    {
        "IDPR": "52",
        "IDCCAA": "19",
        "PR": "Melilla",
        "CCAA": "Melilla"
    },
    {
        "IDPR": "30",
        "IDCCAA": "14",
        "PR": "Murcia",
        "CCAA": "Murcia"
    },
    {
        "IDPR": "31",
        "IDCCAA": "15",
        "PR": "Navarra",
        "CCAA": "Navarra"
    },
    {
        "IDPR": "32",
        "IDCCAA": "12",
        "PR": "Ourense",
        "CCAA": "Galicia"
    },
    {
        "IDPR": "34",
        "IDCCAA": "08",
        "PR": "Palencia",
        "CCAA": "Castilla y León"
    },
    {
        "IDPR": "35",
        "IDCCAA": "05",
        "PR": "Palmas (Las)",
        "CCAA": "Canarias"
    },
    {
        "IDPR": "36",
        "IDCCAA": "12",
        "PR": "Pontevedra",
        "CCAA": "Galicia"
    },
    {
        "IDPR": "26",
        "IDCCAA": "17",
        "PR": "Rioja (La)",
        "CCAA": "Rioja (La)"
    },
    {
        "IDPR": "37",
        "IDCCAA": "08",
        "PR": "Salamanca",
        "CCAA": "Castilla y León"
    },
    {
        "IDPR": "38",
        "IDCCAA": "05",
        "PR": "Santa Cruz De Tenerife",
        "CCAA": "Canarias"
    },
    {
        "IDPR": "40",
        "IDCCAA": "08",
        "PR": "Segovia",
        "CCAA": "Castilla y León"
    },
    {
        "IDPR": "41",
        "IDCCAA": "01",
        "PR": "Sevilla",
        "CCAA": "Andalucia"
    },
    {
        "IDPR": "42",
        "IDCCAA": "08",
        "PR": "Soria",
        "CCAA": "Castilla y León"
    },
    {
        "IDPR": "43",
        "IDCCAA": "09",
        "PR": "Tarragona",
        "CCAA": "Cataluña"
    },
    {
        "IDPR": "44",
        "IDCCAA": "02",
        "PR": "Teruel",
        "CCAA": "Aragón"
    },
    {
        "IDPR": "45",
        "IDCCAA": "07",
        "PR": "Toledo",
        "CCAA": "Castilla la Mancha"
    },
    {
        "IDPR": "46",
        "IDCCAA": "10",
        "PR": "Valencia / València",
        "CCAA": "Comunidad Valenciana"
    },
    {
        "IDPR": "47",
        "IDCCAA": "08",
        "PR": "Valladolid",
        "CCAA": "Castilla y León"
    },
    {
        "IDPR": "49",
        "IDCCAA": "08",
        "PR": "Zamora",
        "CCAA": "Castilla y León"
    },
    {
        "IDPR": "50",
        "IDCCAA": "02",
        "PR": "Zaragoza",
        "CCAA": "Aragón"
    }
];

const FUEL_CODES = [
    {
        "IDProducto": "1",
        "NombreProducto": "Gasolina 95 E5",
        "NombreProductoAbreviatura": "G95E5"
    },
    {
        "IDProducto": "23",
        "NombreProducto": "Gasolina 95 E10",
        "NombreProductoAbreviatura": "G95E10"
    },
    {
        "IDProducto": "20",
        "NombreProducto": "Gasolina 95 E5 Premium",
        "NombreProductoAbreviatura": "G95E5+"
    },
    {
        "IDProducto": "3",
        "NombreProducto": "Gasolina 98 E5",
        "NombreProductoAbreviatura": "G98E5"
    },
    {
        "IDProducto": "21",
        "NombreProducto": "Gasolina 98 E10",
        "NombreProductoAbreviatura": "G98E10"
    },
    {
        "IDProducto": "4",
        "NombreProducto": "Gasóleo A habitual",
        "NombreProductoAbreviatura": "GOA"
    },
    {
        "IDProducto": "5",
        "NombreProducto": "Gasóleo Premium",
        "NombreProductoAbreviatura": "GOA+"
    },
    {
        "IDProducto": "6",
        "NombreProducto": "Gasóleo B",
        "NombreProductoAbreviatura": "GOB"
    },
    {
        "IDProducto": "7",
        "NombreProducto": "Gasóleo C",
        "NombreProductoAbreviatura": "GOC"
    },
    {
        "IDProducto": "16",
        "NombreProducto": "Bioetanol",
        "NombreProductoAbreviatura": "BIE"
    },
    {
        "IDProducto": "8",
        "NombreProducto": "Biodiésel",
        "NombreProductoAbreviatura": "BIO"
    },
    {
        "IDProducto": "17",
        "NombreProducto": "Gases licuados del petróleo",
        "NombreProductoAbreviatura": "GLP"
    },
    {
        "IDProducto": "18",
        "NombreProducto": "Gas natural comprimido",
        "NombreProductoAbreviatura": "GNC"
    },
    {
        "IDProducto": "19",
        "NombreProducto": "Gas natural licuado",
        "NombreProductoAbreviatura": "GNL"
    },
    {
        "IDProducto": "22",
        "NombreProducto": "Hidrógeno",
        "NombreProductoAbreviatura": "H2"
    },
    {
        "IDProducto": "9",
        "NombreProducto": "Fuelóleo bajo índice azufre",
        "NombreProductoAbreviatura": "FOB"
    },
    {
        "IDProducto": "10",
        "NombreProducto": "Fuelóleo especial",
        "NombreProductoAbreviatura": "FOE"
    },
    {
        "IDProducto": "11",
        "NombreProducto": "Gasóleo para uso marítimo",
        "NombreProductoAbreviatura": "MGO"
    },
    {
        "IDProducto": "12",
        "NombreProducto": "Gasolina de aviación",
        "NombreProductoAbreviatura": "GNAV"
    },
    {
        "IDProducto": "13",
        "NombreProducto": "Queroseno de aviación JET_A1",
        "NombreProductoAbreviatura": "JETA1"
    },
    {
        "IDProducto": "14",
        "NombreProducto": "Queroseno de aviación JET_A2",
        "NombreProductoAbreviatura": "JETA2"
    }
];