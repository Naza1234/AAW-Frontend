const currentURL = window.location.search;
const searchParams = new URLSearchParams(currentURL);
const itemId = searchParams.get("r");

fetchData(itemId);

function fetchData(id) {
  console.log("Data loading...");

  Promise.all([
    fetch(`${apiUrl}/products/products/${id}`).then(res => res.json()),
    fetch(`${apiUrl}/productImage/product-images/${id}`).then(res => res.json()),
    fetch(`${apiUrl}/OtherImage/OtherImage/${id}`).then(res => res.json()),
    fetch(`${apiUrl}/car-details/car-details-with-id/${id}`).then(res => res.json()),
    fetch(`${apiUrl}/garage-details/garage-details-with-id/${id}`).then(res => res.json()),
    fetch(`${apiUrl}/auction/getLastAuction/${id}`).then(res => res.json()),
    // fetch(`${apiUrl}/conversations/get-conversations-by-product-id/${id}`).then(res => res.json())
  ]).then(([data, dataImg, dataOtherImg, carDetails, garageDetails, carPrice]) => {
    populateData(data, dataImg, dataOtherImg, carDetails, garageDetails, carPrice, id);

    fetch(`${apiUrl}/user/users/${UserId}`)
      .then(res => res.json())
      .then(userData => {
      
  if(!userData.UserName){
    window.location=`${winUrl}/pages/loging.html`
}
        if (userData.UserPaymentStatues === "free") {
          const errorNot = document.getElementsByClassName("error_not")[0];
          errorNot.innerHTML = "<b>Please note:</b> <br> You are on a free account and cannot place bid on more than one product.";
          errorNot.classList.remove("hid");
        }
      })
      .catch(error => {
        console.error('User fetch error:', error);
      });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}

var time

function populateData(data, dataImg, dataOtherImg, carDetails, garageDetails, carPrice, id) {
  const content = document.getElementsByClassName("details")[0];
  content.innerHTML = `
    <section class="product_images_section">
      <div class="cover_img">
        <img src="${dataImg.imageUrl}" alt="">
      </div>
      <div class="sub_image" id="subImageContainer"></div>
    </section>
    <section class="product_general_details">
      <h1>Product Details</h1>
      <h2>${data.Year} ${data.Make} ${data.Model}</h2>
      <span class="buttons_involved">
        <h2 class="active">General Details</h2>
        <h2>Garage Details</h2>
      </span>
      <ul></ul>
      <ul class="hid"></ul>
    </section>
    <section class="product_general_details">
      <h1>Bid Information</h1>
      <span><h2 class="active">Qualification:</h2><h2>${data.Qualification}</h2></span>
      <span><h2 class="active">Location:</h2><h2>${data.Location}</h2></span>
      <span><h2 class="active">Time Remaining:</h2><h2 style="color:red;" class="time_show"></h2></span>
      <span><h2 class="active">Current Bid Price:</h2><h2 class="price_in">$${data.Price.toLocaleString()}</h2></span>
      <form  id="bidForm">
        <div class="hid error_not">
          <b>Please note:</b> <br> Account not detected
        </div>
        <input type="number" class="pace_auction_input" name="value" min="${parseFloat(data.Price) + 50}"required>
        <p>$50.00 CAD Bid Increment</p>
        <button type="submit" class="button_to_add_auction">Submit Bid</button>
      </form>
    </section>
  `;

  setupNavigation();
  time=data.endDateTime;
  countdown()
  PopulateDetails(carDetails, 0);
  PopulateDetails(garageDetails, 1);
  populateSubImage(dataOtherImg);
  updatePrice(carPrice);
  subImage() 
placeAuction(id);
}


function countdown() {
  var futureDate = time
  const future = new Date(futureDate).getTime();

  // Check if the date is valid
  if (isNaN(future)) {
    return "Invalid date format";
  }

  const now = new Date().getTime();
  const timeDifference = future - now;

  // If the countdown is finished, return "0d 0h 0m 0s"
  if (timeDifference <= 0) {
    document.getElementsByClassName("time_show")[0].innerHTML = "Time's Up!";
    document.getElementsByClassName("error_not")[0].innerHTML = "<b>Bid has ended</b>";
    document.getElementsByClassName("error_not")[0].classList.remove("hid");
    return ;
  }

  // Calculate time components
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

 
  const countdownString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  document.getElementsByClassName("time_show")[0].innerHTML = countdownString;

  setTimeout(countdown , 1000);
}





function setupNavigation() {
  const buttonsForNav = document.querySelectorAll(".details span.buttons_involved h2");
  const DetailList = document.querySelectorAll(".details ul");

  buttonsForNav[0].addEventListener("click", () => {
    buttonsForNav[0].classList.add("active");
    buttonsForNav[1].classList.remove("active");
    DetailList[0].classList.remove("hid");
    DetailList[1].classList.add("hid");
  });

  buttonsForNav[1].addEventListener("click", () => {
    buttonsForNav[1].classList.add("active");
    buttonsForNav[0].classList.remove("active");
    DetailList[1].classList.remove("hid");
    DetailList[0].classList.add("hid");
  });
}

function PopulateDetails(detailsData, index) {
  // Get the container based on the index (0 for car details, 1 for garage details)
  const container = document.querySelectorAll(".details ul")[index];

  // Clear previous contents of the container
  container.innerHTML = "";

  // Check if data is available
  if (!detailsData || detailsData.length === 0) {
    container.innerHTML = "<li>No details available.</li>";
    return;
  }

  // Loop through the detailsData array and generate HTML for each detail
  detailsData.forEach(detail => {
    const detailItem = `
      <li>
        <p>${detail.detailTitle}</p>
        <h3>${detail.detailsInformation}</h3>
      </li>
    `;
    // Insert each detail item into the container
    container.insertAdjacentHTML("beforeend", detailItem);
  });
}


function populateSubImage(dataOtherImg) {
  const parentElement = document.querySelector('.sub_image');
  
  // Check if dataOtherImg is an array
  if (!Array.isArray(dataOtherImg)) {
    // Create an img element
    const imgElement = document.createElement('img');
    // Set the src attribute using the URL from the object
    imgElement.setAttribute('src', dataOtherImg.imageUrl);
    // Set the alt attribute (you may want to customize this)
    imgElement.setAttribute('alt', 'Image');
    // Append the img element to the parent element
    parentElement.appendChild(imgElement);
  } else {
    // Loop through the array and generate HTML for each image
    dataOtherImg.forEach(imageData => {
      // Create an img element
      const imgElement = document.createElement('img');
      // Set the src attribute using the URL from the object
      imgElement.setAttribute('src', imageData.imageUrl);
      // Set the alt attribute (you may want to customize this)
      imgElement.setAttribute('alt', 'Image');
      // Append the img element to the parent element
      parentElement.appendChild(imgElement);
    });
  }
}

// Function to populate sub-images on the page
function subImage() {
  var subImages = document.querySelectorAll(".sub_image img");
  var mainImage = document.querySelector(".cover_img img"); // assuming you meant ".cover_img"

  subImages.forEach(subImage => {
    subImage.addEventListener("click", () => {
      var imgSrc = subImage.src;
      mainImage.src = imgSrc;
    });
  });
}



function updatePrice(prices) {
  const element = document.querySelector(".price_in");
  prices.forEach(price => {
    element.innerHTML = `$${price.amount.toLocaleString()}`;
  });
}

function placeAuction(id) {
  const element = document.querySelector(".price_in");


  const valueOfNumber = parseFloat(element.innerHTML.replace("$", "").replace(",", ""));
  const form = document.getElementById("bidForm"); // Select the form by ID

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  
  // Get the button that triggered the form submission
  const submitButton = e.target.querySelector(".button_to_add_auction");

  // Change the button style to indicate loading
  submitButton.style.cursor = "not-allowed";
  submitButton.style.pointerEvents = "none"; 

  // Clear any previous error message
  const errorDisplay = document.getElementsByClassName("error_not")[0];
  errorDisplay.innerHTML = "";
  errorDisplay.classList.add("hid");

  const inputValue = parseFloat(form.querySelector("input").value);

  if (inputValue > valueOfNumber + 50) {
    const params = { userId: UserId, productId: id, amount: inputValue };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    };

    fetch(`${apiUrl}/auction/done_it`, requestOptions)
      .then(async response => {
        if (!response.ok) {
          // Handle specific error codes if needed
          if (response.status === 400) {
            const errorData = await response.json(); // Get the error message from the response body
            throw new Error(errorData.message || "Bad request - Please check your input values.");
          } else if (response.status === 404) {
            const errorData = await response.json(); // Get the error message from the response body
            throw new Error(errorData.message || "Resource not found - The auction or user might not exist.");
          } else if (response.status === 500) {
            const errorData = await response.json(); // Get the error message from the response body
            throw new Error(errorData.message || "Server error - Please try again later.");
          } else {
            const errorData = await response.json(); // Get the error message from the response body
            throw new Error(errorData.message || "Request failed - Please try again.");
          }
        }
        return response.json();
      })
      .then(data => {
        console.log('Auction placed successfully:', data);
        data?
        updatePriceAfter(data)
        :console.log(data); // Update the price after auction placement
      })
      .catch(error => {
        console.error('Error placing auction:', error);
        
        // Display the error message in the .error_not element
        errorDisplay.innerHTML = `<b>${error.message}</b>`;
        errorDisplay.classList.remove("hid");
      })
      .finally(() => {
        // Reset button styles
        submitButton.style.pointerEvents = "auto";
        submitButton.style.cursor = "pointer";
      });
  } else {
    // Display an error message if the input value doesn't meet the condition
    errorDisplay.innerHTML = "<b>The bid amount must be greater than the current price plus 50.</b>";
    errorDisplay.classList.remove("hid");

    setTimeout(() => {
       errorDisplay.innerHTML = "";
    errorDisplay.classList.add("hid");

    }, 5000);
    // Reset button styles
    submitButton.style.pointerEvents = "auto";
    submitButton.style.cursor = "pointer";
  }
});

}
function updatePriceAfter(params) {
  document.getElementsByClassName("price_in")[0].innerHTML=params.amount.toLocaleString()
  document.getElementsByClassName("pace_auction_input")[0].setAttribute("min",params.amount + 50)
}