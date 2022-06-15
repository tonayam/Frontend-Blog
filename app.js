// DECLARING VARIBABLE
const createPost = document.querySelector(`.createPost`);
const getPost = document.querySelector(`.getPost`);
const closeModal = document.querySelector(`.bi-x-lg`);
const submitBtn = document.querySelector(`.submit-btn`);
const inputTitle = document.getElementById(`title`);
const inputBody = document.getElementById(`body`);
const imageURL = document.querySelector(`#image-url`);
console.log(imageURL);
const overlay = document.querySelector(`.overlay`);
const div = document.querySelector(`.latest-post`);
const latestPost = document.querySelector(`.latestPost`);
const bgImages = document.querySelector(`.read-img`);
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

// OPEN MODAL
createPost.addEventListener(`click`, () => {
  overlay.classList.add(`show-modal`);
});
// CLOSE MODAL
closeModal.addEventListener(`click`, () => {
  overlay.classList.remove(`show-modal`);
});

// CREATE (POST) NEW BLOG POST
submitBtn.addEventListener(`click`, (e) => {
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
      console.log(data);
      myArray.push(data);
      console.log(myArray);
      div.innerHTML += `
                <div class="row post" data-aos="flip-up">
            <div class="read-img col-12 col-md-3 d-flex align-items-end border">
                <img src="${imageURL.value}" alt="" class="post-image" />
            </div>
            <div class="read col-9 pe-md-5 mt-4 mt-md-0 d-flex flex-column justify-content-center">
                <h3 class="fw-semibold">${myArray[defaultItem].title}</h3>
                <p>
                    by <span class="text-info pt-4">${writersArray[defaultItem].name} </span> ${dateArray[defaultItem].date}
                </p>
                <div class="options d-flex align-items-center justify-content-between">
                  <a href="./post.html" target="_blank">
                    <button class="btn btn-info text-light">Read More</button>
                  </a>
                  <i class="del bi bi-trash3-fill fs-2 text-danger ms-5"></i>
                </div>
            </div>
        </div>
        `;
      overlay.classList.remove(`show-modal`);
      inputBody.value = ``;
      inputTitle.value = ``;
      imageURL.value = ``;
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
                <div class="row post" data-aos="flip-up">
            <div class="read-img col-12 col-md-3 d-flex align-items-end">
                <img src="${pictureArray[i].img}" alt="" class="img-fluid post-image" />
            </div>
            <div class="read col-12 col-md-9 pe-md-5 mt-4 mt-md-0 d-flex flex-column justify-content-center">
                <h3 class="fw-semibold">${myArray[i].title}</h3>
                <p>
                    by <span class="text-info pt-4">${writersArray[i].name}</span> ${dateArray[i].date}
                </p>
                <div class="options d-flex align-items-center justify-content-between pb-3 pb-md-0">
                  <a href="./post.html" target="_blank">
                    <button class="btn btn-info text-light">Read More</button>
                  </a>
                  <i class="del bi bi-trash3-fill fs-2 text-danger ms-5"></i>
                </div>
            </div>
        </div>
        `;
      }
    });
});
