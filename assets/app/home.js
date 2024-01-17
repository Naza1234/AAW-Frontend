




var buttons =document.querySelectorAll(".quick_nav span")


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
   checkItems()
   itemsButtons()
   if(data){
       document.getElementsByClassName("loading_data")[0].classList.add("loading_data_remove")
   }else{
    window.location=window.location
   }
}
)
.catch((error) => {
console.error('Error:', error);
window.location=window.location
});



var productImg=[]
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
        if(element.category === "auction product "){
             var container=document.getElementsByClassName("carosell_items_cont")[0]
               
             var html=`
               
             <div class="item">
 
 
          
             <div class="top_cont">
               <img src="../assets/image/car.png" alt="">
               <div class="dit">
                   <h1>
                     ${element.productName}
                   </h1>
                   <h2>
                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
                           <path opacity="0.4" d="M17.6201 7.45C16.5701 2.83 12.5401 0.75 9.0001 0.75C9.0001 0.75 9.0001 0.75 8.9901 0.75C5.4601 0.75 1.4201 2.82 0.370095 7.44C-0.799905 12.6 2.3601 16.97 5.2201 19.72C6.2801 20.74 7.6401 21.25 9.0001 21.25C10.3601 21.25 11.7201 20.74 12.7701 19.72C15.6301 16.97 18.7901 12.61 17.6201 7.45Z" fill="#A7A7A7"/>
                           <path d="M9.0001 12.46C10.7398 12.46 12.1501 11.0497 12.1501 9.31C12.1501 7.5703 10.7398 6.16 9.0001 6.16C7.2604 6.16 5.8501 7.5703 5.8501 9.31C5.8501 11.0497 7.2604 12.46 9.0001 12.46Z" fill="white"/>
                         </svg>
                      ${element.location}
                   </h2>
                   
               </div>
             </div>

           <p> Description <br>
              ${element.description}
           </p>
          
           <h3>
                  .ends on:
               <b class="has_ended">${element.endDateTime}</b>
           </h3>
             <h3>
               <b>
                   price updates
               </b>
               <span>
               <h2>
               $ ${element.price.toLocaleString()}
               </h2>
               </span>
             </h3>
             <button>
             <h5 class="hid">${element._id}</h5>
             <h5 class="hid_data">${element.startingDateTime}</h5>
             <h5 class="hid_data_stat">${element.productSold}</h5>
              Bid now
             </button>
         </div>
             `
  
             container.insertAdjacentHTML('beforeend',html)
        }else{
            var container=document.getElementsByClassName("carosell_items_cont")[1]
             var html=`
             <div class="item">
 
 
 
             <div class="top_cont">
               <img src="../assets/image/car.png" alt="">
               <div class="dit">
                   <h1>
                   ${element.productName}
                   </h1>
                   <h2>
                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
                           <path opacity="0.4" d="M17.6201 7.45C16.5701 2.83 12.5401 0.75 9.0001 0.75C9.0001 0.75 9.0001 0.75 8.9901 0.75C5.4601 0.75 1.4201 2.82 0.370095 7.44C-0.799905 12.6 2.3601 16.97 5.2201 19.72C6.2801 20.74 7.6401 21.25 9.0001 21.25C10.3601 21.25 11.7201 20.74 12.7701 19.72C15.6301 16.97 18.7901 12.61 17.6201 7.45Z" fill="#A7A7A7"/>
                           <path d="M9.0001 12.46C10.7398 12.46 12.1501 11.0497 12.1501 9.31C12.1501 7.5703 10.7398 6.16 9.0001 6.16C7.2604 6.16 5.8501 7.5703 5.8501 9.31C5.8501 11.0497 7.2604 12.46 9.0001 12.46Z" fill="white"/>
                         </svg>
                         ${element.location}
                   </h2>
                   
               </div>
             </div>

           <p>
           Description <b>
           ${element.description}
           </p>
          
             <h3>
               <b>
                   price 
               </b>
               <span>
                   <h2>
                     $ ${element.price.toLocaleString()}
                   </h2>
               </span>
              </h3>
              <button>
              <h5 class="hid">${element._id}</h5>
              <h5 class="hid_data_stat">${element.productSold}</h5>
               purchase now
              </button>
         </div>
             `

            container.insertAdjacentHTML('beforeend',html)
        }
    }
    checkItems()
    uploadPrice()
}


