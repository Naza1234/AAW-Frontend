// Elements selectors
const nextButtons = document.getElementsByClassName("button");
const inputs = document.querySelectorAll("form input");
const selects = document.querySelectorAll("form select");
const addButtons = document.getElementsByClassName("button_add");
const fileInput = document.querySelector("input.image_back");

let params = {
    userId: UserId,
    Make: "",
    Model: "",
    OdoMeter: "",
    Year: "",
    Location: "",
    Qualification: "",
    Category: "",
    Price: "",
    Description: "",
    endDateTime: "",
    startingDateTime: "",
};

let carDetails = [];
let garageDetails = [];
let productImages = [];

// Navigation handling for next buttons
for (let j = 0; j < nextButtons.length; j++) {
    nextButtons[j].addEventListener("click", () => {
        const inputElements = nextButtons[j].parentElement.getElementsByTagName("input");
        
        // Check if any input value is present
        if (Array.from(inputElements).some(input => input.value)) {
            switchSteps(j+1);
            updateParams();
        } else if (inputElements.length === 0) {
            switchSteps(j+1);
            updateParams();
        }
    });
}
// Add event listeners for past steps
const listItems = document.querySelectorAll(".list ul li");
listItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        // Only allow clicking on past steps
        if (item.classList.contains("active") || index < getActiveStepIndex()) {
            switchSteps(index); // Switch to the clicked step
            updateParams();
        }
    });
});

// Function to get the index of the currently active step
function getActiveStepIndex() {
    const activeItem = document.querySelector(".list ul li.active");
    return Array.from(listItems).indexOf(activeItem);
}

// Modified switchSteps function
function switchSteps(index) {
    const listItems = document.querySelectorAll(".list ul li");
    
    // Remove active class from all steps
    listItems.forEach((item, idx) => {
        item.classList.remove("active");
        if (idx <= index) {
            item.classList.add("active");
        }
    });

    // Hide all parent elements and show the one corresponding to the new index
    for (let i = 0; i < nextButtons.length; i++) {
        nextButtons[i].parentElement.classList.add("hid");
    }
    
    nextButtons[index].parentElement.classList.remove("hid");
}


function updateParams() {
    params = {
      userId: UserId,
        Make: inputs[0].value,
        Model: inputs[1].value,
        OdoMeter: inputs[2].value,
        Year: inputs[3].value,
        Location: inputs[4].value,
        Qualification: selects[0].value,
        Category: selects[1].value,
        Price: inputs[5].value,
        Description: inputs[10].value,
        startingDateTime: `${inputs[11].value} ${inputs[12].value}`,
        endDateTime: `${inputs[13].value} ${inputs[14].value}`,
    };
}

// Handling add buttons for car/garage details
for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", () => {
        const input = addButtons[i].parentElement.getElementsByTagName("input");
        
        let detailParams = {
            productId: "",
            detailTitle: input[0].value,
            detailsInformation: input[1].value,
        };

        if (i === 0) {
            carDetails.push(detailParams);
            populateDetails(carDetails, 0);
        } else {
            garageDetails.push(detailParams);
            populateDetails(garageDetails, 1);
        }
    });
}

function populateDetails(arrayName, No) {
    const container = document.querySelectorAll("div section ul")[No];
    container.innerHTML = ""; // Clear existing content

    arrayName.forEach(element => {
        const html = `
        <h2>
            <b>${element.detailTitle}: </b>
            ${element.detailsInformation}
        </h2>`;
        container.insertAdjacentHTML("beforeend", html);
    });
}

// Handling product image uploads and previews
fileInput.addEventListener("change", (e) => {
    const input = e.target.files[0];

    if (productImages.length === 20) {
        productImages.pop(); // Limit the array to 20 images
    }

    productImages.unshift(input);
    updateImagePreviews();
});

