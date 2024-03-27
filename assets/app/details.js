const currentURL = window.location.search;
// get url params
 const searchParams= new URLSearchParams(currentURL)
 const itemId=searchParams.get("r")



fetchData(itemId)



function fetchData(id){
  console.log("data loading ...");
    fetch(`${apiUrl}/products/products/${id}`)
    .then((response) => {
    return response.json();
    })
    .then((data) => {






        fetch(`${apiUrl}/productImage/product-images/${id}`)
        .then((response) => {
      return response.json();
      })
      .then((dataImg) => {



        fetch(`${apiUrl}/OtherImage/OtherImage/${id}`)
        .then((response) => {
      return response.json();
      })
      .then((dataOtherImg) => {







          fetch(`${apiUrl}/car-details/car-details-with-id/${id}`)
          .then((response) => {
        return response.json();
        })
        .then((carDetails) => {






            fetch(`${apiUrl}/garage-details/garage-details-with-id/${id}`)
            .then((response) => {
          return response.json();
          })
          .then((garageDetails) => {

            



            fetch(`${apiUrl}/auction/getLastAuction/${id}`)
            .then((response) => {
          return response.json();
          })
          .then((carPrice) => {




            fetch(`${apiUrl}/conversations/get-conversations-by-product-id/${id}`)
            .then((response) => {
          return response.json();
          })
          .then((conversation) =>
           {
            populateData(data,dataImg,dataOtherImg,carDetails,garageDetails,carPrice,id,conversation)


            fetch(`${apiUrl}/user/users/${UserId}`)
             .then((response) => {
             return response.json();
             })
             .then((data) => {
               if (data.UserPaymentStatues === "free") {
                document.getElementsByClassName("error_not")[0].innerHTML="<b>pleas you are not eligible to place this bid as:</b> <br> you are on free account"
                document.getElementsByClassName("error_not")[0].classList.remove("hid")
               }
             }
             )
             .catch((error) => {
             console.error('Error:', error);
              } );
           
          
          }
          )



          .catch((error) => {
          console.error('Error:', error);
          });







          }
          )



          .catch((error) => {
          console.error('Error:', error);
          });






          }
          )






          .catch((error) => {
          console.error('Error:', error);
          });





        }
        )
        .catch((error) => {
        console.error('Error:', error);
        });
      }
      )





      .catch((error) => {
      console.error('Error:', error);
      });
    }
    )


      .catch((error) => {
      console.error('Error:', error);
      });
    }
    )







    .catch((error) => {
    console.error('Error:', error);
    window.location=window.location
    });
}





function parseDate(dateString) {
  return new Date(dateString);
}




var targetDate



