var productImg=[]


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
  
  
  fetch(`${apiUrl}/productImage/product-images-with-user-id/${UserId}`)
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


fetch(`${apiUrl}/withdrawal/withdrawals-with-user-id/${UserId}`)
.then((response) => {
return response.json();
})
.then((data) => {

  chashOut(data)
}
)
.catch((error) => {
console.error('Error:', error);
});











var auctionProducts=[]
var OneTimeSail=[]

function populateData(data){


//   {
//     "_id": "6713c87c33965c6fcb9376dd",
//     "userId": "6710e8e030b2ae2f97e4f28e",
//     "Make": "test 1",
//     "Model": "test 1",
//     "OdoMeter": 1234,
//     "Year": 1234,
//     "Location": "test 1",
//     "Qualification": "As-Is Condition (Major Repairs)",
//     "Category": "Auction Product",
//     "Price": 1324,
//     "Description": "test 1",
//     "startingDateTime": "2024-10-19 15:01",
//     "endDateTime": "2024-10-26 15:01",
//     "productApproved": false,
//     "productSold": false,
//     "productUserApproved": false,
//     "createdAt": "2024-10-19T14:55:56.940Z",
//     "updatedAt": "2024-10-19T14:55:56.940Z",
//     "__v": 0
// },


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
               <span>
               <h2 class="price">$ ${element.Price}</h2>
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
    
        document.querySelectorAll(".info h1")[1].innerHTML=`
        ${data.length}<b>/pro
        </b>
        `
        setTimeout(() => {

          var processedBalance =0
          var notProcessedBalance =0
    


        var items=document.querySelectorAll(".Btn_items .item")
          for (let i = 0; i < items.length; i++) {
              const element = items[i];
              var itemStartDate=element.getElementsByClassName("hid_data")[0].textContent
              if (itemStartDate === "Auction Product") {
                auctionProducts.push(element)
              }else{
                OneTimeSail.push(element)
              }
              var itemPriceStatDate=element.getElementsByClassName("hid_data")[1].textContent
              if (itemPriceStatDate === "true") {
                 processedBalance += parseFloat(element.getElementsByClassName("price")[0].textContent.replace(/[^\d.]/g, ''));
              }else{
                notProcessedBalance += parseFloat(element.getElementsByClassName("price")[0].textContent.replace(/[^\d.]/g, ''));
              }
          }
        document.querySelectorAll(".info_braek p")[0].innerHTML=`
        ${auctionProducts.length}<b>/pro
        </b>
        `
        document.querySelectorAll(".info_braek p")[1].innerHTML=`
        ${OneTimeSail.length}<b>/pro
        </b>
        `
   



        // cashin section population 

     
        
        document.querySelectorAll(".info_cash_in p")[1].innerHTML=`
        $ ${notProcessedBalance.toLocaleString()}
        `
        document.querySelectorAll(".info_cash_in p")[0].innerHTML=`
        $ ${processedBalance.toLocaleString()}
        `
        
        
        document.querySelectorAll(".info_cash_in h1")[1].innerHTML=`
        $${(notProcessedBalance+processedBalance).toLocaleString()}
        `








       }, 1000);
}
function chashOut(data){
         
  var processedCashOut =0
  var notProcessedCashOut =0
  



  for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.Processed) {
         processedCashOut += element.amount
      }else if(!element.Processed && !element.Declied){
        notProcessedCashOut += element.amount
      }
  }

document.querySelectorAll(".info_cash_out p")[1].innerHTML=`
$ ${notProcessedCashOut.toLocaleString()}
`
document.querySelectorAll(".info_cash_out p")[0].innerHTML=`
$ ${processedCashOut.toLocaleString()}
`


document.querySelectorAll(".info_cash_out h1")[1].innerHTML=`
 $ ${(notProcessedCashOut+processedCashOut).toLocaleString()}
`

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
              element.querySelectorAll("span h2")[0].textContent=`$ ${elementTwo.amount}`
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