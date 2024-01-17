var addCarForm=document.getElementsByTagName("form")[0]



const detailsBtn=document.getElementsByClassName("click")
     
const generalDetails=[]
const garageDetails=[]


for (let i = 0; i < detailsBtn.length; i++) {
    const element = detailsBtn[i];
    element.addEventListener("click",(e)=>{
     var btn=e.target
     var parentElement=btn.parentElement
     var input=parentElement.getElementsByTagName("input")
        if(element===detailsBtn[0]){
            if (  input[0].value && input[1].value ) {  
                var params={
                 productId:"",
                 detailTitle:input[0].value,
                 detailsInformation:input[1].value
                }
                generalDetails.push(params)
                populateDiv(0)
            }
        }else{
            if (  input[0].value && input[1].value ) { 
                var params={
                    productId:"",
                    detailTitle:input[0].value,
                    detailsInformation:input[1].value
                   }
                   garageDetails.push(params)
                   populateDiv(1)
            }
        }
    })
}


function populateDiv(divNo){
    var container=document.getElementsByClassName("wrap")[divNo]
    container.innerHTML=""
    var html
    if (divNo===0) {
        for (let i = 0; i < generalDetails.length; i++) {
            const element = generalDetails[i];
            html=`
            <h1>
            <b>
                ${element.detailTitle}
            </b>
            <p>
                ${element.detailsInformation}
            </p>
            </h1>
            `
            container.insertAdjacentHTML('beforeend',html)
        }
    }else{
        for (let i = 0; i < garageDetails.length; i++) {
            const element = garageDetails[i];
            html=`
            <h1>
            <b>
                ${element.detailTitle}
            </b>
            <p>
                ${element.detailsInformation}
            </p>
            </h1>
            `
            container.insertAdjacentHTML('beforeend',html)
        }
    }
     
}



addCarForm.addEventListener("submit",(e)=>{
    e.preventDefault()

    addCarForm.classList.add("active_parent_to_button")

    var inputs=addCarForm.getElementsByTagName("input")
    var textArea=addCarForm.getElementsByTagName("textarea")
    var inputGeneral=addCarForm.querySelector('input[name="general"]:checked');
    var inputCategory=addCarForm.querySelector('input[name="category"]:checked');

    const params={
        userId:UserId,
        productName:inputs[0].value,
        price: inputs[1].value,
        location:inputs[2].value,
        qualification:inputGeneral.value,
        category:inputCategory.value,
        description:textArea[0].value,
        startingDateTime:inputs[13].value+" "+inputs[14].value,
        endDateTime:inputs[15].value+" "+inputs[16].value,
    }
   
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
           addCarForm.getElementsByTagName("h6")[0].classList.add("error")
           addCarForm.getElementsByTagName("h6")[0].innerHTML="something happened pleas add again"
           addCarForm.classList.remove("active_parent_to_button")
           setTimeout(() => {
            addCarForm.getElementsByTagName("h6")[0].classList.remove("error")
            addCarForm.getElementsByTagName("h6")[0].innerHTML = ""
           }, 10000);
        }else{
            const formData= new FormData()
            formData.append("productId",data._id)
            formData.append("imageUrl",inputs[6].files[0])
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

             for (let i = 0; i < generalDetails.length; i++) {
                const element = generalDetails[i];
                 element.productId=data._id
             }
             
           
            const requestOptionsTwo = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
             body: JSON.stringify(generalDetails),
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
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
        addCarForm.getElementsByTagName("h6")[0].classList.add("error")
        addCarForm.getElementsByTagName("h6")[0].innerHTML="something happened pleas add again"
        addCarForm.classList.remove("active_parent_to_button")
        setTimeout(() => {
         addCarForm.getElementsByTagName("h6")[0].classList.remove("error")
         addCarForm.getElementsByTagName("h6")[0].innerHTML = ""
        }, 10000);
      });
})
