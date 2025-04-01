class Item {
    constructor(id, title, price, ratingValue, ratingCount, description, image) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = {
            value: ratingValue,
            count: ratingCount
        };
        this.description = description;
        this.image = image;
    }
}

async function fetchProducts() {
    return await fetch("https://fakestoreapi.com/products").then(result => result.json()).then(
        json => json.map(productJsonObject => new Item(productJsonObject.id,
            productJsonObject.title,
            productJsonObject.price,
            productJsonObject.rating.rate,
            productJsonObject.rating.count,
            productJsonObject.description,
            productJsonObject.image))
    );
}

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
    rating.textContent = "Rating: " + item.rating.value + " Count: " + item.rating.count;

    const button = document.createElement("a");
    button.classList.add("btn", "btn-primary", "col-12");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#confirmOrderModal")
    button.setAttribute("data-bs-whatever", item.id)
    button.innerText = "Buy";

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

    const validName = isValidName(document.getElementById("name").value);
    const validEmail = isValidEmail(document.getElementById("email").value);
    const validPhone = isValidPhoneNumber(document.getElementById("phone").value);
    const validStreet = isValidStreet(document.getElementById("street").value);
    const validPostal = isValidPostalCode(document.getElementById("postal-code").value);
    const validCity = isValidCity(document.getElementById("city").value);

    toggleErrorDisplay(errorName, validName);
    toggleErrorDisplay(errorEmail, validEmail);
    toggleErrorDisplay(errorPhone, validPhone);
    toggleErrorDisplay(errorStreet, validStreet);
    toggleErrorDisplay(errorPostal, validPostal);
    toggleErrorDisplay(errorCity, validCity);

    if(validName && validEmail && validPhone && validStreet && validPostal && validCity) {
        this.submit();
        alert("thank you for your purchase");
    }

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
}));