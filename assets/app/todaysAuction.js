console.log(600);

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
        console.log('Ongoing Auctions:', ongoingAuctions);
        console.log('Upcoming Auctions:', upcomingAuctions);
    })
    .catch((error) => {
        console.error('Error:', error);
    });





    const ongoingAuctions = [];
    const upcomingAuctions = [];

    function checkAuctionStatus(auction) {
        const currentTime = new Date();
    
        // Convert startingDateTime and endDateTime strings to Date objects
        const startingDateTime = new Date(auction.startingDateTime);
        const endDateTime = new Date(auction.endDateTime);
    
        if (startingDateTime <= currentTime && endDateTime >= currentTime) {
            ongoingAuctions.push(auction);
            populateData(0,auction)
        } else if (startingDateTime > currentTime) {
            upcomingAuctions.push(auction);
            populateData(1,auction)
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
        <span class="book_mark">
            book mark
        </span>
       </li>
        `
        container.insertAdjacentHTML('beforeend',html)
    }