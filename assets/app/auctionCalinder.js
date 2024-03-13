console.log("where in");


document.getElementsByTagName("form")[0].addEventListener("submit",(e)=>{
    e.preventDefault()
    var inputs=document.getElementsByTagName("form")[0].getElementsByTagName("input")
    // console.log(inputs);
    const params={
        startDate:inputs[0].value,
         endDate:inputs[1].value
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
         body: JSON.stringify(params),
      };
   
    
      fetch(`${apiUrl}/auction/auction-by-calender`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Handle the response data here
       console.log(data);
       for (let i = 0; i < data.length; i++) {
        const element = data[i];
        populateData(element)
       }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
    // console.log(params);
})








function populateData(element){
    var container=document.getElementsByClassName("product_listing")[0]
    var html=`
    <li>
    <h1 class="hid">${element._id}</h1>
    <span>
    ${element.startingDateTime}
    </span>
    <span>
    ${element.Model}
    </span>
    <span>
    ${element.Price}
    </span>
    <span>
    ${element.Price}
    </span>
    <span>
    ${element.Qualification}
    </span>
    <span class="book_mark">
        book mark
    </span>
   </li>
    `
    container.insertAdjacentHTML('beforeend',html)
}