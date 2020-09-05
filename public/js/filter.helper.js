const regionSelect = document.getElementById('region-selector');
const provinceSelect = document.getElementById('province-selector');

const filterProvinces = (region) => {
    if (region === '01') {
    }
};

regionSelect.addEventListener('input', () => {
    const optionIndex = regionSelect.selectedIndex;
    const selectedRegion = regionSelect.options[optionIndex].value;
    filterProvinces(selectedRegion);
});