// Mobile Navigation Bar
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobile-menu");

burger.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Initialize clickCount
let clickCount = 0;

// find search button
document.getElementById("search-btn").addEventListener("click", handleSearch);

// Spinner Element
const spinner = document.getElementById("spin-loader");

// Fetch data
const showAlldiscuss = async (searchTerm = "") => {
  // show spin loader
  spinner.classList.remove("hidden");

  const apiUrl = searchTerm
    ? `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchTerm}`
    : "https://openapi.programming-hero.com/api/retro-forum/posts";

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const allDetails = data.posts;

    displayAllDetails(allDetails);
  } catch (erorr) {
    console.error("Erorr fetching data", erorr);
    document.getElementById("all-discusses-container").innerHTML =
      "<p>Error loading data.</p>";
  } finally {
    spinner.classList.add("hidden");
  }
};

// Handle Search buton
function handleSearch() {
  const searchTerm = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();
  const allDetailsContainer = (document.getElementById(
    "all-discusses-container"
  ).innerHTML = "");

  // stop spinner

  showAlldiscuss(searchTerm);
}

// Function to display fetched discussions in the main container
const displayAllDetails = (allDetails) => {
  const allDetailsContainer = document.getElementById(
    "all-discusses-container"
  );
  allDetailsContainer.innerHTML = ""; // Clear the container before adding new content

  if (allDetails.length === 0) {
    allDetailsContainer.innerHTML = "<p>No results found</p>";
  }

  allDetails.forEach((allDetail) => {
    const singleDetails = document.createElement("div");
    singleDetails.classList = `dynamic-container  bg-[#797dfc1a] border border-[#797DFC] mb-6 flex flex-col lg:flex-row gap-6 h-auto lg:h-[270px] items-center justify-center rounded-3xl w-full lg:w-[772px] p-4`;

    // presence indicator
    const presenceIndicator = allDetail.isActive
      ? "bg-green-500"
      : "bg-red-500";

    singleDetails.innerHTML = `
            <!-- Active Indicator -->
            <div class="bottom-0 lg:bottom-[61px] inline-block relative">
              <!-- Presence Indicator -->
              <span
                class="absolute right-0 w-4 h-4 ${presenceIndicator} border-2 border-white rounded-full"
                title="Online"
              ></span>
              <!-- Avatar -->
              <div class="w-[72px] h-[72px]"><img class="rounded-2xl" src="${allDetail?.image}" alt=""></div>
            </div>
            <!-- Other details -->
            <div>
              <div
                class="font-medium text-xs sm:text-sm text-[#12132dcc] f-inter flex flex-col lg:flex-row gap-2"
              >
                <p># ${allDetail?.category}</p>
                <p>Author : ${allDetail?.author.name}</p>
              </div>
              <h1
                class="font-bold text-[#12132D] text-lg sm:text-xl mt-3 mb-4 lg:mb-6"
              >
                ${allDetail?.title}
              </h1>
              <p class="f-inter text-sm sm:text-base">
                ${allDetail?.description}
              </p>
              <hr
                class="my-4 sm:my-5 bg-[#12132d40] border-dashed w-full lg:w-[596px]"
              />
              <!-- Icons with details -->
              <div
                class="f-inter icons text-sm sm:text-base text-[#12132d99] flex justify-between"
              >
                <div class="flex gap-6 sm:gap-4 items-center">
                  <p class="flex gap-2">
                    <img src="images/tabler-icon-message-2.svg" alt="" />${allDetail?.comment_count}
                  </p>
                  <p class="flex gap-2">
                    <img src="images/tabler-icon-eye.svg" alt="" />${allDetail?.view_count}
                  </p>
                  <p class="flex gap-2">
                    <img src="images/tabler-icon-clock-hour-9.svg" alt="" />${allDetail?.posted_time}
                    min
                  </p>
                </div>
                <div>
                  <button class="add-to-new-container text-white px-4 py-2 rounded-md">
                    <img src="images/email 1.svg" alt="email icon" />
                  </button>
                </div>
              </div>
            </div>
          `;

    allDetailsContainer.appendChild(singleDetails);
  });
};

// Event delegation to handle clicks on dynamic buttons
document
  .getElementById("all-discusses-container")
  .addEventListener("click", function (event) {
    const button = event.target.closest(".add-to-new-container");

    if (button) {
      const parentDiv = button.closest(".dynamic-container");
      const title = parentDiv.querySelector("h1").textContent;
      const viewElement = parentDiv
        .querySelector('p img[src="images/tabler-icon-eye.svg"]')
        .closest("p");
      const viewHTML = viewElement.innerHTML.trim();

      // Call function to add details to the new container
      addToNewContainer(title, viewHTML);

      // Update the click count
      updateClickCount();
    }
  });

// Function to add clicked item details to the new container
const addToNewContainer = (title, viewHTML) => {
  const newContainer = document.getElementById("new-container");
  const newContent = `
            <div
              class="shadow-2xl bg-white flex h-auto items-center justify-around rounded-2xl w-full lg:w-[326px] p-4 mb-4"
            >
              <h1 class="text-[#12132D] text-sm sm:text-base font-semibold">
                ${title}
              </h1>
              <p class="flex gap-2  relative right-3">
                ${viewHTML}
              </p>
            </div>
  `;
  newContainer.innerHTML += newContent;
};

// Function to update and display click count
function updateClickCount() {
  clickCount++;
  document.getElementById("clicked-count-display").textContent = clickCount;
}

// fetch the latest post api
const fetchAllLatestPosts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  displayAllLatestPosts(data);
};

// display the latest post
function displayAllLatestPosts(data) {
  // latest post container
  const latesPostsMainContainer = document.getElementById(
    "latest-posts-main-container"
  );
  data.forEach((latestPost) => {
    const singleLatestDetails = document.createElement("div");
    singleLatestDetails.classList = `w-full md:w-[374px] h-auto bg-white border border-[#12132d26] rounded-3xl`;

    // date ternari operator
    const dateOperator = latestPost?.author.posted_date
      ? latestPost?.author.posted_date
      : "No Publish Date";
    const degicnationOperator = latestPost?.author?.designation
      ? latestPost?.author?.designation
      : "No Designation found";
    singleLatestDetails.innerHTML = `
    <figure class="p-6">
              <img
                src="${latestPost?.cover_image}"
                alt="Shoes"
                class="rounded-xl w-full"
              />
            </figure>
            <div class="px-6">
              <p class="text-base text-[#12132d99] flex gap-2 items-center">
                <img src="images/date.svg" alt="date icon" class="w-4 h-4" />
                ${dateOperator}
              </p>
              <h2 class="text-lg text-[#12132D] font-extrabold py-3">
                ${latestPost?.title}
              </h2>
              <p class="text-base text-[#12132d99] pb-4 pr-4">
              ${latestPost?.description}
              </p>
              <div class="flex gap-4 items-center mb-6">
                <img class="rounded-full w-11" src="${latestPost?.profile_image}" alt="profile" class="w-10 h-10" />
                <div>
                  <h1 class="text-base text-[#12132D] font-bold mb-1">
                  ${latestPost?.author?.name}
                  </h1>
                  <p class="text-sm text-[#12132d99]">${degicnationOperator}</p>
                </div>
              </div>
    `;
    latesPostsMainContainer.appendChild(singleLatestDetails);
  });
}
// // Call function to show discussions and all latest posts on page load
showAlldiscuss();
fetchAllLatestPosts();
