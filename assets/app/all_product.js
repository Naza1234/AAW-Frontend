


const currentDate = new Date();
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
const day = currentDate.getDate().toString().padStart(2, '0');

const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;


fetch(`${apiUrl}/user/users/${UserId}`)
.then((response) => {
return response.json();
})
.then((data) => {

    

 


}
)
.catch((error) => {
console.error('Error:', error);
});



var productPrice=[]


fetch(`${apiUrl}/products/products-with-user-id/${UserId}`)
.then((response) => {
return response.json();
})
.then((dataOne) => {


    
  fetch(`${apiUrl}/auction`)
  .then((response) => {
  return response.json();
  })
  .then((data) => {
     productPrice=data
     populateData(dataOne)
     uploadPrice()
     checkItems()
     itemsButtons()
     document.getElementsByClassName("loading_data")[0].classList.add("loading_data_remove")
     
  }
  )
  .catch((error) => {
  console.error('Error:', error);
  });
  
  
   

}
)
.catch((error) => {
console.error('Error:', error);
// window.location=window.location
});












var productImg=[]
fetch(`${apiUrl}/productImage/product-images-with-user-id/${UserId}`)
.then((response) => {
return response.json();
})
.then((data) => {
   productImg=data
   uploadImg()
   uploadImgTwo()
}
)
.catch((error) => {
console.error('Error:', error);
});


var auctionProducts=[]
var OneTimeSail=[]

function populateData(data){
    document.getElementsByClassName("loading_data")[0].classList.add("loading_data_remove")

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
             var container=document.getElementsByClassName("carosell_items_cont")[0]
               
             var html=`
               
             <div class="item">
 
 
          
             <div class="top_cont">
               <img src="../assets/image/car.png" alt="">
               <div class="dit">
                   <h1>
                    ${element. Make + " " + element. Model}
                   </h1>
                   
               </div>
             </div>

           <p> Description <br>
              ${element.Description}
           </p>
              ${element.Category === "Auction Product" ?` <h3>.ends on:<b class="has_ended">${element.endDateTime}</b></h3>`: "" }
              <h3>solid:<b class="has_ended">${element.productSold}</b></h3>
             <h3>
               <b>
                   price updates
               </b>
               <span
                <h2 class="price"> $ ${element.Price.toLocaleString()}</h2>
               </span>
             </h3>
             <button class="item_button">
             <h5 class="hid">${element._id}</h5>
             <h5 class="hid_data">${element.Category}</h5>
             <h5 class="hid_data">${element.productUserApproved}</h5>
              details
             </button>
         </div>
             `
  
             container.insertAdjacentHTML('beforeend',html)
        }
    

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






function checkItems(){
  var items=document.querySelectorAll(".Btn_items .item")
  for (let i = 0; i < items.length; i++) {
      const element = items[i];
      var itemStartDate=element.getElementsByClassName("hid_data")[0].textContent
      if (itemStartDate === "Auction Product") {
         element.classList.remove("hid")
      }else{
         element.classList.add("hid")
      }
  }
}



 

var buttons =document.querySelectorAll(".quick_nav span")


    buttons[0].addEventListener("click",()=>{
     document.getElementsByClassName("quick_nav")[0].classList.add("active")
     document.getElementsByClassName("quick_nav")[0].classList.remove("explore")
     var items=document.querySelectorAll(".Btn_items .item")
  for (let i = 0; i < items.length; i++) {
      const element = items[i];
      var itemStartDate=element.getElementsByClassName("hid_data")[0].textContent
      if (itemStartDate === "Auction Product") {
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
      if (itemStartDate === "Auction Product") {
         element.classList.add("hid")
      }else{
         element.classList.remove("hid")
      }
  }
    })


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
    
    







    // for the second section of the page 





    fetch(`${apiUrl}/products/products-with-auction-price-using-user-id/${UserId}`)
.then((response) => {
return response.json();
})
.then((data) => {
    populateSumProductData(data)
    document.getElementsByClassName("loading_data")[1].classList.add("loading_data_remove")
   
}
)
.catch((error) => {
console.error('Error:', error);
// window.location=window.location
});




function populateSumProductData(data){
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
             var container=document.getElementsByClassName("products")[0]
               
             var html=`
             <li class="other_items">
             <span>
                <img src="../assets/image/car.png" alt=""> 
                ${element. Make + " " + element. Model}
             </span>
             <span>
             $ ${element.Price.toLocaleString()}
             </span>
             
             <span>
                 ${element.Category != "Auction Product" ? "One time sail" : element.endDateTime < formattedDateTime ? "AuctionEnded" : element.startingDateTime > formattedDateTime? "Yet To Stat" : "In Progress" }
             </span>
             <span class="next-page-btn">
             <h5 class="hid_data">${element.productSold}</h5>
             <h5 class="hid">${element._id}</h5>
                <a href="${winUrl}/pages/Product_Detail.html?r=${element._id}">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                     <path d="M17.5 7.5V2.5H12.5" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                     <path d="M2.5 12.5V17.5H7.5" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                     <path d="M17.5 2.5L11.25 8.75" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                     <path d="M8.75 11.25L2.5 17.5" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
                </a>
             </span>
         </li>
             `
  
             container.insertAdjacentHTML('beforeend',html)
        }


        var items=document.querySelectorAll(".other_items")
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            var itemStartDate=element.getElementsByClassName("hid_data")[0].textContent
            if (itemStartDate === "false") {
               element.classList.remove("hid")
            }else{
               element.classList.add("hid")
            }
        }






        
}
 
var buttonsTwo =document.querySelectorAll(".top_nav li")


   buttonsTwo[0].addEventListener("click",()=>{
    document.querySelectorAll(".top_nav li")[0].classList.add("active")
    document.querySelectorAll(".top_nav li")[1].classList.remove("active")
    var items=document.querySelectorAll(".other_items")
 for (let i = 0; i < items.length; i++) {
     const element = items[i];
     var itemStartDate=element.getElementsByClassName("hid_data")[0].textContent
     if (itemStartDate === "false") {
        element.classList.remove("hid")
     }else{
        element.classList.add("hid")
     }
 }
   })
   buttonsTwo[1].addEventListener("click",()=>{
    document.querySelectorAll(".top_nav li")[0].classList.remove("active")
    document.querySelectorAll(".top_nav li")[1].classList.add("active")
    var items=document.querySelectorAll(".other_items")
 for (let i = 0; i < items.length; i++) {
     const element = items[i];
     var itemStartDate=element.getElementsByClassName("hid_data")[0].textContent
     if (itemStartDate === "false") {
        element.classList.add("hid")
     }else{
        element.classList.remove("hid")
     }
 }
   })


   function uploadImgTwo(){
    if(productImg.length>0){
        var items=document.getElementsByClassName("other_items")
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



  function itemsButtons(){
    const items=document.getElementsByClassName("item_button")
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        element.addEventListener("click",(e)=>{
         var but= e.target
         var id=but.getElementsByClassName("hid")[0].textContent
         window.location=`${winUrl}/pages/Product_Detail.html?r=${id}`
        })
    }
}


fetch(`${apiUrl}/endAuction/endAuctions`).then(res => res.json())