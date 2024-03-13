// console.log("starts");

var nextButtons=document.getElementsByClassName("button")
var inputs=document.querySelectorAll("form input")
var  selects=document.querySelectorAll("form select")
// console.log(nextButtons,inputs);

var params={
    userId:"userId",
    Make : "Make",
    Model : "Model",
    OdoMeter :" OdoMeter",
    Year : "Year",
    Location :" Location",
    Qualification : "Qualification",
    Category : "Category",
    Price :" Price",
    Description :" Description",
    endDateTime : "",
    startingDateTime: "{}",
}

for (let j = 0; j < nextButtons.length; j++) {
    const element = nextButtons[j]
    element.addEventListener("click",(e)=>{
        var input=element.parentElement.getElementsByTagName("input")
        // console.log(j);
        var inputs=document.querySelectorAll("form input")
        var  selects=document.querySelectorAll("form select")
        if (element.parentElement.getElementsByTagName("input").length===0) {
            document.querySelectorAll(".list ul li")[j].classList.remove("active")
            document.querySelectorAll(".list ul li")[j+1].classList.add("active")
            nextButtons[j].parentElement.classList.add("hid")
            nextButtons[j+1].parentElement.classList.remove("hid")

            params={
                userId:UserId,
                Make : inputs[0].value,
                Model : inputs[1].value,
                OdoMeter :inputs[2].value,
                Year : inputs[3].value,
                Location :inputs[4].value,
                Qualification : selects[0].value,
                Category :selects[1].value,
                Price :inputs[5].value,
                Description :inputs[10].value,
                startingDateTime : inputs[11].value + "" + inputs[12].value,
                endDateTime:  inputs[13].value + "" + inputs[14].value,
            }
        
        }
        for (let i = 0; i < input.length; i++) {
            const element = input[i].value;
             
            if(element){
                document.querySelectorAll(".list ul li")[j].classList.remove("active")
                document.querySelectorAll(".list ul li")[j+1].classList.add("active")
                nextButtons[j].parentElement.classList.add("hid")
                nextButtons[j+1].parentElement.classList.remove("hid")
               
                params={
                    userId:UserId,
                    Make : inputs[0].value,
                    Model : inputs[1].value,
                    OdoMeter :inputs[2].value,
                    Year : inputs[3].value,
                    Location :inputs[4].value,
                    Qualification : selects[0].value,
                    Category :selects[1].value,
                    Price :inputs[5].value,
                    Description :inputs[10].value,
                    endDateTime : inputs[11].value + " " + inputs[12].value,
                    startingDateTime:  inputs[13].value + " " + inputs[14].value,
                }
            
            }else{

               
            }
            
        }
    })
}


var addButtons=document.getElementsByClassName("button_add")
var carDetails=[]
var garageDetails=[]
for (let i = 0; i < addButtons.length; i++) {
    const element = addButtons[i];
    element.addEventListener("click",()=>{

        var input =element.parentElement.getElementsByTagName("input")

        if (i === 0) {
            var params={
                productId:"",
                detailTitle:input[0].value,
                detailsInformation:input[1].value,
            }
            carDetails.push(params)
            populateDetails(carDetails,0)
        }else{
            var params={
                productId:"",
                detailTitle:input[0].value,
                detailsInformation:input[1].value,
            }
            garageDetails.push(params)
            populateDetails(garageDetails,1)
        }
        // console.log(carDetails,garageDetails);

    })
}


function populateDetails(arrayName,No){
  var container=document.querySelectorAll("div section ul")[No]
  document.querySelectorAll("div section ul")[No].innerHTML=""
  for (let i = 0; i < arrayName.length; i++) {
    const element = arrayName[i];
    var html=`
    <h2>
    <b>${element.detailTitle}: </b>
    ${element.detailsInformation}
    </h2>
    `
    container.insertAdjacentHTML("beforeend",html)
  }
}


var productImage=[]



document.getElementsByClassName("button_add_image")[0].addEventListener("click",(e)=>{
var btn = e.target
var input=btn.parentElement.getElementsByTagName("input")[0].files[0];



        // Clear the previously selected files if needed
if (productImage.length === 20) {
    productImage.pop(); // Remove the oldest file
}

// Add the new files to the selectedFiles array

    productImage.unshift(input); // Add to the beginning of the array
    

   
    updateImagePreviews()
})


function updateImagePreviews() {
    // const imagePreviews = document.getElementsByClassName('imagePreviews');
    const ImageContainer=document.getElementsByClassName("image_container")[0]
    ImageContainer.innerHTML=""

    for (let i = 0; i < productImage.length; i++) {
        if (i >= 20) {
            break; // Display up to 5 images only
        }
       
        const imageSrc = URL.createObjectURL(productImage[i]);
        var html=` <img src="${imageSrc}" alt="" >`
        ImageContainer.insertAdjacentHTML('beforeend',html)
    }
}






