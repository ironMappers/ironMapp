const regionSelect = document.getElementById('region-selector');
const provinceSelect = document.getElementById('province-selector');
const municipioSelect = document.getElementById('municipio-selector');
const fuelSelect = document.getElementById('fuel-selector');

const filterProvinces = (region) => {
    provinceSelect.classList.remove('hidden');
    municipioSelect.classList.add('hidden');
    provinceSelect.innerHTML = '<option value="">Provincia</option>';
    municipioSelect.innerHTML = '';
    const provinces = PR_CODES.filter(PR => PR.IDCCAA === region);

    provinces.forEach(pr => {
        const provinceOption = `<option value="${pr.IDPR}">${pr.PR}</option>`;
        provinceSelect.innerHTML += provinceOption;
    });
};

const getMunicipios = (province) => {
    //There's probably a more elegant way to do this
    window.setTimeout(() => {
        municipioSelect.classList.remove('hidden');
    }, 1000);
    municipioSelect.innerHTML = '<option value="">Municipio</option>';
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