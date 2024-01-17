
var buttons =document.querySelectorAll(".quick_nav span")


    buttons[0].addEventListener("click",()=>{
     document.getElementsByClassName("quick_nav")[0].classList.add("active")
     document.getElementsByClassName("quick_nav")[0].classList.remove("explore")
    })
    buttons[1].addEventListener("click",()=>{
        document.getElementsByClassName("quick_nav")[0].classList.remove("active")
     document.getElementsByClassName("quick_nav")[0].classList.add("explore")
    })




var popBtn=document.querySelectorAll(".auction_btn")

for (let i = 0; i < popBtn.length; i++) {
    const element = popBtn[i];
    element.addEventListener("click",()=>{
      document.getElementsByClassName("popup")[0].classList.add("see_popup")
    })
    
}

document.querySelector(".popup_for_clear_payment h2").addEventListener("click",()=>{
    document.getElementsByClassName("popup")[0].classList.remove("see_popup")
})