document.getElementsByTagName("form")[0].addEventListener("submit",(e)=>{
   e.preventDefault()
//   console.log(params);
//   console.log(carDetails);
//   console.log(garageDetails);
//   console.log(inputs[15].files[0]);
//   console.log(productImage);

document.getElementsByClassName("pop")[0].classList.remove("hid")
document.getElementsByClassName("pop")[0].innerHTML=`
<div class="dit">
    <div class="lds-facebook"><div></div><div></div><div></div></div>
    <h1>
        Adding product
    </h1>
</div>
`

  const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
     body: JSON.stringify(params),
  };
  var errorIs=false

  fetch(`${apiUrl}/products/products`, requestOptions)
  .then((response) => {
    if (response.status != 201) {
        errorIs=!errorIs
      // Handle the 400 Bad Request error
      console.error('Bad Request Error:', response);
    }
    return response.json();
  })
  .then((data) => {
    // Handle the response data here
     if (errorIs) {
        document.getElementsByClassName("pop")[0].innerHTML=`
        <div class="error">
        <h1>
            an error has occurred
        </h1>
        </div>
        `
        document.getElementsByClassName("pop")[0].classList.remove("hid")
        setTimeout(() => {
            document.getElementsByClassName("pop")[0].classList.add("hid")
            document.getElementsByClassName("pop")[0].innerHTML=`
            <div class="dit">
                <div class="lds-facebook"><div></div><div></div><div></div></div>
                <h1>
                    Adding product
                </h1>
            </div>
            `
            window.location=window.location
        }, 10000);
     }else{
   

        const formData= new FormData()
        formData.append("productId",data._id)
        formData.append("imageUrl",inputs[15].files[0])
        const requestOptionsOne = {
          method: 'POST',
           body: formData,
        };
        fetch(`${apiUrl}/productImage/product-images`, requestOptionsOne)
        .then((response) => {
          return response.json();
        })
        .then((data) => {  
        })
        .catch((error) => {
          // Handle any errors
          console.error('Error:', error);
        });




        for (let i = 0; i < carDetails.length; i++) {
            const element = carDetails[i];
             element.productId=data._id
         }
         
       
        const requestOptionsTwo = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
         body: JSON.stringify(carDetails),
        };
        fetch(`${apiUrl}/car-details/car-details`, requestOptionsTwo)
        .then((response) => {
          return response.json();
        })
        .then((data) => {  
        })
        .catch((error) => {
          // Handle any errors
          console.error('Error:', error);
        });




        for (let i = 0; i < garageDetails.length; i++) {
            const element = garageDetails[i];
             element.productId=data._id
         }
           
        const requestOptionsThree = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
           body: JSON.stringify(garageDetails),
          };
          fetch(`${apiUrl}/garage-details/garage-details`, requestOptionsThree)
          .then((response) => {
            return response.json();
          })
          .then((data) => {  
            addCarForm.getElementsByTagName("h6")[0].classList.add("okay")
            addCarForm.getElementsByTagName("h6")[0].innerHTML="product add successfully"
            addCarForm.classList.remove("active_parent_to_button")
            setTimeout(() => {
             addCarForm.getElementsByTagName("h6")[0].classList.remove("okay")
             addCarForm.getElementsByTagName("h6")[0].innerHTML = ""
            }, 10000);
          })
          .catch((error) => {
            // Handle any errors
            console.error('Error:', error);
          });






         for (let k = 0; k < productImage.length; k++) {
            const element = productImage[k];
            const formData= new FormData()
            formData.append("productId",data._id)
            formData.append("imageUrl",element)
            const requestOptionsOne = {
              method: 'POST',
               body: formData,
            };
            fetch(`${apiUrl}/OtherImage/OtherImage`, requestOptionsOne)
            .then((response) => {
              return response.json();
            })
            .then((data) => { 
                document.getElementsByClassName("pop")[0].classList.add("hid")
                document.getElementsByClassName("pop")[0].innerHTML=`
                <div class="dit">
                    <div class="lds-facebook"><div></div><div></div><div></div></div>
                    <h1>
                        Adding product
                    </h1>
                </div>
                ` 
            })
            .catch((error) => {
              // Handle any errors
              console.error('Error:', error);
            });
         }




     }
  })
  .catch((error) => {
    // Handle any errors
    console.error(error);
    document.getElementsByClassName("pop")[0].innerHTML=`
    <div class="error">
    <h1>
        an error has occurred
    </h1>
    </div>
    `
    document.getElementsByClassName("pop")[0].classList.remove("hid")
    setTimeout(() => {
        document.getElementsByClassName("pop")[0].classList.add("hid")
        document.getElementsByClassName("pop")[0].innerHTML=`
        <div class="dit">
            <div class="lds-facebook"><div></div><div></div><div></div></div>
            <h1>
                Adding product
            </h1>
        </div>
        `
        window.location=window.location
    }, 10000);
  });

    

})