function updateImagePreviews() {
    const imageContainer = document.getElementsByClassName("image_container")[0];
    imageContainer.innerHTML = ""; // Clear the container

    productImages.slice(0, 20).forEach((file, index) => {
        const imageSrc = URL.createObjectURL(file);
        const html = `
        <div class="image_box" data-index="${index}">
            <img src="${imageSrc}" alt="">
            <div class="pop_edit">
                <img src="../assets/image/delete.png" alt="Delete" class="delete_icon">                             
            </div>
        </div>`;
        imageContainer.insertAdjacentHTML("beforeend", html);
    });

    // Add event listeners for delete icons
    const deleteIcons = document.getElementsByClassName('delete_icon');
    Array.from(deleteIcons).forEach((icon) => {
        icon.addEventListener('click', function () {
            const index = this.closest('.image_box').getAttribute('data-index');
            productImages.splice(index, 1); // Remove the image from the array
            updateImagePreviews(); // Re-render the previews
        });
    });
}

function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
  });
}

function convertBase64ToFile(base64String, filename) {
  const arr = base64String.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
  }

  return new File([u8arr], filename, { type: mime });
}

function generateImageFileName() {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().split(' ')[0].replace(/:/g, '-');
  const microseconds = String(now.getMilliseconds()).padStart(3, '0'); // Milliseconds treated as microseconds
  return `${date}_${time}-${microseconds}`;
}

// Create a function to convert all images to Base64
async function convertImagesToBase64(images) {
  // Use Promise.all to convert all images concurrently
  return await Promise.all(images.map(async (image) => {
      const base64Image = await convertFileToBase64(image);
      return { file: base64Image, uploaded: false };
  }));
}

 document.getElementsByTagName("form")[0].addEventListener("submit", async (e) => {
  e.preventDefault();
  await  checkUser() 
  const fileInput = inputs[15].files[0]; // Make sure 'inputs' is defined correctly
  
  // Convert file to Base64
  const coverImageBase64 = await convertFileToBase64(fileInput);
   // Convert product images
   const convertedProductImages = await convertImagesToBase64(productImages);
  const formData = {
      params: { ...params, uploaded: false },
      productId: "",
      coverImage: {
          file: coverImageBase64,
          uploaded: false
      },
      carDetails: carDetails.map(detail => ({ ...detail, uploaded: false })),
      garageDetails: garageDetails.map(detail => ({ ...detail, uploaded: false })),
      productImages: convertedProductImages,
  };

 

  // Store the formData in local storage
  localStorage.setItem("formData", JSON.stringify(formData));


  // Call upload function
  uploadProductInfo();
});

async function uploadProductInfo() {
  const popup = document.getElementsByClassName("pop")[0];
  popup.classList.remove("hid");
  popup.innerHTML = `
      <div class="dit">
          <div class="lds-facebook"><div></div><div></div><div></div></div>
          <h1>Adding product</h1>
      </div>`;

  const storedData = JSON.parse(localStorage.getItem("formData")) || {};

  if (!storedData.params || storedData.params.uploaded) {
      console.log("Product parameters have already been uploaded.");
      return;
  }

  const params = { ...storedData.params, uploaded: false };

  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
  };

  try {
      const response = await fetch(`${apiUrl}/products/products`, requestOptions);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const productId = data._id;

      storedData.productId = productId;
      storedData.params.uploaded = true;
      localStorage.setItem("formData", JSON.stringify(storedData));
      popup.classList.add("hid");
      await uploadProductCoverImage(productId);
      await uploadProductImages(productId);
      await uploadCarDetails(productId);
      await uploadGarageDetails(productId);
  } catch (error) {
      console.error('Error during product upload:', error);
  }
}

