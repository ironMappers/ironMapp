const postForm = document.getElementById('create-form');
const postBtn = document.getElementById('create-btn');
const reviewsWrapper = document.getElementById('reviews-wrapper');
const reviews = document.querySelectorAll('.review');
const reviewBtns = document.querySelectorAll('.review-btns');

postForm.addEventListener('submit', event => {
    //TODO: populate user data
    const reviewBody = document.getElementById('post-review-input').value;
    event.preventDefault();

    axios.post(`${APP_URL}/review/create/${id}/${district}`, {
            reviewBody
        })
        .then(review => {

            //this can go in a function
            const newReview = `<article class="card mb-4 bx-2">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <p><b>${review.data.user} says:</b> ${review.data.body}</p>
                                            <a href="/users/details/"${review.data.user}><img src="${review.user}" alt="user avatar" class="review-avatar-img"></a>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <small class="text-dark">${review.data.createdAt}</small>

                                            <ul>
                                                <a href="/review/edit/${review.data.id}" class="text-muted">Edit</a>
                                                <a href="/review/delete/${review.data.id}" class="text-danger">Delete</a>
                                            </ul>
                                        </div>
                                </article>`;

            reviewsWrapper.innerHTML += newReview;
        })
        .catch(e => console.error(e));
});

reviews.forEach(review => {
    const deleteBtn = review.querySelector('.delete-btn');
    const editBtn = review.querySelector('.edit-btn');
    let reviewBody = review.querySelector('.review-body').innerText;
    const reviewUser = review.querySelector('.review-user').innerText;

    deleteBtn.addEventListener('click', event => {
        axios.delete(`${APP_URL}/review/${deleteBtn.value}`)
            .then(() => review.remove())
            .catch(e => console.error(e));
    });

    editBtn.addEventListener('click', event => {
        const reviewBuffer = review.innerHTML;
        toggleCrudElements('hide');
        review.innerHTML = `<div class="d-flex align-items-baseline">
                                <p>
                                    <b>${reviewUser}</b>
                                </p>
                                <form class="form d-flex my-2" method="POST" id="edit-form">
                                    <input type="text" name="review" id="edit-input" value="${reviewBody}" class="form-control">
                                    <button type="submit" class="btn-station text-primary" id="submit-edit">Change</button>
                                    <button class="btn-station text-danger" id="cancel-edit">Cancel</button>
                                </form>
                            </div>`;

        const editForm = document.getElementById('edit-form');
        const cancelBtn = document.getElementById('cancel-edit');

        cancelBtn.addEventListener('click', event => {
            event.preventDefault();
            toggleCrudElements('display');
            review.innerHTML = reviewBuffer;
        });

        editForm.addEventListener('submit', event => {
            event.preventDefault();
            const reviewBodyEdit = document.getElementById('edit-input').value;

            axios.patch(`${APP_URL}/review/${editBtn.value}`, {
                    reviewBodyEdit
                })
                .then(() => {
                    toggleCrudElements('display');
                    review.innerHTML = reviewBuffer;
                    review.querySelector('.review-body').innerText = reviewBodyEdit;
                })
                .catch(e => console.error(e));
        });
    });
});

const toggleCrudElements = (action) => {
    if (action === 'hide') {
        postForm.classList.add('hidden');
        reviewBtns.forEach(btn => btn.classList.add('hidden'));
    } else {
        postForm.classList.remove('hidden');
        reviewBtns.forEach(btn => btn.classList.remove('hidden'));
    }
};