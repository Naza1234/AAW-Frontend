const winUrl="https://autoauction.space"
const apiUrl="https://aawserver.onrender.com"
// const apiUrl="http://localhost:3000"








const UserId=localStorage.getItem("AutoAuctionUserKey")








const currentDate = new Date();
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
const day = currentDate.getDate().toString().padStart(2, '0');

const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;



var productPrice=[]
fetch(`${apiUrl}/auction`)
.then((response) => {
return response.json();
})
.then((data) => {
   productPrice=data
}
)
.catch((error) => {
console.error('Error:', error);
});





fetch(`${apiUrl}/products/products`)
.then((response) => {
return response.json();
})
.then((data) => {
   populateData(data)
   uploadImg()
   
}
)
.catch((error) => {
console.error('Error:', error);
window.location=window.location
});




fetch(`${apiUrl}/products/active-auction-products`)
.then((response) => {
return response.json();
})
.then((data) => {
    if(data[0]=== !null){
        populateActiveAuction(data)
    }
    console.log(data);
    uploadImg()
}
)
.catch((error) => {
console.error('Error:', error);
// window.location=window.location
});



var productImg=[]
fetch(`${apiUrl}/productImage/product-images`)
.then((response) => {
return response.json();
})
.then((data) => {
   productImg=data
   uploadImg()
   if(data){
       document.getElementsByClassName("loading_data")[0].classList.add("loading_data_remove")
   }else{
    window.location=window.location
   }
}
)
.catch((error) => {
console.error('Error:', error);
});






