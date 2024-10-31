console.log("hello word");


fetch(`${apiUrl}/auction/Inventory`)
    .then((response) => {
        return response.json();
    })
    .then(async (data) => {
     
       for (let i = 0; i < data.length; i++) {
        const element = data[i];

       await populateData(element)

       }
       if (data.length < 0) {
        noContentHtml("no auto active for auctioning") 
       }
       document.getElementsByClassName("loader")[0].classList.add("hid")
    })
    .catch((error) => {
        console.error('Error:', error);
    });


    function extractTimeFromStartingDateTime(auction) {
        const currentDate = new Date();
      
        // Parse starting and end date times from the auction object
        const startingDateTime = new Date(auction.startingDateTime);
        const endDateTime = new Date(auction.endDateTime);
      
        // Check if the auction has ended by comparing endDateTime with current date
        if (endDateTime <= currentDate) {
          return "ended";
        }
      
        // Check if startingDateTime is today
        const isToday = startingDateTime.toDateString() === currentDate.toDateString();
      
        if (isToday) {
          // Get time as HH:MM:SS if it's today
          const hours = startingDateTime.getHours().toString().padStart(2, '0');
          const minutes = startingDateTime.getMinutes().toString().padStart(2, '0');
          const seconds = startingDateTime.getSeconds().toString().padStart(2, '0');
          return `${hours}:${minutes}:${seconds}`;
        } else {
          // Format date as "DD Mon" if it's not today
          const day = startingDateTime.getDate().toString().padStart(2, '0');
          const month = startingDateTime.toLocaleString('default', { month: 'short' });
          return `${day} ${month}`;
        }
      }
      
    
    
   
      async function populateData(element) {
        try {
            // Fetch the last auction data for the element
            const response = await fetch(`${apiUrl}/auction/getLastAuction/${element._id}`);
            
            // Check if response is successful, otherwise throw an error
            if (!response.ok) throw new Error('Failed to fetch auction data');
            
            // Parse response JSON
            const newAmount = await response.json();
        
            
            // Select the container for product listings
            const container = document.getElementsByClassName("product_listing")[0];
            
            // Determine the amount to display (if newAmount has data, use it; otherwise, use element.Price)
            const amountToDisplay = (newAmount && newAmount[0] && newAmount[0].amount > 0) 
                ? newAmount[0].amount.toLocaleString() 
                : element.Price.toLocaleString();
            
            // Construct HTML with data, including formatted values
            const html = `
                <li>
                    <h1 class="hid">${element._id}</h1>
                    <span>${extractTimeFromStartingDateTime(element)}</span>
                    <span>${element.Model}</span>
                    <span>${element.Price.toLocaleString()}</span>
                    <span>${amountToDisplay}</span>
                    <span>${element.Qualification}</span>
                    <span class="book_mark">book mark</span>
                </li>
            `;
            
            // Insert the new HTML into the container
            container.insertAdjacentHTML('beforeend', html);
        } catch (error) {
            console.error('Error populating data:', error);
        }
    }
    
    function noContentHtml(data) {
        var html = `
        <div class="no_cont"
             style="display: flex;
                    width: 100%;
                    min-height: 400px;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;">
            <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 
            <dotlottie-player src="https://lottie.host/2fb3f3c8-c9f3-4bc4-9fcb-8a04813bcb7f/3xQzNFyrEV.json" 
                              background="transparent" 
                              speed="1" 
                              style="width: 300px; height: 300px;" 
                              loop 
                              autoplay>
            </dotlottie-player>
            <h1>${data}</h1>      
        </div>
        `;
        return html;
    }
    