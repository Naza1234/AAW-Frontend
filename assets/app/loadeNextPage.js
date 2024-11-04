


    // Set up an interval to check for items every 5 seconds
    const intervalId = setInterval(() => {
        items = document.querySelectorAll(".product_listing li:not(.heading)");
        if (items.length > 0) {
          
            for (let i = 0; i < items.length; i++) {
                const element = items[i];
              element.addEventListener("click",()=>{
                var id= element.querySelector(".hid").textContent
               window.location=winUrl+"/pages/detalis.html?r="+id
            })
            }
        }
    }, 1000);

