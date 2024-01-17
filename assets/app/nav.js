var navTugBtn=document.getElementsByClassName("nav_tog")

for (let i = 0; i < navTugBtn.length; i++) {
    const element = navTugBtn[i];
    element.addEventListener("click",()=>{
        document.getElementsByClassName("main_nav")[0].classList.toggle("main_nav_come_out")
    })
}