const featuresWrapper = document.getElementById('features-wrapper');
renderFavorite();
renderRating(userScore);

const renderWarning = (element) => {
    const message = `You need to <a href="${APP_URL}/login" class="alert-link">log in</a> to use these features!`;
    const warning = `<div class="alert alert-danger" id="warning-message" role="alert">${message}</div>`;
    element.innerHTML = warning;
};

if (isUserLogged) {
    addClickToFavorite();
    addClickToRatings();
} else {
    featuresWrapper.addEventListener('click', () => renderWarning(featuresWrapper));
    postForm.addEventListener('click', () => renderWarning(postForm));
}