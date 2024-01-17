const winUrl="http://127.0.0.1:5502"
const apiUrl="http://localhost:3000"



var loginForm=document.getElementsByTagName("form")[0]



loginForm.addEventListener("submit",(e)=>{
    e.preventDefault()

    loginForm.getElementsByTagName("span")[0].classList.add("active_parent_to_button")

    var inputs=document.getElementsByTagName("input")
   const params={
     UserEmail:inputs[0].value,
    password:inputs[1].value
   }
  
   
      const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
         body: JSON.stringify(params),
      };
      var errorIs=false
  
      fetch(`${apiUrl}/user/users/login`, requestOptions)
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
           loginForm.getElementsByTagName("h6")[0].classList.add("error")
           loginForm.getElementsByTagName("h6")[0].innerHTML=data.message
           loginForm.getElementsByTagName("span")[0].classList.remove("active_parent_to_button")
           setTimeout(() => {
            loginForm.getElementsByTagName("h6")[0].classList.remove("error")
            loginForm.getElementsByTagName("h6")[0].innerHTML = ""
           }, 10000);
        }else{
            localStorage.setItem("AutoAuctionUserKey",data)
         window.location=`${winUrl}/pages/Home.html`
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
        loginForm.getElementsByTagName("h6")[0].classList.add("error")
        loginForm.getElementsByTagName("h6")[0].innerHTML = error
        loginForm.getElementsByTagName("span")[0].classList.remove("active_parent_to_button")
        setTimeout(() => {
         loginForm.getElementsByTagName("h6")[0].classList.remove("error")
         loginForm.getElementsByTagName("h6")[0].innerHTML = ""
        }, 10000);
      });
})