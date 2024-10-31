let productImg = [];

fetch(`${apiUrl}/products/won-products-with-user-id/${UserId}`)
    .then((response) => response.json())
    .then((data) => {
        fetch(`${apiUrl}/user/users/${UserId}`)
            .then((response) => response.json())
            .then((userData) => {
                populateData(data, userData);
                document.querySelector(".loading_data").classList.add("loading_data_remove");
            })
            .catch((error) => console.error('Error fetching user data:', error));

        fetch(`${apiUrl}/productImage/won-product-images-with-user-id/${UserId}`)
            .then((response) => response.json())
            .then((data) => {
                productImg = data;
                uploadImg();
            })
            .catch((error) => console.error('Error fetching product images:', error));
    })
    .catch((error) => {
        console.error('Error fetching won products:', error);
        window.location.reload();
    });

function populateData(data, userData) {
    const container = document.querySelector(".winners");

    data.forEach((element) => {
        const html = `
            <div class="winners_items">
                <img src="../assets/image/car.png" alt="">
                <div class="dit">
                    <img src="${userData.UserProfileImage}" alt="" class="profile_img">
                    <h1>CONGRATULATIONS</h1>
                    <h2>${userData.UserName}</h2>
                    <h3>Winner of <b>${element.Model}</b></h3>
                    <h5>${element.endDateTime}</h5>
                    <ul>
                        <li class="me">
                            <h1>1. ${userData.UserName}</h1>
                            <h2>$ ${element.Price.toLocaleString()}</h2>
                        </li>
                        <li style="justify-content: center;"><h1>delivery</h1></li>
                        <li style="justify-content: center;"><h1>pre-inspection</h1></li>
                    </ul>
                </div>
                <div class="proceed">
                    <h1>congratulations</h1>
                    <button class="auction_btn">
                        <h5 class="hid">${element._id}</h5>
                        <h5 class="hid_data">${element.Category}</h5>
                        click here to proceed
                    </button>
                </div>
            </div>`;
        container.insertAdjacentHTML('beforeend', html);
    });

    // Update visibility based on category
    document.querySelectorAll(".winners_items").forEach((element) => {
        const itemCart = element.querySelector(".hid_data").textContent;
        element.classList.toggle("hid", itemCart !== "Auction Product");
    });

    chart();
    uploadImg();
    sendMessage()
}

function uploadImg() {
    if (productImg.length > 0) {
        document.querySelectorAll(".winners_items").forEach((element) => {
            const itemId = element.querySelector(".hid").textContent;
            const matchedImage = productImg.find(img => img.productId === itemId);
            if (matchedImage) {
                element.querySelector("img").src = matchedImage.imageUrl;
            }
        });
    }
}
var productId
function chart() {
    document.querySelectorAll(".auction_btn").forEach((element) => {
        element.addEventListener("click", (e) => {
            const parent = e.target.closest(".proceed");
            parent.classList.add("active_parent_to_button");
            const id = parent.querySelector(".hid").textContent;
            productId = id
            fetch(`${apiUrl}/conversations/get-conversations-by-product-id/${id}`)
                .then((response) => response.json())
                .then((conversation) => {
                    populateConversation(conversation, id);
                    parent.classList.remove("active_parent_to_button");
                })
                .catch((error) => console.error('Error fetching conversation:', error));
        });
    });
}

function populateConversation(conversation, id) {
    const popup = document.querySelector(".popup");
    popup.classList.add("see_popup");

    document.querySelector(".popup_for_clear_payment h2").addEventListener("click", () => {
        popup.classList.remove("see_popup");
    });

    const container = document.querySelector(".win_cart");
    container.innerHTML = "";

    conversation.forEach((element) => {
        const html = `<li class="${element.userId === UserId ? "me" : ""}"><h3>${element.message}</h3></li>`;
        container.insertAdjacentHTML('beforeend', html);
        container.parentElement.scrollTop = container.scrollHeight;
    });

  
}


function sendMessage() {
    document.querySelector(".send_text").addEventListener("click", (e) => {
        const input = e.target.closest(".popup").querySelector("input").value;
       if (productId && input && UserId) {
        const params = { userId: UserId, productId: productId, message: input };

        fetch(`${apiUrl}/conversations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        })
        .then((response) => response.json())
        .then(() => {
            populateChart(input, productId);
        })
        .catch((error) => console.error('Error posting message:', error));
       }
    });
}
function populateChart(input, id) {
    fetch(`${apiUrl}/conversations/get-conversations-by-product-id/${id}`)
        .then((response) => response.json())
        .then((conversation) => {
            const container = document.querySelector(".win_cart");
            container.innerHTML = "";

            conversation.forEach((element) => {
                const html = `<li class="${element.userId === UserId ? "me" : ""}"><h3>${element.message}</h3></li>`;
                container.insertAdjacentHTML('beforeend', html);
                container.parentElement.scrollTop = container.scrollHeight;
            });
        })
        .catch((error) => console.error('Error refreshing conversation:', error));
}

// Quick Navigation
document.querySelectorAll(".quick_nav span").forEach((button, index) => {
    button.addEventListener("click", () => {
        const nav = document.querySelector(".quick_nav");
        nav.classList.toggle("active", index === 0);
        nav.classList.toggle("explore", index === 1);

        document.querySelectorAll(".winners_items").forEach((element) => {
            const itemCart = element.querySelector(".hid_data").textContent;
            element.classList.toggle("hid", index === 0 ? itemCart !== "Auction Product" : itemCart === "Auction Product");
        });
    });
});


