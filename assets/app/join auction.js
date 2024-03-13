console.log("its a go");

fetch(`${apiUrl}/auction/todays-auction`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data); // Display the data received from the backend
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            checkAuctionStatus(element);
        }
      
    })
    .catch((error) => {
        console.error('Error:', error);
    });



    fetch(`${apiUrl}/productImage/product-images`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
     
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            uploadImage(element)
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });



   
    function checkAuctionStatus(auction) {
        const currentTime = new Date();
    
        // Convert startingDateTime and endDateTime strings to Date objects
        const startingDateTime = new Date(auction.startingDateTime);
        const endDateTime = new Date(auction.endDateTime);
    
        if (startingDateTime <= currentTime && endDateTime >= currentTime) {
            populateData(0,auction)
        }
    }
    
    function extractTimeFromStartingDateTime(auction) {
        // Parse the startingDateTime string into a Date object
        const startingDateTime = new Date(auction.startingDateTime);
    
        // Get the hours, minutes, and seconds components of the startingDateTime
        const hours = startingDateTime.getHours();
        const minutes = startingDateTime.getMinutes();
        const seconds = startingDateTime.getSeconds();
    
        // Format the time as HH:MM:SS
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
        return formattedTime;
    }
    

   
   
    function populateData(ParentNo,element){
        var container=document.getElementsByClassName("product_listing")[ParentNo]
        var html=`
        <li>
        <h1 class="hid">${element._id}</h1>
    
        <span>
             ${extractTimeFromStartingDateTime(element)}
        </span>
        <span>
            <img src="../assets/image/car1.png" alt="" class="imgs">
        </span>
        <span>
           <h1> ${element.Year}</h1>
           <h1>${element.Model}</h1>
           <h1>${element.Location}</h1>

        </span>
        <span>
       $ ${element.Price}
        </span>
        <span>
        ${element.Qualification}
        </span>
        <span>
            book mark
        </span>
        </li>
        `
        container.insertAdjacentHTML('beforeend',html)
    }


    function uploadImage(data) {
        var items = document.querySelectorAll(".product_listing li");
    
        // Convert NodeList to array for easier iteration
        var itemsArray = Array.from(items);
    
        for (let i = 0; i < itemsArray.length; i++) {
            const element = itemsArray[i];
    
            // Check if the element has a child with class "hid"
            if (!element.querySelector(".hid")) {
                continue; // Continue to the next iteration if ".hid" doesn't exist
            }
    
            const hidElement = element.querySelector(".hid");
            const productId = hidElement.textContent.trim();
    
            if (productId === data.productId) {
                console.log(data); // Display the data received from the backend
                const imgsElement = element.querySelector(".imgs");
                if (imgsElement) {
                    imgsElement.src = data.imageUrl; // Set the src attribute
                } else {
                    console.error("No element with class 'imgs' found.");
                }
            }
        }
    }
    