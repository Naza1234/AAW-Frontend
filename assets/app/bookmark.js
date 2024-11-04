


let items = document.querySelectorAll(".product_listing li:not(.heading)");

    const intervalId = setInterval(() => {
        items = document.querySelectorAll(".product_listing li:not(.heading)");
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                const element = items[i];
                const bookmarkButton = element.querySelector(".book_mark");
                bookmarkButton.addEventListener("click", (e) => {
                    e.stopPropagation(); // Prevent click event from propagating to the parent element
                    addBookMark(e.target.parentElement);
                });
            }
        }
    }, 1000);


function addBookMark(item) {

    // Implement your logic for adding bookmark here
    const params={
        userId:UserId,
          productId:item.querySelector(".hid").textContent
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
         body: JSON.stringify(params),
      };
   
    
      fetch(`${apiUrl}/savedProduct`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Handle the response data here
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
    // console.log(params);
}