function uploadImg(){
    if(productImg.length>0){
        var items=document.getElementsByClassName("item")
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
        var items=document.getElementsByClassName("item")
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        var itemId=element.getElementsByClassName("hid")[0].textContent
        for (let j = 0; j < productPrice.length; j++) {
            const elementTwo = productPrice[j];
            if (elementTwo.productId === itemId) {
                element.querySelectorAll("span h2")[0].textContent=`$ ${elementTwo.amount.toLocaleString()}`
              }else{
              }
        }
    }
    }else{
      }
}






    buttons[0].addEventListener("click",()=>{
     document.getElementsByClassName("quick_nav")[0].classList.add("active")
     document.getElementsByClassName("quick_nav")[0].classList.remove("explore")
     var items=document.querySelectorAll(".Btn_items .item")
     for (let i = 0; i < items.length; i++) {
         const element = items[i];
         var itemStartDate=element.getElementsByClassName("hid_data")[0].textContent
         var itemEndDate=element.getElementsByClassName("has_ended")[0].textContent
         if (itemStartDate < formattedDateTime && itemEndDate > formattedDateTime) {
            element.classList.remove("hid")
         }else{
            element.classList.add("hid")
         }
     }
    })
    buttons[1].addEventListener("click",()=>{
        document.getElementsByClassName("quick_nav")[0].classList.remove("active")
     document.getElementsByClassName("quick_nav")[0].classList.add("explore")
     var items=document.querySelectorAll(".Btn_items .item")
     for (let i = 0; i < items.length; i++) {
         const element = items[i];
         var itemStartDate=element.getElementsByClassName("hid_data")[0].textContent
         var itemEndDate=element.getElementsByClassName("has_ended")[0].textContent
         if (itemStartDate > formattedDateTime && itemEndDate > formattedDateTime) {
            element.classList.remove("hid")
         }else{
            element.classList.add("hid")
         }
     }
    })





    function checkItems(){
        var items=document.querySelectorAll(".Btn_items .item")
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            var itemStartDate=element.getElementsByClassName("hid_data")[0].textContent
            var itemEndDate=element.getElementsByClassName("has_ended")[0].textContent
            if (itemStartDate < formattedDateTime && itemEndDate > formattedDateTime) {
               element.classList.remove("hid")
            }else{
               element.classList.add("hid")
            }
        }
        var itemsTwo=document.querySelectorAll(".item")
        for (let i = 0; i < itemsTwo.length; i++) {
            const element = itemsTwo[i];
            var itemStat=element.getElementsByClassName("hid_data_stat")[0].textContent
            if (itemStat === "true") {
                element.classList.add("hid")
            }
        }
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





function itemsButtons(){
    const items=document.getElementsByClassName("Btn_items")[0].getElementsByTagName("button")
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        element.addEventListener("click",(e)=>{
         var but= e.target
         var id=but.getElementsByClassName("hid")[0].textContent
         window.location=`${winUrl}/pages/Auction_house.html?r=${id}`
        })
    }

    const itemstwo=document.getElementsByClassName("Btn_items_then")[0].getElementsByTagName("button")
    for (let i = 0; i < itemstwo.length; i++) {
        const element = itemstwo[i];
        element.addEventListener("click",(e)=>{
         var but= e.target
         var id=but.getElementsByClassName("hid")[0].textContent
         window.location=`${winUrl}/pages/buy_now.html?r=${id}`
        })
    }
}