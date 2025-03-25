class Item {
    constructor(id, title, price, rating, description, image) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.description = description;
        this.image = image;
    }
}

async function fetchProducts() {
    return await fetch("https://fakestoreapi.com/products").then(result => result.json()).then(
        json => json.map(productJsonObject => new Item(productJsonObject.id,
            productJsonObject.title,
            productJsonObject.price,
            productJsonObject.rating,
            productJsonObject.description,
            productJsonObject.image))
    );
}

// <div className="card" style="width: 18rem;">
//     <img src="image" className="card-img-top" alt="..."/>
//     <div className="card-body">
//         <h5 className="card-title">title</h5>
//         <p className="card-text">description</p>
//         <p className="card-text">price</p>
//         <p className="card-text">rating</p>
//         <a href="#" className="btn btn-primary">BUY</a>
//     </div>
// </div>

function createCard(item) {
    const productContainer = document.getElementById("products");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card", "col-3");

    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body");

    const imgElement = document.createElement("img");
    imgElement.classList.add("card-img-top", "img-fluid");
    imgElement.setAttribute("alt", item.title);
    imgElement.setAttribute("src", item.image);

    const title = document.createElement("h5")
    title.classList.add("card-title");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = item.description;

    const price = document.createElement("p");
    price.classList.add("card-text");
    price.textContent = `Price: ${item.price}$`;

    const rating = document.createElement("p");
    rating.classList.add("card-text");
    rating.textContent = "Rating: " + item.rating;

    const button = document.createElement("a");
    button.classList.add("btn", "btn-primary", "col-12");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#confirmOrderModal")
    button.setAttribute("data-bs-whatever", item.id)
    button.innerText = "Buy";

    // <a className="btn bg-secondary bg-gradient" data-bs-toggle="modal" data-bs-target="#confirmOrderModal"
    //    data-bs-whatever="1">Modal button</a>

    cardBody.append(title, description, price, rating, button);
    cardContainer.append(imgElement, cardBody);
    productContainer.append(cardContainer)
}

const errorName = document.getElementById("error-name");
const errorEmail = document.getElementById("error-email");
const errorPhone = document.getElementById("error-phone");
const errorStreet = document.getElementById("error-street");
const errorCity = document.getElementById("error-city");
const errorPostal = document.getElementById("error-postal");

document.getElementById("confirmOrderModal").addEventListener("hidden.bs.modal", () => {
    resetModal();
})

function resetModal() {
    Array.from(document.getElementsByClassName("error-display")).forEach(element => {
        toggleErrorDisplay(element, true);
    })
}

function toggleErrorDisplay(element, isValidInput) {
    if (!isValidInput) {
        element.classList.remove("d-none");
    } else {
        element.classList.add("d-none");
    }
}

document.getElementById("order-form").addEventListener("submit", function (event) {
    event.preventDefault();
    toggleErrorDisplay(errorName, isValidName(document.getElementById("name").value));
    toggleErrorDisplay(errorEmail, isValidEmail(document.getElementById("email").value));
    toggleErrorDisplay(errorPhone, isValidPhoneNumber(document.getElementById("phone").value));
    toggleErrorDisplay(errorStreet, isValidStreet(document.getElementById("street").value));
    toggleErrorDisplay(errorPostal, isValidPostalCode(document.getElementById("postal-code").value));
    toggleErrorDisplay(errorCity, isValidCity(document.getElementById("city").value));

});

function isValidLength(value) {
    const lengthPattern = /^.{2,50}$/;
    return lengthPattern.test(value);
}

function isValidName(name) {
    const namePattern = /^(?=.{1,50}$)[\p{Letter}\p{Mark}\s\-]+ [\p{Letter}\p{Mark}\s\- ]+$/gu;
    return namePattern.test(name);
}

function isValidEmail(email) {
    const emailPattern = /^(?=.{1,50}$)[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9.]+$/;
    return emailPattern.test(email);
}

function isValidPhoneNumber(phoneNumber) {
    const phonePattern = /^[0-9)(-]{1,50}$/;
    return phonePattern.test(phoneNumber);
}

function isValidCity(city) {
    return isValidLength(city);
}

function isValidPostalCode(postalCode) {
    const postalCodePattern = /^\d{5}$/;
    return postalCodePattern.test(postalCode);
}

function isValidStreet(street) {
    return isValidLength(street);
}

fetchProducts().then(itemList => itemList.forEach(item => {
    createCard(item)
}))