async function uploadProductCoverImage(productId) {
  const popup = document.getElementsByClassName("pop")[0];
  popup.classList.remove("hid");
  const storedData = JSON.parse(localStorage.getItem("formData")) || {};
  const params = storedData.coverImage || {};

  if (params.uploaded) {
      console.log("Cover image has already been uploaded.");
      return;
  }

  const formData = new FormData();
  formData.append("productId", productId);
  const file = await convertBase64ToFile(params.file, generateImageFileName());
  formData.append("imageUrl", file);

  try {
      const response = await fetch(`${apiUrl}/productImage/product-images`, {
          method: 'POST',
          body: formData,
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      params.uploaded = true;
      localStorage.setItem("formData", JSON.stringify(storedData));
      popup.classList.add("hid");
      console.log("Cover image uploaded successfully.");
  } catch (error) {
      console.error('Error uploading cover image:', error);
  }
}

async function uploadProductImages(productId) {
  const popup = document.getElementsByClassName("pop")[0];
  popup.classList.remove("hid");
  const storedData = JSON.parse(localStorage.getItem("formData"));
  const imagesToUpload = storedData.productImages.filter(img => !img.uploaded);

  for (const [index, image] of imagesToUpload.entries()) {
      const formData = new FormData();
      formData.append("productId", productId);
      const file = await convertBase64ToFile(image.file, generateImageFileName());
      formData.append("imageUrl", file);
      popup.classList.remove("hid");
      try {
          const response = await fetch(`${apiUrl}/OtherImage/OtherImage`, {
              method: 'POST',
              body: formData
          });
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          image.uploaded = true;
          localStorage.setItem("formData", JSON.stringify(storedData));
          const popup = document.getElementsByClassName("pop")[0];
          popup.classList.add("hid");
      } catch (error) {
          console.error(`Error uploading image ${index}:`, error);
      }
  }
}

async function uploadCarDetails(productId) {
  const popup = document.getElementsByClassName("pop")[0];
  popup.classList.remove("hid");
  const storedData = JSON.parse(localStorage.getItem("formData"));
  const carDetailsToUpload = storedData.carDetails.filter(detail => !detail.uploaded);

  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carDetailsToUpload.map(detail => ({ ...detail, productId }))),
  };

  try {
      const response = await fetch(`${apiUrl}/car-details/car-details`, requestOptions);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      carDetailsToUpload.forEach(detail => {
          detail.uploaded = true;
      });
      localStorage.setItem("formData", JSON.stringify(storedData));
      const popup = document.getElementsByClassName("pop")[0];
      popup.classList.add("hid");
  } catch (error) {
      console.error('Error uploading car details:', error);
  }
}

async function uploadGarageDetails(productId) {
  const popup = document.getElementsByClassName("pop")[0];
  popup.classList.remove("hid");
  const storedData = JSON.parse(localStorage.getItem("formData"));
  const garageDetailsToUpload = storedData.garageDetails.filter(detail => !detail.uploaded);

  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(garageDetailsToUpload.map(detail => ({ ...detail, productId }))),
  };

  try {
      const response = await fetch(`${apiUrl}/garage-details/garage-details`, requestOptions);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      garageDetailsToUpload.forEach(detail => {
          detail.uploaded = true;
      });
      localStorage.setItem("formData", JSON.stringify(storedData));
      const popup = document.getElementsByClassName("pop")[0];
      popup.classList.add("hid");
  } catch (error) {
      console.error('Error uploading garage details:', error);
  }
}



// On page load, check for existing data in local storage
window.onload = () => {
  const storedData = JSON.parse(localStorage.getItem("formData")) || {};

  // Initialize a flag to track if any uploads are remaining
  let remainingUploads = false;

  // Check if product info needs to be uploaded
  if (storedData.params?.uploaded === false) {
      uploadProductInfo();
      remainingUploads = true; // Mark as remaining upload
  } else {
      // Check cover image upload
      if (storedData.coverImage?.uploaded === false) {
          uploadProductCoverImage(storedData.productId);
          remainingUploads = true; // Mark as remaining upload
      }

      // Check product images upload
      if (storedData.productImages?.some(img => img.uploaded === false)) {
          uploadProductImages(storedData.productId);
          remainingUploads = true; // Mark as remaining upload
      }

      // Check car details upload
      if (storedData.carDetails?.some(detail => detail.uploaded === false)) {
          uploadCarDetails(storedData.productId);
          remainingUploads = true; // Mark as remaining upload
      }

      // Check garage details upload
      if (storedData.garageDetails?.some(detail => detail.uploaded === false)) {
          uploadGarageDetails(storedData.productId);
          remainingUploads = true; // Mark as remaining upload
      }
  }

  // Alert if there are remaining uploads
  if (remainingUploads) {
      alert("Continuing upload of remaining data...");
      const popup = document.getElementsByClassName("pop")[0];
      popup.classList.remove("hid");
  }else{
    const popup = document.getElementsByClassName("pop")[0];
    popup.classList.add("hid");
  }
};



function checkUser() {
    fetch(`${apiUrl}/user/users/${UserId}`)
.then((response) => {
return response.json();
})
.then((data) => {
    
    if(!data.UserName){
        window.location=`${winUrl}/pages/loging.html`
    }
})
}