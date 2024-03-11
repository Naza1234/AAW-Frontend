console.log("start");



document.getElementsByTagName("form")[0].addEventListener("submit",(e)=>{
    e.preventDefault()
    var heading = document.querySelector(".contact ul .active").textContent
    // console.log(heading);
    var inputs=document.getElementsByTagName("input")
    var message =document.getElementsByTagName("textarea")
    const params={
        name:inputs[1].value + " " + inputs[2].value,
        SubjectOfInquiry: inputs[4].value,
        MessageTo: heading,
        email: inputs[3].value,
        message:message[0].value
    }
 


    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
         body: JSON.stringify(params),
      };
 
  
      fetch(`${apiUrl}/contactUs/contactUs`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
         window.location.reload()
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
       
})


})
