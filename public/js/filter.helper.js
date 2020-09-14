/* 
                THIS NEEDS REFACTORING

*/

const regionSelect = document.getElementById('region-selector');
const provinceSelect = document.getElementById('province-selector');
const municipioSelect = document.getElementById('municipio-selector');
const fuelSelect = document.getElementById('fuel-selector');
const query = {
    region: '',
    province: '',
    municipio: '',
    fuel: ''
};

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
    axios.get(`${PROXY_URL}https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/${province}`)
        .then(response => {
            const municipios = response.data;
            municipios.forEach(m => {
                const municipioOption = `<option value="${m.IDMunicipio}">${m.Municipio}</option>`;
                municipioSelect.innerHTML += municipioOption;
            });
        })
        .catch(e => console.error(e));
};

//NAME THIS FUNCTION
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

//REFACTOR THIS
regionSelect.addEventListener('input', function() {
    const optionIndex = this.selectedIndex;
    const selectedRegion = this.options[optionIndex].value;
    query.region = selectedRegion;
    filterProvinces(selectedRegion);
});

provinceSelect.addEventListener('input', function()  {
    const optionIndex = this.selectedIndex;
    const selectedProvince = this.options[optionIndex].value;
    query.province = selectedProvince;
    getMunicipios(selectedProvince);
});

municipioSelect.addEventListener('input', function() {
    const optionIndex = this.selectedIndex;
    const selectedMunicipio = this.options[optionIndex].value;
    query.municipio = selectedMunicipio;
});

fuelSelect.addEventListener('input', function() {
    const optionIndex = this.selectedIndex;
    const selectedFuel = this.options[optionIndex].value;
    query.fuel = selectedFuel;
});