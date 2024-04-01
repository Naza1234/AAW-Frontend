

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

function encodeObject(obj) {
    return Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join("&");
}


// Select the <select> element
var makeSelection = document.getElementsByClassName("make_list")[0];

// Add event listener for the "change" event
makeSelection.addEventListener("change", function(event) {
    // Retrieve the selected value
    var selectedValue = event.target.value;
    var sectionButtons= document.querySelectorAll(".condition div.active h1")[0].textContent.trim()
    // Log the selected value
    const params={
        Selected : selectedValue ,
        name:sectionButtons
    }



    fetch(`${apiUrl}/vehicleFinder/get-model/${encodeObject(params)}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
            // Select the container element outside the loop
   const container = document.getElementsByClassName("make_list")[1];

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


});



// Select the <select> element
var madeSelection = document.getElementsByClassName("make_list")[1];

// Add event listener for the "change" event
madeSelection.addEventListener("change", function(event) {
    // Retrieve the selected value
    var selectedValue = event.target.value;
    var selectedMake= document.getElementsByClassName("make_list")[0].value;
    var sectionButtons= document.querySelectorAll(".condition div.active h1")[0].textContent.trim()
    // Log the selected value
    const params={
        Selected : selectedValue ,
        SelectedMake: selectedMake,
        name:sectionButtons
    }



    fetch(`${apiUrl}/vehicleFinder/get-mileage/${encodeObject(params)}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
   
        const container = document.getElementsByClassName("make_list")[2];

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
        getSelection(data)

    
    })
    .catch((error) => {
        console.error('Error:', error);
    });


});


function getSelection(array) {
    const container = document.getElementsByClassName("make_list")[3];
    const SelectorOne = document.getElementsByClassName("make_list")[2];

    // Listen for the change event on the first select element
    SelectorOne.addEventListener("change", function(event) {
     

        // Retrieve the selected value
        const selectedValue = Number(event.target.value); // Convert to number

        // Filter numbers from the array that are greater than or equal to the selected value
        const filteredNumbers = array.filter(number => number >= selectedValue);

        // Iterate through the filtered numbers
        filteredNumbers.forEach(number => {
            // Create the HTML for the option using template literals
            const html = `
                <option value="${number}">
                    ${number}
                </option>
            `;
            
            // Append the HTML to the container element
            container.insertAdjacentHTML("beforeend", html);
        });
    });
}


const SelectedEndMeter = document.getElementsByClassName("make_list")[3];

SelectedEndMeter.addEventListener("change", function(event) {
     
    const selectedValue = Number(event.target.value); // Convert to number
   
    const params = {
        Selected: document.getElementsByClassName("make_list")[1].value,
        SelectedMake: document.getElementsByClassName("make_list")[0].value,
        name: document.querySelectorAll(".condition div.active h1")[0].textContent.trim(),
        FromOdeaMeter: parseInt(document.getElementsByClassName("make_list")[2].value),
        ToOdeaMeter: parseInt(selectedValue)
    };
    
        console.log(params);
});












