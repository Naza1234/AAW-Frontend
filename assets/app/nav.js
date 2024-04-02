const winUrl="https://autoauction.space"
// const apiUrl="https://aawserver.onrender.com"
const apiUrl="http://localhost:3000"



function toggleNav(){
    document.getElementsByClassName("nav_it")[0].classList.toggle("see_it")
}

var item =document.getElementsByClassName("drop_down")

for (let i = 0; i < item.length; i++) {
    const element = item[i];
    element.addEventListener("click",(e)=>{
       var targetElement = e.target
       var item2=document.getElementsByClassName("drop_down")
       for (let i = 0; i < item2.length; i++) {
        const element = item2[i].getElementsByTagName("ul")[0].classList.remove("active");
        
       }
       element.getElementsByTagName("ul")[0].classList.add("active")
       setTimeout(() => {
        targetElement.getElementsByTagName("ul")[0].classList.remove("active")
       }, 2500);
    })
}

const UserId=localStorage.getItem("AutoAuctionUserKey")

console.log(UserId);

if (!UserId) {
    // window.location=`${winUrl}/pages/loging.html`
}else{
    fetch(`${apiUrl}/user/users/${UserId}`)
.then((response) => {
return response.json();
})
.then((data) => {
    
     
    document.getElementsByClassName("top_nav")[0].innerHTML=`
    <div class="logo">
    Auto Auction
</div>
<div class="search">
   <input type="text" placeholder="search for ur new car">
   <button>
       Search Inventory   
   </button>
</div>
<a href="./Winners.html">
<div class="my_account logs">
    <img src="${data.UserProfileImage}" alt="">
    <h1>
        ${data.UserName}
    </h1>
  </div>
</a>
    `



})
    


.catch((error) => {
console.error('Error:', error);
});

}

var logs= document.getElementsByClassName("logs")[0]


if (logs) {
    logs.addEventListener("click",()=>{
        localStorage.setItem("AAWRedLink",window.location)
    })
}

