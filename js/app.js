// DECLARING VARIBABLE
const createPost = document.querySelector(`.createPost`);
const getPost = document.querySelector(`.getPost`);
const closeModal = document.querySelector(`.close`);
const submitBtn = document.querySelector(`.submit-btn`);
let inputTitle = document.getElementById(`title`);
let inputBody = document.getElementById(`body`);
const imageURL = document.querySelector(`#image-url`);
const overlay = document.querySelector(`.overlay`);
const div = document.querySelector(`.latest-post`);
const latestPost = document.querySelector(`.latestPost`);
const bgImages = document.querySelector(`.read-img`);
const form = document.querySelector(`.form`);
const preloader = document.querySelector(`.preloader`);
let defaultItem = 0;

// CUSTOM ARRAYS
let myArray = [];
const pictureArray = [
  { id: 1, img: `./images/reads-1.jpg` },
  { id: 2, img: `./images/reads-2.png` },
  { id: 3, img: `./images/reads-3.png` },
  { id: 4, img: `./images/reads-4.png` },
  { id: 5, img: `./images/reads-5.jpg` },
  { id: 6, img: `./images/reads-6.jpg` },
];
const writersArray = [
  { name: `Austin Tonayam` },
  { name: `Izima Obisike` },
  { name: `Oriyomi Aladesuru` },
  { name: `Amos Thibault` },
  { name: `Akorode Giyasat` },
  { name: `Igah Abiye` },
];
const dateArray = [
  { date: `15th June, 2022` },
  { date: `1st June, 2022` },
  { date: `25th May, 2022` },
  { date: `10th May, 2022` },
  { date: `30th April, 2022` },
  { date: `15th April, 2022` },
];

// PRELOADER
window.addEventListener(`load`, () => {
  preloader.classList.add(`hide-preloader`);
});
// OPEN MODAL
createPost.addEventListener(`click`, () => {
  overlay.classList.add(`show-modal`);
});
// CLOSE MODAL
closeModal.addEventListener(`click`, () => {
  overlay.classList.remove(`show-modal`);
  form.reset();
});

// CREATE (POST) NEW BLOG POST
form.addEventListener(`submit`, (e) => {
  latestPost.style.display = `block`;
  e.preventDefault();
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: inputTitle.value,
      body: inputBody.value,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      myArray.push(data);
      div.innerHTML += `
        <div class="row my-4 post" data-aos="zoom-out" data-id="${myArray[defaultItem].id}">
            <div class="read-img col-9 col-md-3 d-flex align-items-end">
                <img src="${imageURL.value}" alt="" class="post-image" />
            </div>
            <div class="read col-12 col-md-9 pe-md-5 mt-4 mt-md-0 d-flex flex-column justify-content-center">
                <h3 class="fw-semibold title">${inputTitle.value}</h3>
                <p>
                  by <span class="text-info pt-4">${writersArray[defaultItem].name} </span> ${dateArray[defaultItem].date}
                </p>
                <div class="options d-flex align-items-center justify-content-between">
                  <div class="edit-read d-flex align-items-center justify-content-between ">
                    <i class="edit bi bi-pencil-square mx-3 fs-3 text-info" id="edit-post"></i>
                    <a href="./post.html" target="_blank" class="me-3">
                      <button class="btn btn-info">Read More</button>
                    </a>
                  </div>
                  <i class="del bi bi-trash3-fill fs-2 text-danger ms-5" id="delete-post"></i>
                </div>
            </div>
        </div>
        `;

      overlay.classList.remove(`show-modal`);
      form.reset();
      defaultItem++;
    });
});

// GET POST FROM JSONPLACEHOLDER
latestPost.style.display = `none`;
getPost.addEventListener(`click`, () => {
  latestPost.style.display = `block`;
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => {
      myArray = json;
      for (i = 0; i < 7; i++) {
        div.innerHTML += `
                <div class="row my-3 post" data-aos="zoom-out" data-id ="${myArray[i].id}">
            <div class="read-img col-9 col-md-3 d-flex align-items-end">
                <img src="${pictureArray[i].img}" alt="" class="img-fluid post-image" />
            </div>
            <div class="read col-12 col-md-9 pe-md-5 mt-4 mt-md-0 d-flex flex-column justify-content-center">
                <h3 class="fw-semibold" data-id=${myArray[i].id} >${myArray[i].title}</h3>
                <p>
                    by <span class="text-info pt-4">${writersArray[i].name}</span> ${dateArray[i].date}
                </p>
                <div class="options d-flex align-items-center justify-content-between pb-3 pb-md-0">
                  <div class="edit-read d-flex align-items-center justify-content-between">
                    <i class="edit bi bi-pencil-square mx-3 fs-3 text-info" id="edit-post"></i>
                    <a href="./post.html" target="_blank" class="me-3">
                      <button class="btn btn-info text-light">Read More</button>
                    </a>
                  </div>
                  <i class="bi bi-trash3-fill fs-2 text-danger ms-5" id="delete-post"></i>
                </div>
            </div>
        </div>
        `;
      }
    });
});

// DELETE AND EDIT
div.addEventListener(`click`, (e) => {
  let deleteButtonIsPressed = e.target.id == `delete-post`;
  let editButtonIsPressed = e.target.id == `edit-post`;
  let id = e.target.parentElement.parentElement.parentElement.dataset.id;

  if (deleteButtonIsPressed) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        myArray = data;
        let target =
          e.target.parentElement.parentElement.parentElement.remove();
      });
  }

  if (editButtonIsPressed) {
    overlay.classList.add(`show-modal`);
    let titleContent =
      e.target.parentElement.parentElement.parentElement.firstChild
        .nextElementSibling;
    inputTitle.value = titleContent.textContent;

    let imageLink =
      e.target.parentElement.parentElement.parentElement.parentElement
        .firstChild.nextElementSibling.firstChild.nextElementSibling;
    imageURL.value = imageLink.src;

    let editId =
      e.target.parentElement.parentElement.parentElement.parentElement.dataset
        .id;

    submitBtn.addEventListener(`click`, (e) => {
      e.preventDefault();
      fetch(`https://jsonplaceholder.typicode.com/posts/${editId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: inputTitle.value,
          body: inputBody.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          titleContent.innerHTML = inputTitle.value;
          imageLink.src = imageURL.value;
          overlay.classList.remove(`show-modal`);
        });
    });
  }
});
