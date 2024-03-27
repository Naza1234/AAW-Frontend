

var sectionButtons= document.querySelectorAll(".condition div")

for (let i = 0; i < sectionButtons.length; i++) {
    const element = sectionButtons[i];

    element.addEventListener("click",()=>{

        for (let x = 0; x < sectionButtons.length; x++) {
            sectionButtons[x].classList.remove("active");
        }

        element.classList.add("active");

        var name = element.getElementsByTagName("h1")[0].textContent.trim();
        loadVehicleType(name);
        
    })
    
}




function loadVehicleType(type){
    fetch(`${apiUrl}/vehicleFinder/get-make/${type}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
       

     // Select the container element outside the loop
const container = document.getElementsByClassName("make_list")[0];

// Loop through the data array
   for (let i = 0; i < data.length; i++) {
    const element = data[i];
    
    // Create the HTML for the option using template literals
    const html = `
        <option value="${element}">
            ${element}
        </option>
    `
    ;
    
    // Append the HTML to the container element
    container.insertAdjacentHTML("beforeend", html);
}


       
    })
    .catch((error) => {
        console.error('Error:', error);
    });


}


// Select the <select> element
var makeSelection = document.getElementsByClassName("make_list")[0];

// Add event listener for the "change" event
makeSelection.addEventListener("change", function(event) {
    // Retrieve the selected value
    var selectedValue = event.target.value;
    
    // Log the selected value
    console.log("Selected value:", selectedValue);
});