function populateData(data,dataImg,dataOtherImg,carDetails,garageDetails,carPrice,id,conversation){
    





  var content= document.getElementsByClassName("details")[0]
  var html=`
  <section class="product_images_section">
  <div class="cover_img">
      <img src="${dataImg.imageUrl}" alt="">
  </div>
  <div class="sub_image">
  
  </div>
</section>
<section class="product_general_details">
<h1>
  product details

  <hr>
</h1>
<h2>
  ${data.Year + " " + data.Make + " " + data.Model}
</h2>
<span class="buttons_involved">
  <h2 class="active">
   general details
  </h2>
  <h2>
   garage details
  </h2>
</span>
<ul>
  
</ul>

<ul class="hid">

 
</ul>
</section>

<section class="product_general_details">
<h1>
  Bid Information

  <hr>
</h1>
<span>
  <h2 class="active">
   qualification : 
  </h2>
  <h2>
  ${data.Qualification}
  </h2>
</span>

<span>
  <h2 class="active">
   location : 
  </h2>
  <h2>
   g${data. Location}
  </h2>
</span>

<span>
  <h2 class="active">
   time remaining
  </h2>
  <h2 style="color:red;" class="time_show">
   
  </h2>
</span>

<span>
  <h2 class="active">
   current bid price
  </h2>
  <h2 class="price_in">
  $ ${data.Price.toLocaleString()}
  </h2>
</span>
<form>
  <div class="hid error_not">
      <b>pleas you are not eligible to place this bid as:</b> <br>
      Account not dictated
  </div>
  <input type="number" min="50" required>
  <p>
      $50.00 CAD Bid Increment
  </p>
  <button class="button_to_add_auction">
      submit bid
  </button>
</form>
</section>

  `
  content.innerHTML=html
    

  var buttonsForNav= document.querySelectorAll(".details span.buttons_involved h2")
  var DetailList=document.querySelectorAll(".details ul")
  
  
  
  
  buttonsForNav[0].addEventListener("click",()=>{
    console.log("one two");

    buttonsForNav[0].classList.add("active")
    buttonsForNav[1].classList.remove("active")
    DetailList[0].classList.remove("hid")
    DetailList[1].classList.add("hid")
  })
  
  buttonsForNav[1].addEventListener("click",()=>{
    console.log("one");
    buttonsForNav[1].classList.add("active")
    buttonsForNav[0].classList.remove("active")
    DetailList[1].classList.remove("hid")
    DetailList[0].classList.add("hid")
  })
  
  
  



   targetDate= parseDate(data.endDateTime);
   updateCountdown();
   PopulateDetails(carDetails,0)
   PopulateDetails(garageDetails,1)
   populateSubImage(dataOtherImg)
   updatePrice(carPrice)
   placeAuction(data._id)
   subImage()
}







function updateCountdown() {
  // Get the current time in milliseconds



  const now = Date.now();

  // Calculate the difference between target time and current time
  const difference = targetDate - now;

  // Check if the target date has passed
  if (difference <= 0) {
    document.getElementsByClassName("time_show")[0].innerHTML="Time's Up!";
    document.getElementsByClassName("error_not")[0].innerHTML="<b>pleas you are not eligible to place this bid as:</b> <br> bid has ended"
    document.getElementsByClassName("error_not")[0].classList.remove("hid")
    return;
  }

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // Format the countdown string
  const countdownString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  // Log the countdown to the console
  
  document.getElementsByClassName("time_show")[0].innerHTML=countdownString
  // Update the countdown every second
  setTimeout(updateCountdown, 1000);
}






function PopulateDetails(data,NoOfDiv){
  console.log("done");
  var container=document.querySelectorAll(".details ul")[NoOfDiv]
  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    var html=`
    <li>
    <p>
      ${element.detailTitle}
    </p>
    <h3>
       ${element.detailsInformation}
    </h3>
    </li>
    `
    container.insertAdjacentHTML("beforeend",html)
  }
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




function updatePrice(prices){

  var element=document.querySelector(".price_in")
  for (let i = 0; i < prices.length; i++) {
    const elementPrice = prices[i];
     element.innerHTML= "$" + elementPrice.amount.toLocaleString()
  }
}



function placeAuction(id){
  var element=document.querySelector(".price_in")
  var error=document.getElementsByClassName("error_not")
  var button = document.getElementsByTagName("form")[0]
  if(error){
    return
  }
  var valueOfNumber = parseFloat(element.innerHTML.replace("$", "").replace(",", ""))
  button.addEventListener("submit",(e)=>{
   e.preventDefault()

   var inputValue= button.getElementsByTagName("input")[0].value

   if (inputValue > valueOfNumber && inputValue > (valueOfNumber + 50)) {
    
     const params= {
       userId:UserId,
       productId:id,
       amount:inputValue
     }

     const requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
       body: JSON.stringify(params),
    };
    var errorIs=false

    fetch(`${apiUrl}/auction/done_it`, requestOptions)
    .then((response) => {
      if (response.status != 200) {
          errorIs=!errorIs
        // Handle the 400 Bad Request error
        console.error('Bad Request Error:', response);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data here
      window.location=window.location
     
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error:', error);
      window.location=window.location
    });
   }
   
  })

}
