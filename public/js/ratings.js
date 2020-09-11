const ratingBtns = document.querySelectorAll('.btn-rating');

const renderRating = (score) => {
    const ratingIcon = '<i class="fa fa-star-o"></i>';
    const ratingIconActive = '<i class="fa fa-star"></i>';

    for (let i = 0; i < score; i++) {
        ratingBtns[i].innerHTML = ratingIconActive;
    }
    for (let i = score; i < 5; i++) {
        ratingBtns[i].innerHTML = ratingIcon;
    }
};
renderRating(1);

ratingBtns.forEach(btn => btn.addEventListener('click', event => {
    const score = btn.value;
    renderRating(rating);
    axios.put(`${APP_ULR}/rating`, {
       score,
       station: {
           IDEESS: id,
           district: district
       }
    });
}));
