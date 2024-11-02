const winUrl="https://autoauction.space"
const apiUrl="https://aawserver.onrender.com"
// const apiUrl="http://localhost:3000"



function toggleNav(){
    document.getElementsByClassName("nav_it")[0].classList.toggle("see_it")
}

var item =document.getElementsByClassName("drop_down")

for (let i = 0; i < item.length; i++) {
    const element = item[i];

    // Mouse enter to show the dropdown
    element.addEventListener("mouseenter", (e) => {
        var targetElement = e.target;

        // Remove 'active' class from all dropdowns
        var dropdowns = document.getElementsByClassName("drop_down");
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].getElementsByTagName("ul")[0].classList.remove("active");
        }

        // Add 'active' class to the current dropdown
        targetElement.getElementsByTagName("ul")[0].classList.add("active");
    });

    // Mouse leave to hide the dropdown
    element.addEventListener("mouseleave", (e) => {
        var targetElement = e.target;

        // Remove 'active' class when the mouse leaves the element
        setTimeout(() => {
            targetElement.getElementsByTagName("ul")[0].classList.remove("active");
        }, 2000);
    });
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
    
    if(data.UserName){
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
    }

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
let isFetching = false;

setInterval(() => {
  if (!isFetching) {
    isFetching = true; // Indicate that a request is in progress

    fetch(`${apiUrl}/endAuction/endAuctions`)
      .then(res => res.json())
      .then(data => {
        // Process the data as needed
      })
      .catch(error => {
        console.error("Error fetching auction data:", error);
      })
      .finally(() => {
        isFetching = false; // Reset to allow the next request
      });
  }
}, 5000);
