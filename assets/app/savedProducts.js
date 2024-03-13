






console.log(600);

fetch(`${apiUrl}/savedProduct/saved-products-by-user-id/${UserId}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data); // Display the data received from the backend
        if (data.length>0) {
            document.getElementsByClassName("head")[0].classList.add("hid")
            document.getElementsByClassName("how")[0].classList.add("hid")
            document.getElementsByClassName("items")[0].classList.remove("hid")
        }
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            populateData(element)
           }
    })
    .catch((error) => {
        console.error('Error:', error);
    });



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
    
    
   
    function populateData(element){
        var container=document.getElementsByClassName("product_listing")[0]
        var html=`
        <li>
        <h1 class="hid">${element._id}</h1>
        <span>
        ${extractTimeFromStartingDateTime(element)}
        </span>
        <span>
        ${element.Model}
        </span>
        <span>
        ${element.Price}
        </span>
        <span>
        ${element.Price}
        </span>
        <span>
        ${element.Qualification}
        </span>
        <span class="book_mark_remove">
            remove
        </span>
       </li>
        `
        container.insertAdjacentHTML('beforeend',html)
    }