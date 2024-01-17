
const currentURL = window.location.search;
// get url params
 const searchParams= new URLSearchParams(currentURL)
 const itemId=searchParams.get("r")


 var productImg=[]


if(itemId != null){
    fetchData(itemId)
}




  
const currentDate = new Date();
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
const day = currentDate.getDate().toString().padStart(2, '0');

const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

fetch(`${apiUrl}/products/products`)
.then((response) => {
return response.json();
})
.then((data) => {
   populateData(data)
   if (itemId === null) {
    document.getElementsByClassName("loading_data")[0].classList.add("loading_data_remove")
   }
 
fetch(`${apiUrl}/productImage/product-images`)
.then((response) => {
return response.json();
})
.then((data) => {
   productImg=data
   uploadImg()
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







var productPrice=[]
fetch(`${apiUrl}/auction`)
.then((response) => {
return response.json();
})
.then((data) => {
   productPrice=data
 
}
)
.catch((error) => {
console.error('Error:', error);
});






function populateData(data){
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if(element.category === "one time sails product" ){
             var container=document.getElementsByClassName("auction_house")[0]
               
             var html=`
             <div class="auction_items">
             <img src="../assets/image/car.png" alt="">
             <div class="item_dits">
                <h1>
                 <b>${element.productName}</b>
                 <img src="../assets/image/copy.png" alt="">
                </h1>
                <h6>
                 Live
                </h6>
                <span>
                 <span>
                      <img src="../assets/image/arro.png" alt="">
                      <b>$ ${element.price.toLocaleString()}</b>
                 </span>
                 <h5>
                     recent bid
                 </h5>
                </span>
                
                <p>
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
                     <path opacity="0.4" d="M17.5 6.7C16.45 2.08 12.42 0 8.87998 0C8.87998 0 8.87998 0 8.86998 0C5.33998 0 1.29998 2.07 0.249978 6.69C-0.920022 11.85 2.23998 16.22 5.09998 18.97C6.15998 19.99 7.51998 20.5 8.87998 20.5C10.24 20.5 11.6 19.99 12.65 18.97C15.51 16.22 18.67 11.86 17.5 6.7Z" fill="#A7A7A7"/>
                     <path d="M8.87949 11.71C10.6192 11.71 12.0295 10.2997 12.0295 8.56C12.0295 6.82031 10.6192 5.41 8.87949 5.41C7.13979 5.41 5.72949 6.82031 5.72949 8.56C5.72949 10.2997 7.13979 11.71 8.87949 11.71Z" fill="white"/>
                   </svg>
                   ${element.location} 
             </p>
             <h1>
                 description 
             </h1>
             <p class="p_h150">
             ${element.description}
                </p>
             </div>
             <button class="auction_btn">
             <h5 class="hid">${element._id}</h5>
             <h5 class="hid_data">${element.startingDateTime}</h5>
             <h5 class="hid_data_stat">${element.productSold}</h5>
                 BUY NOW 
             </button>
         </div>
             `
  
             container.insertAdjacentHTML('beforeend',html)
        }
    }
    buttonHasBeenClicked()
    uploadPrice()
}

// 

function uploadImg(){
    if(productImg.length>0){
        var items=document.getElementsByClassName("auction_items")
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        var itemId=element.getElementsByClassName("hid")[0].textContent
        for (let j = 0; j < productImg.length; j++) {
            const elementTwo = productImg[j];
            if (elementTwo.productId === itemId) {
                var itemImg=element.getElementsByTagName("img")[0].src = elementTwo.imageUrl
              }
        }
    }
    }
}


function uploadPrice(){
    if(productPrice.length>0){
        var items=document.getElementsByClassName("auction_items")
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        var itemId=element.getElementsByClassName("hid")[0].textContent
        for (let j = 0; j < productPrice.length; j++) {
            const elementTwo = productPrice[j];
            if (elementTwo.productId === itemId) {
                element.querySelectorAll("span b")[0].textContent=`$ ${elementTwo.amount.toLocaleString()}`
              }else{
              }
        }
    }
    }else{
      }
}















    



function buttonHasBeenClicked(){
      var button= document.getElementsByClassName("auction_btn")
      for (let i = 0; i < button.length; i++) {
        const element = button[i];
          element.addEventListener("click",(e)=>{
            var btn=e.target
            // for (let j = 0; j < button.length; j++) {
            //     const elementTwo = button[j];
            //      elementTwo.parentElement.classList.remove("active_parent_to_button")
            //   }
            var parent=btn.parentElement
            parent.classList.add("active_parent_to_button")
            var id=btn.getElementsByClassName("hid")[0].textContent
            fetchData(id)
          })
      }
}




function fetchData(id){
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
           console.log(carPrice);

            popUp(data,dataImg,carDetails,garageDetails,carPrice,id)

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




 
function popUp(carData,carImg,carDetails,garageDetails,carPrice,id){
    document.getElementsByClassName("loading_data")[0].classList.add("loading_data_remove")
    var button= document.getElementsByClassName("auction_btn")
    for (let i = 0; i < button.length; i++) {
      const element = button[i];
       element.parentElement.classList.remove("active_parent_to_button")    
    }
      document.getElementsByClassName("popup")[0].classList.add("see_popup")
      
      document.getElementsByClassName("popup")[0].innerHTML=`
      <section class="popitem_auction_room">
      <h2>
          <img src="../assets/image/arrow-left.png" alt="">
          back
      </h2>
      <br>
      <h1>
      ${carData.productName} 
      </h1>
     <span>
      <span>
          <img src="../assets/image/arro.png" alt="">
            <b>
              $ ${carPrice.length === 0? carData.price.toLocaleString() : carPrice[0].amount.toLocaleString()}
            </b>
      </span>
      recent bid
     </span> 
     <p>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
          <path opacity="0.4" d="M17.5 6.7C16.45 2.08 12.42 0 8.87998 0C8.87998 0 8.87998 0 8.86998 0C5.33998 0 1.29998 2.07 0.249978 6.69C-0.920022 11.85 2.23998 16.22 5.09998 18.97C6.15998 19.99 7.51998 20.5 8.87998 20.5C10.24 20.5 11.6 19.99 12.65 18.97C15.51 16.22 18.67 11.86 17.5 6.7Z" fill="#A7A7A7"/>
          <path d="M8.87949 11.71C10.6192 11.71 12.0295 10.2997 12.0295 8.55997C12.0295 6.82028 10.6192 5.40997 8.87949 5.40997C7.13979 5.40997 5.72949 6.82028 5.72949 8.55997C5.72949 10.2997 7.13979 11.71 8.87949 11.71Z" fill="white"/>
        </svg>
        ${carData.location} 
     </p>
     
     <img src="${carImg.imageUrl}" alt="" class="${carData.qualification === "As-Is Condition (Major Repairs)" ?  "red" : carData.qualification === " Minor Repairs Required" ? "yellow" :"green"}">
     <h3>
      description
     </h3>
     <p class="min_h110">
     ${carData.description}     </p>
     <nav>
         <button class="active detail_btn">other details </button>
         <button class=" detail_btn">garage details</button>
         <button class=" detail_btn">category</button>
     </nav>
     <div class="info">
      <ul class="detail_list">
        
      </ul>
     </div>
     <label class="auction_box">
     <h6 class=" alate_box  pop_al">

     </h6>
      YOUR BID
      <h2 style="color: #000; font-weight: 500;">
      $ ${carPrice.length === 0? carData.price.toLocaleString() : carPrice[0].amount.toLocaleString()}
      </h2>
        <button class="bid_but_arc">
        buy now
        </button>
     </label>
  </section>
      `
      document.querySelector(".popitem_auction_room h2").addEventListener("click",()=>{
        document.getElementsByClassName("popup")[0].classList.remove("see_popup")
    })



    document.getElementsByClassName("detail_list")[0].innerHTML=""
    for (let k = 0; k < carDetails.length; k++) {
        const element = carDetails[k];
        var container=document.getElementsByClassName("detail_list")[0]
        var html=`
        <li>
        <h4>
            ${element.detailTitle}
        </h4>

        <h5>
        ${element.detailsInformation}
        </h5>
       </li>
        `
        container.insertAdjacentHTML('beforeend',html)
    }





    var DetailBtn=document.getElementsByClassName("detail_btn")
    for (let i = 0; i < DetailBtn.length; i++) {
        const element = DetailBtn[i];
        element.addEventListener("click",(e)=>{
            var btn=e.target
            for (let j = 0; j < DetailBtn.length; j++) {
                const element = DetailBtn[j];
                element.classList.remove("active")
            }
            btn.classList.add("active")
            var innerTest=btn.textContent

            if (btn === DetailBtn[0]){
                document.getElementsByClassName("detail_list")[0].innerHTML=""
                for (let k = 0; k < carDetails.length; k++) {
                    const element = carDetails[k];
                    var container=document.getElementsByClassName("detail_list")[0]
                    var html=`
                    <li>
                    <h4>
                        ${element.detailTitle}
                    </h4>
      
                    <h5>
                    ${element.detailsInformation}
                    </h5>
                   </li>
                    `
                    container.insertAdjacentHTML('beforeend',html)
                }
            }
            if(innerTest === "garage details"){
                document.getElementsByClassName("detail_list")[0].innerHTML=""
                for (let k = 0; k < garageDetails.length; k++) {
                    const element = garageDetails[k];
                    var container=document.getElementsByClassName("detail_list")[0]
                    var html=`
                    <li>
                    <h4>
                        ${element.detailTitle}
                    </h4>
      
                    <h5>
                    ${element.detailsInformation}
                    </h5>
                   </li>
                    `
                    container.insertAdjacentHTML('beforeend',html)
                }
            }
            if(innerTest === "category"){
                if(carData.qualification === "As-Is Condition (Major Repairs)"){
                    console.log(1);
                    document.getElementsByClassName("detail_list")[0].innerHTML=`
                    <li>
                    <h4>
                         qualification
                    </h4>
      
                    <h5>
                         As-Is Condition (Major Repairs)
                    </h5>
                    </li>
                    <p>
                    Details
                    </p>
                    <p>
                    Description: The vehicle is sold in its current condition without any warranty. It may require additional repairs, and the estimated cost of repairs is expected to be above $1000
                    </p>
                    `
                }
                if(carData.qualification === " Minor Repairs Required"){
                    console.log(1);
                    document.getElementsByClassName("detail_list")[0].innerHTML=`
                    <li>
                    <h4>
                         qualification
                    </h4>
      
                    <h5>
                        Minor Repairs Required
                    </h5>
                    </li>
                    <p>
                    Details
                    </p>
                    <p>
                    Description: This vehicle would require repairs, but the estimated cost of repairs is $1000 or less. It indicates that some work is needed, but the required repairs are relatively minor.
                    </p>
                    `
                }
                if(carData.qualification === "Certified or Minimal Repairs Required"){
                    console.log(1);
                    document.getElementsByClassName("detail_list")[0].innerHTML=`
                    <li>
                    <h4>
                         qualification
                    </h4>
      
                    <h5>
                    Certified or Minimal Repairs Required
                    </h5>
                    </li>
                    <p>
                    Details
                    </p>
                    <p>
                    Description: This vehicle is either certified or will require minimal repairs. The estimated cost of repairs is less than $500. It signifies that the vehicle is in good condition, and any necessary repairs are expected to be minor.
                    </p>
                    `
                }
                
            }
        })
    }


    var BidButton=document.getElementsByClassName("bid_but_arc")[0]

    BidButton.addEventListener("click",(e)=>{
        var btn=e.target
        var parent=btn.parentElement
        parent.classList.add("active_parent_to_button")
        
    })

}





























    const button = document.getElementsByClassName("img");

    for (let i = 0; i < button.length; i++) {
        const element = button[i];
        element.addEventListener("click", (e) => {
            var btn = e.target;
            var parent = btn.parentElement.getElementsByClassName("carosell_cotainer")[0];
            var parentWidth = parent.offsetWidth;
            
            if (btn === button[0] || btn === button[2]) {
                parent.scrollLeft -= parentWidth;
            } else {
                parent.scrollLeft += parentWidth;
            }
        });
    }
    
    











// document.getElementsByClassName("popup")[0].classList.add("see_popup")

