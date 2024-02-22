

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