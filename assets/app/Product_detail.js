const currentURL = window.location.search;
// get url params
 const searchParams= new URLSearchParams(currentURL)
 const itemId=searchParams.get("r")




fetchData(itemId)



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




            fetch(`${apiUrl}/conversations/get-conversations-by-product-id/${id}`)
            .then((response) => {
          return response.json();
          })
          .then((conversation) => {

           document.getElementsByClassName("loading_data")[0].classList.add("loading_data_remove")
            popUp(data,dataImg,carDetails,garageDetails,carPrice,id,conversation)

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


 
function popUp(carData,carImg,carDetails,garageDetails,carPrice,id,conversation){
  
     console.log(carPrice);
      document.getElementsByClassName("popup")[0].innerHTML=`
      <section class="popitem_auction_room">
      <h1>
      ${carData. Make + " " + carData. Model}
 
      </h1>
     <span>
      <span>
          <img src="../assets/image/arro.png" alt="">
            <b>
            $ ${carPrice.length === 0? carData.Price : carPrice[0].amount}
            </b>
      </span>
      recent bid
     </span> 

     <img src="${carImg.imageUrl}" alt="">
     <h3>
      description
     </h3>
     <p class="min_h110">
     ${carData.Description}     </p>
     <div class="nav_div_cont">
     <nav>
     <button class="active detail_btn">other details </button>
     <button class=" detail_btn">garage details</button>
     <button class=" detail_btn">category</button>
 </nav>
 <div class="info">
  <ul class="detail_list">
    
  </ul>
 </div>
 </div>
     <h3>
      Conversation
     </h3>
     <div class="info">
      <ul class="detail_list charting">
      
      </ul>
     </div>
     <label class="auction_box auction_box_chart">
     <h6 class=" alate_box  pop_al">

     </h6>
      <input type="text" placeholder="chart">
        <button class="bid_but_arc">
          bid
        </button>
     </label>
  </section>
      `
     



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
                if(carData.Qualification === "As-Is Condition (Major Repairs)"){
                    console.log(1);
                    document.getElementsByClassName("detail_list")[0].innerHTML=`
                    <li>
                    <h4>
                         Qualification
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
                if(carData.Qualification === " Minor Repairs Required"){
                    console.log(1);
                    document.getElementsByClassName("detail_list")[0].innerHTML=`
                    <li>
                    <h4>
                         Qualification
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
                if(carData.Qualification === "Certified or Minimal Repairs Required"){
                    console.log(1);
                    document.getElementsByClassName("detail_list")[0].innerHTML=`
                    <li>
                    <h4>
                         Qualification
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



    document.getElementsByClassName("charting")[0].innerHTML=""
    for (let k = 0; k < conversation.length; k++) {
        const element = conversation[k];
        var container=document.getElementsByClassName("charting")[0]
        var html=`
        <li class="${element.userId === UserId? "me" : ""}">
        ${element.message}
       </li>
        `
        container.insertAdjacentHTML('beforeend',html)
    }

    var BidButton=document.getElementsByClassName("bid_but_arc")[0]

    BidButton.addEventListener("click",(e)=>{
        var btn=e.target
        var parent=btn.parentElement
        parent.classList.add("active_parent_to_button")
        var input=parent.getElementsByTagName("input")[0].value 
        const params={
            userId: UserId,
            productId:id,
            message:input,
        }
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


   setInterval(() => {
    fetch(`${apiUrl}/conversations/get-conversations-by-product-id/${id}`)
    .then((response) => {
  return response.json();
  })
  .then((conversation) => {
      document.getElementsByClassName("charting")[0].innerHTML=""
      for (let k = 0; k < conversation.length; k++) {
          const element = conversation[k];
          var container=document.getElementsByClassName("charting")[0]
          var html=`
          <li class="${element.userId === UserId? "me" : ""}">
          ${element.message}
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


}

function populateChart(input,parent,id){
    fetch(`${apiUrl}/conversations/get-conversations-by-product-id/${id}`)
    .then((response) => {
  return response.json();
  })
  .then((conversation) => {

      parent.classList.remove("active_parent_to_button")
      input=parent.getElementsByTagName("input")[0].value=""
      document.getElementsByClassName("charting")[0].innerHTML=""
      for (let k = 0; k < conversation.length; k++) {
          const element = conversation[k];
          var container=document.getElementsByClassName("charting")[0]
          var html=`
          <li class="${element.userId === UserId? "me" : ""}">
          ${element.message}
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

fetch(`${apiUrl}/endAuction/endAuctions`).then(res => res.json())