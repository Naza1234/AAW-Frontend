const winUrl="https://autoauction.space"
const apiUrl="https://aawserver.onrender.com"
// const apiUrl="http://localhost:3000"





var signUpForm=document.getElementsByTagName("form")[0]

signUpForm.addEventListener("submit",(e)=>{
    e.preventDefault()

    signUpForm.getElementsByTagName("span")[0].classList.add("active_parent_to_button")

    var inputs=document.getElementsByTagName("input")
    console.log(inputs);
    const formData= new FormData()
      formData.append("name",inputs[0].value)
      formData.append("UserEmail",inputs[1].value)
      formData.append("mobile",inputs[2].value)
      formData.append("location",inputs[3].value)
      formData.append("password",inputs[5].value)
      formData.append("profileImage",inputs[4].files[0])
      const requestOptions = {
        method: 'POST',
         body: formData,
      };
      var errorIs=false
  
      fetch(`${apiUrl}/user/users/signUp`, requestOptions)
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
           signUpForm.getElementsByTagName("h6")[0].classList.add("error")
           signUpForm.getElementsByTagName("h6")[0].innerHTML=data.message
           signUpForm.getElementsByTagName("span")[0].classList.remove("active_parent_to_button")
           setTimeout(() => {
            signUpForm.getElementsByTagName("h6")[0].classList.remove("error")
            signUpForm.getElementsByTagName("h6")[0].innerHTML = ""
           }, 5000);
        }else{
            localStorage.setItem("AutoAuctionUserKey",data._id)
        var location= localStorage.getItem("AAWRedLink")
        if (location) {
          window.location=location
        }else{
          window.location=`${winUrl}/pages/sales lest.html`
        }
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
        signUpForm.getElementsByTagName("h6")[0].classList.add("error")
        signUpForm.getElementsByTagName("h6")[0].innerHTML = error
        signUpForm.getElementsByTagName("span")[0].classList.remove("active_parent_to_button")
        setTimeout(() => {
         signUpForm.getElementsByTagName("h6")[0].classList.remove("error")
         signUpForm.getElementsByTagName("h6")[0].innerHTML = ""
        }, 5000);
      });
})



