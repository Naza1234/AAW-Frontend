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





    for (let i = 0; i < data.length; i++) {
        const element = data[i];
             var container=document.getElementsByClassName("carosell_items_cont")[0]
               
             var html=`
               
             <div class="item">
 
 
          
             <div class="top_cont">
               <img src="../assets/image/car.png" alt="">
               <div class="dit">
                   <h1>
                     ${element.productName}
                   </h1>
                   
               </div>
             </div>

           <p> Description <br>
              ${element.description}
           </p>
              ${element.category === "auction product " ?` <h3>.ends on:<b class="has_ended">${element.endDateTime}</b></h3>`: "" }
              <h3>solid:<b class="has_ended">${element.productSold}</b></h3>
             <h3>
               <b>
                   price updates
               </b>
               <span>
               <h2 class="price">$ ${element.price.toLocaleString()}</h2>
               </span>
             </h3>
             <button class="item_button">
             <h5 class="hid">${element._id}</h5>
             <h5 class="hid_data">${element.category}</h5>
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
          var chas_out=parseFloat(document.getElementsByClassName("cash_out_amount")[0].textContent.replace(/[^\d.]/g, ''));


        var items=document.querySelectorAll(".Btn_items .item")
          for (let i = 0; i < items.length; i++) {
              const element = items[i];
              var itemStartDate=element.getElementsByClassName("hid_data")[0].textContent
              if (itemStartDate === "auction product ") {
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

         const UserParams={
          UserAccountBalance:processedBalance-chas_out
         }


         
         const requestOptions = {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
            },
           body: JSON.stringify(UserParams),
        };
    
        fetch(`${apiUrl}/user/users/${UserId}`, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
        console.log(data);
        })
        .catch((error) => {
          // Handle any errors
          console.error('Error:', error);
        });










       }, 1000);
}
function chashOut(data){
         
  var processedCashOut =0
  var notProcessedCashOut =0
  



  for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.Processed === "true") {
         processedCashOut += element.amount
      }else{
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
      if (itemStartDate === "auction product ") {
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
      if (itemStartDate === "auction product ") {
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
      if (itemStartDate === "auction product ") {
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



