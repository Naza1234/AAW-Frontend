var UserData




fetch(`${apiUrl}/user/users/${UserId}`)
.then((response) => {
return response.json();
})
.then((data) => {
  UserData=data
  updateBalance()
  document.getElementsByClassName("loading_data")[0].classList.add("loading_data_remove")
  if (document.getElementsByClassName("link_nav")[0].getElementsByTagName("a")[5]) {
    document.getElementsByClassName("link_nav")[0].getElementsByTagName("a")[5].getElementsByTagName("li")[0].classList.add("active")
}

})
.catch((error) => {
console.error('Error:', error);
});


fetch(`${apiUrl}/withdrawal/withdrawals`)
.then((response) => {
return response.json();
})
.then((data) => {

  chashOut(data)
}
)
.catch((error) => {
console.error('Error:', error);
});



function chashOut(data){
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    var container=document.getElementsByClassName("cash_out_body")[0]
               
    var html=`
    <div class="elements ${element.Processed ? "approved" : element.Declied ? "decliened" :""}">
    <div class="flex_it">   
    <span>
        <h1>
            <b>ACC Name</b>
            ${element.accountName}
        </h1>
        <h1>
            <b>Amount</b>
            $ ${element.amount.toLocaleString()}
        </h1>
        </span>
       
        <span>
            <p>${element.createdAt}</p>
            <button class="button">
                see full
            </button>
        </span>
    </div>

    <div class="flex_it hid">   
    <span>
        <h1>
            <b>ACC Name</b>
            ${element.accountName}
        </h1>
        <h1>
            <b>Amount</b>
            $ ${element.amount.toLocaleString()}
        </h1>
        <h1 class="balance">
           
        </h1>

        <div class="buttons">
            <button class="decline">
            <h5 class="hid">${element._id}</h5>
                decline
            </button>
            <button class="approve">
            <h5 class="hid">${element._id}</h5>
                approve
            </button>
        </div>
        </span>
       
    </div>


 </div> 
    `

    container.insertAdjacentHTML('beforeend',html)
}




var button=document.getElementsByClassName("button")

for (let i = 0; i < button.length; i++) {
    const element = button[i];
    element.addEventListener("click",(e)=>{
        var but=e.target
        but.parentElement.parentElement.parentElement.getElementsByClassName("flex_it")[1].classList.toggle("hid")
    })
}



var decline=document.getElementsByClassName("decline")

for (let i = 0; i < decline.length; i++) {
    const element = decline[i];
    element.addEventListener("click",(e)=>{
        var but=e.target
        var id=but.getElementsByClassName("hid")[0].textContent



        const params={
            Declied:true,
            Processed:false,
        }
        console.log(params);
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
             body: JSON.stringify(params),
          };
      
          fetch(`${apiUrl}/withdrawal/withdrawals/${id}`, requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
         
          })
          .catch((error) => {
            // Handle any errors
            console.error('Error:', error);
          });




        })
}

var approve=document.getElementsByClassName("approve")

for (let i = 0; i < approve.length; i++) {
    const element = approve[i];
    element.addEventListener("click",(e)=>{
        var but=e.target
        var id=but.getElementsByClassName("hid")[0].textContent



        const params={
            Processed:true,
            Declied:false,
        }
     
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
             body: JSON.stringify(params),
          };
      
          fetch(`${apiUrl}/withdrawal/withdrawals/${id}`, requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
         
          })
          .catch((error) => {
            // Handle any errors
            console.error('Error:', error);
          });




        })
}





}








function updateBalance(){
    var balance=document.getElementsByClassName("balance")
    for (let i = 0; i < balance.length; i++) {
        const element = balance[i];
        element.innerHTML=`
        <b>User's account balance</b>
        $ ${UserData.UserAccountBalance.toLocaleString()}
        `
    }
}