function populateData(data){
    
    console.log(data);
    
    
    
    const AuctionProducts=[]
    
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element.Category === "Auction Product" && !element.productSold) {
            AuctionProducts.push(element)
        }
    }
    console.log(AuctionProducts);
    var auctionCount=0
    var auctionLet
    AuctionProducts.length >6 ? auctionLet=6 : auctionLet = AuctionProducts.length


    while (auctionCount < auctionLet) {
          
                var container=document.getElementsByClassName("items")[0]
                var html=`
                <div class="item p_man">
                <img src="./assets/image/car.png" alt="">
                <div class="dit">
                    <h2>
                        ${AuctionProducts[auctionCount].Make + " " + AuctionProducts[auctionCount].Model + " " + AuctionProducts[auctionCount].Year}
                    </h2>
                    
                        <div class="dit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="38" viewBox="0 0 37 38" fill="none">
                                <g clip-path="url(#clip0_212_506)">
                                  <path d="M21.1218 29.6172C21.8718 29.6172 22.5164 29.875 23.0554 30.3906C23.5945 30.9063 23.864 31.5391 23.864 32.2891V37.2109H0.449951V32.2891C0.449951 31.5391 0.719482 30.9063 1.25854 30.3906C1.79761 29.875 2.4187 29.6172 3.12183 29.6172H21.1218ZM35.9578 29.9688C36.2859 30.2969 36.45 30.6836 36.45 31.1289C36.45 31.5742 36.2859 31.9609 35.9578 32.2891C35.6296 32.6172 35.2429 32.7812 34.7976 32.7812C34.3523 32.7812 33.9656 32.6172 33.6375 32.2891L17.1843 15.9062L14.0203 19.0703L13.95 19C14.2312 19.2812 14.3718 19.5977 14.3718 19.9492C14.3718 20.3008 14.2429 20.6055 13.9851 20.8633C13.7273 21.1211 13.4109 21.25 13.0359 21.25C12.6609 21.25 12.3562 21.1328 12.1218 20.8984L5.2312 14.0781C4.99683 13.7969 4.87964 13.4688 4.87964 13.0938C4.87964 12.7187 5.00854 12.4023 5.26636 12.1445C5.52417 11.8867 5.84058 11.7578 6.21558 11.7578C6.59058 11.7578 6.89526 11.8984 7.12964 12.1797L7.05933 12.1094L15.7781 3.46094H15.8484C15.5671 3.22656 15.4265 2.92188 15.4265 2.54688C15.4265 2.17187 15.5554 1.85547 15.8132 1.59766C16.071 1.33984 16.3875 1.21094 16.7625 1.21094C17.1375 1.21094 17.4421 1.35156 17.6765 1.63281L24.5671 8.45312C24.8015 8.6875 24.9187 8.99219 24.9187 9.36719C24.9187 9.74219 24.8015 10.0703 24.5671 10.3516C23.9578 10.9141 23.3484 10.9141 22.739 10.3516L19.575 13.5156L35.9578 29.9688Z" fill="#43B055"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_212_506">
                                    <rect width="36" height="37" fill="white" transform="matrix(1 0 0 -1 0.449951 37.5)"/>
                                  </clipPath>
                                </defs>
                              </svg>
                            <span>
                                <h1>
                                    Current Bid
                                </h1>
                                <p class="price">
                               $ ${AuctionProducts[auctionCount].Price.toLocaleString()}
                                </p>
                            </span>
                        </div>
                    </div>
                    <button class="button_ac">
                    <h1 class="hid" >${AuctionProducts[auctionCount]._id}</h1>
                       Submit a bid
                    </button>
            </div>
                `
     
                container.insertAdjacentHTML('beforeend',html)   
            
            auctionCount ++
            console.log(auctionCount);
        }
    
    
    
    
    
    
    const OneTimeSaleProducts=[]
    
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element.Category === "One Time Sails Product" && !element.productSold) {
            OneTimeSaleProducts.push(element)
        }
    }
    console.log(OneTimeSaleProducts);
    var oneTimeSaleCount=0
    var oneTimeSaleLet
    OneTimeSaleProducts.length >6 ? oneTimeSaleLet=6 : oneTimeSaleLet = OneTimeSaleProducts.length


    while (oneTimeSaleCount < oneTimeSaleLet) {
          
                var container=document.getElementsByClassName("items")[1]
                var html=`
                <div class="item">
                <img src="./assets/image/car.png" alt="">
                <div class="dit">
                    <h2>
                        ${OneTimeSaleProducts[oneTimeSaleCount].Make + " " + OneTimeSaleProducts[oneTimeSaleCount].Model + " " + OneTimeSaleProducts[oneTimeSaleCount].Year}
                    </h2>
                    
                        <div class="dit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="38" viewBox="0 0 37 38" fill="none">
                        <g clip-path="url(#clip0_212_514)">
                          <path d="M17.2747 6.27344C17.2747 7.86719 16.7708 9.27344 15.7629 10.4922C14.7551 11.7109 13.5012 12.5078 12.0012 12.8828C12.8918 11.7578 13.3372 10.4922 13.3372 9.08594H12.2122C12.2122 10.4453 11.7434 11.5938 10.8059 12.5312L10.3137 13.0234C10.3137 13.0234 10.2668 13.0234 10.1731 13.0234L9.18872 12.0391C8.25122 11.1016 7.94653 9.97656 8.27466 8.66406L7.14966 8.38281C6.77466 9.97656 7.12622 11.3828 8.20435 12.6016C6.89185 12.1328 5.82544 11.3242 5.00513 10.1758C4.18481 9.02734 3.77466 7.72656 3.77466 6.27344V5.64062C3.77466 5.35938 3.89185 5.17188 4.12622 5.07812C4.1731 5.07812 4.24341 5.07812 4.33716 5.07812C4.47778 5.07812 4.61841 5.125 4.75903 5.21875L5.88403 6.34375C6.25903 6.71875 6.69263 6.89453 7.18481 6.87109C7.677 6.84766 8.06372 6.64844 8.34497 6.27344L10.1028 4.23438C10.384 3.90625 10.6653 3.90625 10.9465 4.23438L12.7043 6.27344C12.9856 6.64844 13.384 6.84766 13.8997 6.87109C14.4153 6.89453 14.8372 6.71875 15.1653 6.34375L16.2903 5.21875C16.4778 5.03125 16.6887 4.98437 16.9231 5.07812C17.1575 5.17188 17.2747 5.35938 17.2747 5.64062V6.27344ZM2.64966 22.0234C2.64966 19.2578 3.7981 17.0781 6.09497 15.4844C3.37622 15.9062 1.50122 15.3672 0.469971 13.8672L1.45435 13.3047C1.82935 13.8672 2.41528 14.2305 3.21216 14.3945C4.00903 14.5586 4.8645 14.5586 5.77856 14.3945C6.69263 14.2305 7.52466 14.0312 8.27466 13.7969C9.02466 13.5625 9.70435 13.3281 10.3137 13.0938C10.595 12.9531 10.8293 13.0234 11.0168 13.3047C11.1575 13.5391 11.3918 13.8437 11.72 14.2188C13.595 14.5 15.177 15.3789 16.4661 16.8555C17.7551 18.332 18.3997 20.0547 18.3997 22.0234C18.3997 22.0234 18.3997 22.0469 18.3997 22.0938L19.2434 30.0391C19.2434 30.3672 19.2668 30.6953 19.3137 31.0234C19.5481 32.0078 19.3372 32.9102 18.6809 33.7305C18.0247 34.5508 17.1809 34.9609 16.1497 34.9609H4.89966C3.86841 34.9609 3.02466 34.5508 2.36841 33.7305C1.71216 32.9102 1.50122 32.0078 1.7356 31.0234C1.78247 30.6953 1.80591 30.3672 1.80591 30.0391L2.64966 22.0938C2.64966 22.0469 2.64966 22.0234 2.64966 22.0234ZM7.71216 27.0859V27.3672C7.71216 28.0234 7.9231 28.5859 8.34497 29.0547C8.76685 29.5234 9.30591 29.8047 9.96216 29.8984V31.5859H11.0872V29.8984C11.509 29.8516 11.8958 29.7109 12.2473 29.4766C12.5989 29.2422 12.8684 28.9375 13.0559 28.5625C13.2434 28.1875 13.3372 27.7891 13.3372 27.3672C13.3372 26.6641 13.0911 26.0664 12.5989 25.5742C12.1067 25.082 11.509 24.8359 10.8059 24.8359H10.2434C9.86841 24.8359 9.54028 24.6953 9.25903 24.4141C8.97778 24.1328 8.83716 23.8047 8.83716 23.4297C8.83716 23.0547 8.97778 22.7266 9.25903 22.4453C9.54028 22.1641 9.86841 22.0234 10.2434 22.0234H10.8059C11.1809 22.0234 11.509 22.1641 11.7903 22.4453C12.0715 22.7266 12.2122 23.0547 12.2122 23.4297V23.7109H13.3372V23.4297C13.3372 22.7734 13.1262 22.2109 12.7043 21.7422C12.2825 21.2734 11.7434 20.9922 11.0872 20.8984V19.2109H9.96216V20.8984C9.30591 20.9922 8.76685 21.2734 8.34497 21.7422C7.9231 22.2109 7.71216 22.7734 7.71216 23.4297C7.71216 24.1328 7.95825 24.7305 8.45044 25.2227C8.94263 25.7148 9.54028 25.9609 10.2434 25.9609H10.8059C11.1809 25.9609 11.509 26.1016 11.7903 26.3828C12.0715 26.6641 12.2122 26.9922 12.2122 27.3672C12.2122 27.7422 12.0715 28.0703 11.7903 28.3516C11.509 28.6328 11.1809 28.7734 10.8059 28.7734H10.2434C9.86841 28.7734 9.54028 28.6328 9.25903 28.3516C8.97778 28.0703 8.83716 27.7422 8.83716 27.3672V27.0859H7.71216Z" fill="#43B055"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_212_514">
                            <rect width="36" height="37" fill="white" transform="matrix(1 0 0 -1 0.469971 37.5)"/>
                          </clipPath>
                        </defs>
                      </svg>
                            <span>
                                <h1>
                                    price
                                </h1>
                                <p>
                               $ ${OneTimeSaleProducts[oneTimeSaleCount].Price.toLocaleString()}
                                </p>
                            </span>
                        </div>
                    </div>
                    <button class="button_os">
                    <h1 class="hid" >${OneTimeSaleProducts[oneTimeSaleCount]._id}</h1>
                       Submit a bid
                    </button>
            </div>
                `
     
                container.insertAdjacentHTML('beforeend',html)   
            
            oneTimeSaleCount ++
           
        }




       setInterval(() => {
        uploadPrice()
       }, 100);


       ButtonClick()

}




