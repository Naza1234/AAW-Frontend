const winUrl="https://autoauction.space"
const apiUrl="https://aawserver.onrender.com"

// const apiUrl="http://localhost:3000"


var navTugBtn=document.getElementsByClassName("nav_tog")

for (let i = 0; i < navTugBtn.length; i++) {
    const element = navTugBtn[i];
    element.addEventListener("click",()=>{
        document.getElementsByClassName("main_nav")[0].classList.toggle("main_nav_come_out")
    })
}


const UserId=localStorage.getItem("AutoAuctionUserKey")


if (!UserId) {
    window.location=`${winUrl}/pages/loging.html`
}

document.getElementsByClassName("sub_nav")[0].getElementsByTagName("li")[3].addEventListener("click",()=>{
    logout()
})
function logout(){
    localStorage.removeItem("AutoAuctionUserKey")
    window.location=`${winUrl}/pages/loging.html`
}



const profile=document.getElementsByClassName("profile")[0]

fetch(`${apiUrl}/user/users/${UserId}`)
.then((response) => {
return response.json();
})
.then((data) => {
   if (data._id) {
    profile.getElementsByTagName("h1")[0].textContent=data.UserName
    profile.getElementsByTagName("p")[0].textContent=data.UserEmail
    profile.getElementsByTagName("img")[0].src=data.UserProfileImage
   }
   if (data.UserIsAdmin && !window.location.href.includes("pay_users.html")) {
    var container = document.getElementsByClassName("link_nav")[0];
  
    var html = `
      <a href="./pay_users.html"><li>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19.0015 15C16.7915 15 15.0015 16.79 15.0015 19C15.0015 19.75 15.2115 20.46 15.5815 21.06C16.2715 22.22 17.5415 23 19.0015 23C20.4615 23 21.7315 22.22 22.4215 21.06C22.7915 20.46 23.0015 19.75 23.0015 19C23.0015 16.79 21.2115 15 19.0015 15ZM21.0715 18.57L18.9415 20.54C18.8015 20.67 18.6115 20.74 18.4315 20.74C18.2415 20.74 18.0515 20.67 17.9015 20.52L16.9115 19.53C16.6215 19.24 16.6215 18.76 16.9115 18.47C17.2015 18.18 17.6815 18.18 17.9715 18.47L18.4515 18.95L20.0515 17.47C20.3515 17.19 20.8315 17.21 21.1115 17.51C21.3915 17.81 21.3715 18.28 21.0715 18.57Z" />
          <path d="M22.0015 7.55002V8.00002C22.0015 8.55002 21.5515 9.00002 21.0015 9.00002H3.00146C2.45146 9.00002 2.00146 8.55002 2.00146 8.00002V7.54002C2.00146 5.25002 3.85146 3.40002 6.14146 3.40002H17.8515C20.1415 3.40002 22.0015 5.26002 22.0015 7.55002Z" />
          <path d="M2.00146 11.5V16.46C2.00146 18.75 3.85146 20.6 6.14146 20.6H12.4015C12.9815 20.6 13.4815 20.11 13.4315 19.53C13.2915 18 13.7815 16.34 15.1415 15.02C15.7015 14.47 16.3915 14.05 17.1415 13.81C18.3915 13.41 19.6015 13.46 20.6715 13.82C21.3215 14.04 22.0015 13.57 22.0015 12.88V11.49C22.0015 10.94 21.5515 10.49 21.0015 10.49H3.00146C2.45146 10.5 2.00146 10.95 2.00146 11.5ZM8.00146 17.25H6.00146C5.59146 17.25 5.25146 16.91 5.25146 16.5C5.25146 16.09 5.59146 15.75 6.00146 15.75H8.00146C8.41146 15.75 8.75146 16.09 8.75146 16.5C8.75146 16.91 8.41146 17.25 8.00146 17.25Z" />
        </svg>
        Pay users
      </li></a>
    `;
  
    container.insertAdjacentHTML('beforeend', html);
  }
}
)
.catch((error) => {
console.error('Error:', error);
});



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


document.getElementsByClassName("notification")[0].addEventListener("click",()=>{
    document.getElementsByClassName("scroll_able_not")[0].classList.toggle("scroll_able_not_see")
})


fetch(`${apiUrl}/notifications/notifications_by_user_id/${UserId}`)
.then((response) => {
return response.json();
})
.then((data) => {

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        
        var container=document.getElementsByClassName("notification_ul")[0]
        var html=`
        <div class="notification">
        <p>
          ${element.createdAt}
        </p>
        <h5>
          ${element.title}
        </h5>
        <h2>
          ${element.notificationMessage}
        </h2>
      </div>
        `
        container.insertAdjacentHTML('beforeend',html)
      

    }
}
)
.catch((error) => {
console.error('Error:', error);
});



setInterval(() => {
    fetch(`${apiUrl}/notifications/notifications_by_user_id/${UserId}`)
    .then((response) => {
    return response.json();
    })
    .then((data) => {
    
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            
            var container=document.getElementsByClassName("notification_ul")[0]
            var html=`
            <div class="notification">
            <p>
              ${element.createdAt}
            </p>
            <h5>
              ${element.title}
            </h5>
            <h2>
              ${element.notificationMessage}
            </h2>
          </div>
            `
            container.insertAdjacentHTML('beforeend',html)
          
    
        }
    }
    )
    .catch((error) => {
    console.error('Error:', error);
    });
}, 100000);

