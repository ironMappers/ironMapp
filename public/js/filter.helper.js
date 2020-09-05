const regionSelect = document.getElementById('region-selector');
const provinceSelect = document.getElementById('province-selector');
const municipioSelect = document.getElementById('municipio-selector');
const fuelSelect = document.getElementById('fuel-selector');

const filterProvinces = (region) => {
    provinceSelect.innerHTML = '';
    const provinces = PR_CODES.filter(PR => PR.IDCCAA === region);

    provinces.forEach(pr => {
        const provinceOption = `<option value="${pr.IDPR}">${pr.PR}</option>`;
        provinceSelect.innerHTML += provinceOption;
    });
};

const getMunicipios = (province) => {
    municipioSelect.innerHTML = '';
    axios.get(`https://thingproxy.freeboard.io/fetch/https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/${province}`)
        .then(response => {
            const municipios = response.data;
            municipios.forEach(m => {
                const municipioOption = `<option value="${m.IDMunicipio}">${m.Municipio}</option>`;
                municipioSelect.innerHTML += municipioOption;
            });
        })
        .catch(e => console.error(e));
};

window.addEventListener('load', () => {
    REG_CODES.forEach(CCAA => {
        const regionOption = `<option value="${CCAA.IDCCAA}">${CCAA.CCAA}</option>`;
        regionSelect.innerHTML += regionOption;
    });

    FUEL_CODES.forEach(fc => {
        const fuelOption = `<option value="${fc.IDProducto}">${fc.NombreProducto}</option>`;
        fuelSelect.innerHTML += fuelOption;
    });
});

regionSelect.addEventListener('input', () => {
    const optionIndex = regionSelect.selectedIndex;
    const selectedRegion = regionSelect.options[optionIndex].value;
    filterProvinces(selectedRegion);
});

provinceSelect.addEventListener('input', () => {
    const optionIndex = provinceSelect.selectedIndex;
    const selectedProvince = provinceSelect.options[optionIndex].value;
    getMunicipios(selectedProvince);
});