


var changePasswordForm=document.getElementsByTagName("form")[0]



changePasswordForm.addEventListener("submit",(e)=>{
    e.preventDefault()

    changePasswordForm.classList.add("active_parent_to_button")

    var inputs=changePasswordForm.getElementsByTagName("input")
   const params={
    OldPassword:inputs[0].value,
    NewPassword:inputs[1].value
   }
    console.log(params);
    var errorIs=false
    const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if required (e.g., authentication headers)
        },
        body: JSON.stringify(params),
      };
    
      fetch(`${apiUrl}/user/users/changePasswordWithOldPassword/${UserId}`, requestOptions)
      .then((response) => {
        if (response.status != 200) {
            errorIs=!errorIs
          // Handle the 400 Bad Request error
          console.error('Bad Request Error:', response);
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data here
        if (errorIs) {
           changePasswordForm.getElementsByTagName("h6")[0].classList.add("error")
           changePasswordForm.getElementsByTagName("h6")[0].innerHTML=data.message
           changePasswordForm.classList.remove("active_parent_to_button")
           setTimeout(() => {
            changePasswordForm.getElementsByTagName("h6")[0].classList.remove("error")
            changePasswordForm.getElementsByTagName("h6")[0].innerHTML = ""
           }, 10000);
        }else{
          changePasswordForm.getElementsByTagName("h6")[0].classList.add("okay")
          changePasswordForm.getElementsByTagName("h6")[0].innerHTML=data.message
          changePasswordForm.classList.remove("active_parent_to_button")
          setTimeout(() => {
           changePasswordForm.getElementsByTagName("h6")[0].classList.remove("okay")
           changePasswordForm.getElementsByTagName("h6")[0].innerHTML = ""
          }, 10000);
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
        changePasswordForm.getElementsByTagName("h6")[0].classList.add("error")
        changePasswordForm.getElementsByTagName("h6")[0].innerHTML = error
        changePasswordForm.classList.remove("active_parent_to_button")
        setTimeout(() => {
         changePasswordForm.getElementsByTagName("h6")[0].classList.remove("error")
         changePasswordForm.getElementsByTagName("h6")[0].innerHTML = ""
        }, 10000);
      });
})