// get this api key from https://thecatapi.com/ after signing up
const API_KEY = "71d0e911-6522-429e-a20c-58b10dddb81b";
// api endpoint
const URL_B = `https://api.thecatapi.com/v1/images/search`;

// event listeners
const previous_btn = document.querySelector(".previous-btn");
const next_btn = document.querySelector(".next-btn");
const pageNoIndicator = document.querySelector(".page-no-indicator");
const results_sec = document.querySelector(".all-results");

let page = 0;

// toggle buttons to enable/disable
function toggleBtns(disabled) {
  previous_btn.disabled = disabled;
  next_btn.disabled = disabled;
}

// fetch data from the api
async function fetchData() {
  // prepare url
  const url = `${URL_B}?limit=12&order=asc&page=${page}`;

  // adding text to dom
  pageNoIndicator.textContent = `Showing page ${page}`;
  results_sec.textContent = "Loading...";

  toggleBtns(true);

  // fetch data wrapped in try catch block. using fetch api
  try {
    const response = await fetch(url, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    const data = await response.json();
    renderImgs(data);
  } catch (err) {
    results_sec.textContent =
      "Something went wrong while fetching data from the server";
  } finally {
    // this code always runs
    toggleBtns(false);
    if (page === 0) {
      previous_btn.disabled = true;
    }
  }
}

// render images to the dom
function renderImgs(data) {
  results_sec.textContent = null;
  //using for loop
  data.forEach(({ url }) => {
    const img = document.createElement("img");
    img.src = url;
    results_sec.append(img);
  });
}
// previous button click reduces page number by 1
previous_btn.addEventListener("click", () => {
  page--;
  fetchData();
});
// next button click increases page number by 1
next_btn.addEventListener("click", () => {
  page++;
  fetchData();
});

fetchData();
