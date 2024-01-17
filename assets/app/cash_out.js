fetch(`${apiUrl}/withdrawal/withdrawals-with-user-id/${UserId}`)
.then((response) => {
return response.json();
})
.then((data) => {

  chashOut(data)
  document.getElementsByClassName("loading_data")[0].classList.add("loading_data_remove")
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
            
        </button>
    </span>

 </div> 
    `

    container.insertAdjacentHTML('beforeend',html)
}


}