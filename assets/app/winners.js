


var productImg=[]


fetch(`${apiUrl}/products/won-products-with-user-id/${UserId}`)
.then((response) => {
return response.json();
})
.then((data) => {




  
fetch(`${apiUrl}/user/users/${UserId}`)
.then((response) => {
return response.json();
})
.then((UserData) => {

    
    populateData(data,UserData)
    document.getElementsByClassName("loading_data")[0].classList.add("loading_data_remove")


}
)
.catch((error) => {
console.error('Error:', error);
});



 

fetch(`${apiUrl}/productImage/won-product-images-with-user-id/${UserId}`)
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










 







function populateData(data,userData){
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        



             var container=document.getElementsByClassName("winners")[0]
               
             var html=`

             <div class="winners_items">
             <img src="../assets/image/car.png" alt="">
             <div class="dit">
                 <img src="${userData.UserProfileImage}" alt="" class="profile_img">
                 <h1>
                     CONGRATULATIONS
                 </h1>
                 <h2>
                     ${userData.UserName}
                 </h2>
                 <h3>
                     Winner of
                     <b>
                        ${element.Model}
                     </b>

                 </h3>
                 <h5>
                 ${element.endDateTime}
                 </h5>
                 
                     <ul>
                         <li class="me">
                             <h1>
                                 1. ${userData.UserName}
                             </h1>
                             <h2>
                                 $ ${element.Price.toLocaleString()}
                             </h2>
                         </li>
                         <li style="justify-content: center;">
                             <h1 >
                                delivery
                             </h1>
                         </li>
                         <li style="justify-content: center;">
                             <h1>
                                 pre-inspection
                             </h1>
                             
                         </li>
                     </ul>
                
             </div>

             <div class="proceed">
                 <h1>
                     congratulations 
                 </h1>
                 <button class="auction_btn">
                 <h5 class="hid">${element._id}</h5>
                 <h5 class="hid_data">${element.category}</h5>
                     click here to proceed 
                 </button>
             </div>
         </div>


             `
             
             
             container.insertAdjacentHTML('beforeend',html)

    }


    var items=document.querySelectorAll(".winners_items")
     for (let i = 0; i < items.length; i++) {
         const element = items[i];
         var itemCart=element.getElementsByClassName("hid_data")[0].textContent
         if (itemCart === "auction product ") {
            element.classList.remove("hid")
         }else{
            element.classList.add("hid")
         }
     }

    chart()

    uploadImg()
}





function uploadImg(){
    if(productImg.length>0){
        var items=document.getElementsByClassName("winners_items")
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





function chart(){
    var but=document.getElementsByClassName("auction_btn")

    for (let i = 0; i < but.length; i++) {
        const element = but[i];
        element.addEventListener("click",(e)=>{
            var btn=e.target
            var parent=btn.parentElement
            parent.classList.add("active_parent_to_button")

            var id=btn.getElementsByClassName("hid")[0].textContent



        
          


            fetch(`${apiUrl}/conversations/get-conversations-by-product-id/${id}`)
            .then((response) => {
          return response.json();
          })
          .then((conversation) => {
        
            populateConversation(conversation,id)  
            parent.classList.remove("active_parent_to_button")

          }
          )
        
        
          .catch((error) => {
          console.error('Error:', error);
          });
        
        })





    }
}




function populateConversation(conversation,id){

    
setTimeout(() => {
    fetch(`${apiUrl}/conversations/get-conversations-by-product-id/${id}`)
    .then((response) => {
  return response.json();
  })
  .then((conversation) => {
    
      parent.classList.remove("active_parent_to_button")
      input=parent.getElementsByTagName("input")[0].value=""
      document.getElementsByClassName("win_cart")[0].innerHTML=""
      for (let k = 0; k < conversation.length; k++) {
          const element = conversation[k];
          var container=document.getElementsByClassName("win_cart")[0]
          var html=`
          <li class="${element.userId === UserId? "me" : ""}">
          <h3>
          ${element.message}
          </h3>
         </li>
          `
          container.insertAdjacentHTML('beforeend',html)
      }
  }
  )


  .catch((error) => {
  console.error('Error:', error);
  });


}, 10000);





document.getElementsByClassName("popup")[0].classList.add("see_popup")

document.querySelector(".popup_for_clear_payment h2").addEventListener("click",()=>{
    document.getElementsByClassName("popup")[0].classList.remove("see_popup")
})

document.getElementsByClassName("win_cart")[0].innerHTML=""
for (let k = 0; k < conversation.length; k++) {
    const element = conversation[k];
    var container=document.getElementsByClassName("win_cart")[0]
    var html=`
    <li class="${element.userId === UserId? "me" : ""}">
    <h3>
    ${element.message}
    </h3>
   </li>
    `
    container.insertAdjacentHTML('beforeend',html)
}













var BidButton=document.getElementsByClassName("send_text")[0]

BidButton.addEventListener("click",(e)=>{
    var btn=e.target
    var parent=btn.parentElement
    parent.classList.add("active_parent_to_button")
    console.log(parent);
    var input=parent.getElementsByTagName("input")[0].value 
    const params={
        userId: UserId,
        productId:id,
        message:input,
    }
    console.log(params);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
         body: JSON.stringify(params),
      };
  
      fetch(`${apiUrl}/conversations`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        populateChart(input,parent,id)
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      });



})

function populateChart(input,parent,id){
    fetch(`${apiUrl}/conversations/get-conversations-by-product-id/${id}`)
    .then((response) => {
  return response.json();
  })
  .then((conversation) => {
    
      parent.classList.remove("active_parent_to_button")
      input=parent.getElementsByTagName("input")[0].value=""
      document.getElementsByClassName("win_cart")[0].innerHTML=""
      for (let k = 0; k < conversation.length; k++) {
          const element = conversation[k];
          var container=document.getElementsByClassName("win_cart")[0]
          var html=`
          <li class="${element.userId === UserId? "me" : ""}">
          <h3>
          ${element.message}
          </h3>
         </li>
          `
          container.insertAdjacentHTML('beforeend',html)
      }
  }
  )


  .catch((error) => {
  console.error('Error:', error);
  });



}
















}
























var buttons =document.querySelectorAll(".quick_nav span")


    buttons[0].addEventListener("click",()=>{
     document.getElementsByClassName("quick_nav")[0].classList.add("active")
     document.getElementsByClassName("quick_nav")[0].classList.remove("explore")
     var items=document.querySelectorAll(".winners_items")
     for (let i = 0; i < items.length; i++) {
         const element = items[i];
         var itemCart=element.getElementsByClassName("hid_data")[0].textContent
         if (itemCart === "auction product ") {
            element.classList.remove("hid")
         }else{
            element.classList.add("hid")
         }
     }
    })
    buttons[1].addEventListener("click",()=>{
        document.getElementsByClassName("quick_nav")[0].classList.remove("active")
     document.getElementsByClassName("quick_nav")[0].classList.add("explore")
     var items=document.querySelectorAll(".winners_items")
     for (let i = 0; i < items.length; i++) {
         const element = items[i];
         var itemCart=element.getElementsByClassName("hid_data")[0].textContent
         if (itemCart === "auction product ") {
            element.classList.add("hid")
         }else{
            element.classList.remove("hid")
         }
     }
    })










    
















var popBtn=document.querySelectorAll(".auction_btn")

for (let i = 0; i < popBtn.length; i++) {
    const element = popBtn[i];
    element.addEventListener("click",()=>{
    })
    
}