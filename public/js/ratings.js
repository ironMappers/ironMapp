const ratingBtns = document.querySelectorAll('.btn-rating');

const renderRating = (score) => {
    if (!score) {
        score = 1;
    }
    const ratingIcon = '<i class="fa fa-star-o"></i>';
    const ratingIconActive = '<i class="fa fa-star"></i>';

    for (let i = 0; i < score; i++) {
        ratingBtns[i].innerHTML = ratingIconActive;
    }
    for (let i = score; i < 5; i++) {
        ratingBtns[i].innerHTML = ratingIcon;
    }
};
renderRating(userScore);

const loadRatings = ratingBtns.forEach(btn => btn.addEventListener('click', event => {
    const score = btn.value;
    renderRating(score);
    axios.put(`${APP_URL}/rating`, {
       score,
       station: {
           IDEESS: id,
           district: district
       }
    })
        .then(rating => console.log(rating))
        .catch(e => console.error(e));
}));