function populateActiveAuction(data){
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
          
     if(!null){
        var container=document.getElementsByClassName("trnding_wrap")[0]
        var html=`
        <div class="item p_man">
        <img src="./assets/image/car.png" alt="">
               <div class="dit">
            <h1>
            ${element.Make + element.Model + element.Year}
            </h1>
            <h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
                    <path opacity="0.4" d="M17.6201 7.45C16.5701 2.83 12.5401 0.75 9.0001 0.75C9.0001 0.75 9.0001 0.75 8.9901 0.75C5.4601 0.75 1.4201 2.82 0.370095 7.44C-0.799905 12.6 2.3601 16.97 5.2201 19.72C6.2801 20.74 7.6401 21.25 9.0001 21.25C10.3601 21.25 11.7201 20.74 12.7701 19.72C15.6301 16.97 18.7901 12.61 17.6201 7.45Z" fill="#A7A7A7"/>
                    <path d="M9.0001 12.46C10.7398 12.46 12.1501 11.0497 12.1501 9.31C12.1501 7.5703 10.7398 6.16 9.0001 6.16C7.2604 6.16 5.8501 7.5703 5.8501 9.31C5.8501 11.0497 7.2604 12.46 9.0001 12.46Z" fill="white"/>
                  </svg>
                  ${element.Location}
            </h2>
            <h3>
                <b>
                    prices : 
                </b>
                <h3 class="price"> $ ${element.Price.toLocaleString()}</h3>
            </h3>
            <h3>
                <b>
                   End time : 
                </b>
                ${element.endDateTime}
            </h3>
            <button class="button_ac">
            <h5 class="hid">${element._id}</h5>
                Submit a bid
            </button>
        </div>
    </div>
        `

        container.insertAdjacentHTML('beforeend',html)   
     }
    }

    ButtonClick()

}






