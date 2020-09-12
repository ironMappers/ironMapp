function toggleHeart(element) {
    const arr = [...element.classList]
    if (arr.includes('fa-heart-o')) {
        element.classList.remove("fa-heart-o");
        element.classList.add("fa-heart");
    } else {
        element.classList.remove("fa-heart");
        element.classList.add("fa-heart-o");
    }
}

document.getElementById('btn-favorite').addEventListener('click', event => {
    event.preventDefault(); // <= !!! Prevent the refresh
    const button = event.currentTarget;
    const stationId = button.getAttribute('stationId');
    const district = button.getAttribute('district');
    const icon = document.querySelectorAll("i")
    const iconArr = [...icon];
    const heart = iconArr[0];

    toggleHeart(heart)

    axios.post(`/station/${stationId}/${district}/fav`, {})
        .then((response) => {
            console.log(response)
        })
        .catch(error => console.log(error))

});
