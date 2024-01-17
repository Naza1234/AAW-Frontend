


var params={
    userId:UserId,
    amount:"",
    accountNumber:"",
    accountName:"",
    bankName:"",
}


var form=document.getElementsByClassName("cash_input")


form[0].getElementsByTagName("form")[0].addEventListener("submit",(e)=>{
    e.preventDefault()
    var input=form[0].getElementsByTagName("form")[0].getElementsByTagName("input")
    params={
        userId:UserId,
        amount:"",
        accountNumber:input[2].value,
        accountName:input[1].value,
        bankName:input[0].value,
    }
    form[0].classList.add("hid")
    form[1].classList.remove("hid")

})


form[1].getElementsByTagName("form")[0].addEventListener("submit",(e)=>{
    e.preventDefault()
    var input=form[1].getElementsByTagName("form")[0].getElementsByTagName("input")
    params.amount=parseInt(input[0].value)
    form[1].classList.add("hid")
    form[2].classList.remove("hid")
    console.log(params);
})



form[2].getElementsByTagName("form")[0].addEventListener("submit",(e)=>{
    e.preventDefault()
    form[2].classList.add("active_parent_to_button")
    var input=form[2].getElementsByTagName("form")[0].getElementsByTagName("input")
      
         const requestOptions = {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
             },
            body: JSON.stringify(params),
         };
         var errorIs=false
     
         fetch(`${apiUrl}/withdrawal/withdrawals/${input[0].value}`, requestOptions)
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
              form[2].getElementsByTagName("h6")[0].classList.add("error")
              form[2].getElementsByTagName("h6")[0].innerHTML=data.message
              form[2].classList.remove("active_parent_to_button")
              setTimeout(() => {
               form[2].getElementsByTagName("h6")[0].classList.remove("error")
               form[2].getElementsByTagName("h6")[0].innerHTML = ""
              }, 10000);
           }else{
            form[2].classList.add("hid")
            form[3].classList.remove("hid")
            form[3].getElementsByClassName("div1")[0].classList.add("main-container")
            setTimeout(() => {
               window.location=`${winUrl}/pages/shore_home.html`
               }, 10000);
           }
         })
         .catch((error) => {
           // Handle any errors
           console.error('Error:', error);
           form[2].getElementsByTagName("h6")[0].classList.add("error")
           form[2].getElementsByTagName("h6")[0].innerHTML = error
           form[2].classList.remove("active_parent_to_button")
           setTimeout(() => {
            form[2].getElementsByTagName("h6")[0].classList.remove("error")
            form[2].getElementsByTagName("h6")[0].innerHTML = ""
           }, 10000);
         });
})