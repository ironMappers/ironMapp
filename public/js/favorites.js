const favoriteBtn = document.getElementById('btn-favorite');

const renderFavorite = () => {
    if (favoriteBtn.value === 'true') {
        favoriteBtn.innerHTML = '<i class="fa fa-heart"></i>';
    } else {
        favoriteBtn.innerHTML = '<i class="fa fa-heart-o"></i>';
    }
};

const invertBoolean = (value) => {
    if (value === 'true') {
        return 'false';
    } 
    return 'true';
};

favoriteBtn.addEventListener('click', event => {
   favoriteBtn.value = invertBoolean(favoriteBtn.value);
   renderFavorite();
    axios.put(`${APP_URL}/favorite`, {
        station: {
            district ,
            IDEESS: id
        }      
    })   
        .then(favorite => console.log(favorite))
        .catch(e => console.error(e));
});

renderFavorite();