function ButtonClick(){
    var parent=document.getElementsByClassName("button_ac")
    for (let i = 0; i < parent.length; i++) {
        const element = parent[i];
        element.addEventListener("click",(e)=>{
            var btn=e.target
            var id=btn.getElementsByClassName("hid")[0].textContent
            if (!UserId) {
                window.location=`${winUrl}/pages/loging.html`
            }else{
                window.location=`${winUrl}/pages/detalis.html?r=${id}`
            }
            
        })
    }

    var parentOs=document.getElementsByClassName("button_os")
    for (let i = 0; i < parentOs.length; i++) {
        const element = parentOs[i];
        element.addEventListener("click",(e)=>{
            var btn=e.target
            var id=btn.getElementsByClassName("hid")[0].textContent
            if (!UserId) {
                window.location=`${winUrl}/pages/loging.html`
            }else{
                window.location=`${winUrl}/pages/detalis.html?r=${id}`
            }
            
        })
    }
}

















function uploadPrice(){
    if(productPrice.length>0){
        var items=document.getElementsByClassName("p_man")
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        var itemId=element.getElementsByClassName("hid")[0].textContent
        for (let j = 0; j < productPrice.length; j++) {
            const elementTwo = productPrice[j];
            if (elementTwo.productId === itemId) {
                element.querySelectorAll(".price")[0].textContent=`$ ${elementTwo.amount.toLocaleString()}`
              }else{
              }
        }
    }
    }else{
      }
}




function uploadImg(){
    if(productImg.length>0){
        var items=document.getElementsByClassName("item")
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        var itemId=element.getElementsByClassName("hid")[0].textContent
        for (let j = 0; j < productImg.length; j++) {
            const elementTwo = productImg[j];
            if (elementTwo.productId === itemId) {
                var itemImg=element.getElementsByTagName("img")[0].src = elementTwo.imageUrl
              }
        }
    }
    }
}













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





setInterval(() => {    
    fetch(`${apiUrl}/endAuction/endAuctions`).then(res => res.json())
  }, 5000);
  