
var buttons = document.querySelectorAll(".cover button")
var items=document.getElementsByClassName("slideshow")



buttons[0].addEventListener("click",()=>{
    items[0].classList.remove("slideshow_show")
    items[0].classList.add("slideshow_hide")
    items[1].classList.add("slideshow_show")
})
buttons[1].addEventListener("click",()=>{
    items[1].classList.remove("slideshow_show")
    items[1].classList.add("slideshow_hide")
    items[2].classList.add("slideshow_show")
})
buttons[2].addEventListener("click",()=>{
    items[2].classList.remove("slideshow_show")
    items[2].classList.add("slideshow_hide")
    items[3].classList.add("slideshow_show")
})
buttons[3].addEventListener("click",()=>{
    
})