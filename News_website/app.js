const apikey = "d69fd79ca912474f974049523d33522d";
const input = document.querySelector("input");
const search_btn = document.querySelector(".search_btn");
const showmore_btn = document.querySelector(".showmore");

let page_num = 1;
let search_text = "";
let search = false;

input.addEventListener("input", (event) => {
    event.preventDefault();
    search_text = event.target.value;
});

search_btn.addEventListener("click", () => {
    if (input.value === "") {
        alert("Please enter some text");
        return;
    }
    cleargallery();
    search = true;
    SearchPhotos(search_text, page_num);
});

function cleargallery() {
    document.querySelector(".display_images").innerHTML = "";
    page_num = 1;
}
async function CuratedPhotos(page_num) {
    const data = await fetch(`https://newsapi.org/v2/top-headlines?country=in&page=${page_num}&pageSize=10&apiKey=d69fd79ca912474f974049523d33522d`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey,
        },
    });
    const response = await data.json();
    console.log(response);

    display_images(response);
}

function display_images(response) {
    const container = document.getElementById("images-container"); // Assuming you have a container with id="images-container" where you want to display images
    response.articles.forEach((image) => {
        const photo = document.createElement("div");
        photo.classList.add("col"); // Adding column class
        
        // Check if image URL is available, if not, use default image
        const imageUrl = image.urlToImage ? image.urlToImage : 'https://images.pexels.com/photos/902194/pexels-photo-902194.jpeg';

        // Convert publishedAt date to a normal format
        const publishedDate = new Date(image.publishedAt);
        const formattedPublishedDate = publishedDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'UTC' // Make sure to adjust time zone as per your requirement
        });

        photo.innerHTML = `
        <div class="col">
        <a target="_blank" href="${image.url}">
            <div class="card h-100">
                <div class="image-container">
                  <img src="${imageUrl}" class="card-img-top" alt="${image.author}" />
                  <div class="blur-overlay"></div>
                </div>
                <div class="card-body">
                  <h5 style="color: rgb(33, 33, 33); font-weight: bold;" class="card-title">${image.title}</h5>
                  <p class="card-text text-muted">${image.description}</p>
                </div>
                <div class="interaction-buttons">
                  <button class="touch-button"><i class="far fa-newspaper"></i> ${image.source.name}</button>
                  <button class="keyboard-button"><i class="far fa-calendar-days"></i> ${formattedPublishedDate}</button>
                </div>
                <div class="card-footer">
                  <small class="d-inline text-muted">Source: </small>
                  <small class="text-muted ms-1">${image.source.name}</small><br>
                  <small class="d-inline text-muted">Published: </small>
                  <small class="text-muted ms-1">${formattedPublishedDate}</small>
                </div>
              </div>
        </a>
    </div>
        `;
        
        document.querySelector(".display_images").appendChild(photo);
    });
}


const currentDate = new Date();

// Calculate the date one week ago
const oneWeekAgo = new Date();
oneWeekAgo.setDate(currentDate.getDate() - 7);

// Format dates as YYYY-MM-DD strings
const formattedCurrentDate = currentDate.toISOString().split('T')[0];
const formattedOneWeekAgo = oneWeekAgo.toISOString().split('T')[0];

async function SearchPhotos(query, page_num) {
    const data = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=${formattedOneWeekAgo}&to=${formattedCurrentDate}&page=${page_num}&apiKey=d69fd79ca912474f974049523d33522d`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey,
        },
    });
    const response = await data.json();
    console.log(response);

    display_images(response);
}

// Add an event listener to the window's scroll event
// Set the percentage to trigger loading more content (90% in this case)
const triggerPercentage = 80;

// Debounce function to limit the frequency of function calls
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounced function to handle scroll events
const debouncedScroll = debounce(() => {
  // Calculate the percentage of scrolled distance
  const scrolledPercentage = (window.scrollY / (document.body.offsetHeight - window.innerHeight)) * 100;

  // Check if the user has scrolled to the specified percentage
  if (scrolledPercentage >= triggerPercentage) {
    // Load more photos or trigger the desired action
    loadMorePhotos();
  }
}, 100); // Adjust the debounce time as needed (200 milliseconds in this example)

// Attach the debounced scroll event listener
window.addEventListener("scroll", debouncedScroll);


function loadMorePhotos() {
    if (!search) {
        page_num++;
        CuratedPhotos(page_num);
    } else {
        if (search_text === "") return;
        page_num++;
        SearchPhotos(search_text, page_num);
    }
}
CuratedPhotos(page_num);

async function getCategoryNews(category, page_num) {
    const currentDate = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(currentDate.getDate() - 7);

    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
    const formattedOneWeekAgo = oneWeekAgo.toISOString().split('T')[0];

    const apiUrl = `https://newsapi.org/v2/everything?q=${category}&from=${formattedOneWeekAgo}&to=${formattedCurrentDate}&page=${page_num}&apiKey=d69fd79ca912474f974049523d33522d`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        display_images(data);
    } catch (error) {
        console.error('There was a problem fetching the news:', error);
    }
}


// Add event listeners to category links
const categoryLinks = document.querySelectorAll('.category-link');
categoryLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const category = this.dataset.category;
        cleargallery();
        search = true;
        search_text = category;
        getCategoryNews(category, page_num);
    });
});
