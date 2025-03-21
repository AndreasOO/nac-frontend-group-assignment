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
    Array.from(document.getElementsByClassName("error-message")).forEach(message => {
        message.textContent = "";
    })
}

function displayErrorMessage(element, isError) {
    if(!isError) {
        element.classList.remove("d-none");
    }
    else{
        element.classList.add("d-none");
    }
}

document.getElementById("order-form").addEventListener("submit", function (event){
    event.preventDefault();
    displayErrorMessage(errorName, isValidName(document.getElementById("name").value));
    displayErrorMessage(errorEmail, isValidEmail(document.getElementById("email").value));
    displayErrorMessage(errorPhone,isValidPhone(document.getElementById("phone").value));
    displayErrorMessage(errorStreet, isValidStreet(document.getElementById("street").value));
    displayErrorMessage(errorPostal, isValidPostalCode(document.getElementById("postal-code").value));
    displayErrorMessage(errorCity, isValidCity(document.getElementById("city").value));
});

function isValidLength(value){
    const lengthPattern = /^.{2,50}$/;
    return lengthPattern.test(value);
}

function isValidName(name){
    return isValidLength(name);
}

function isValidEmail(email){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPhone(phoneNumber){
    const phonePattern = /^(?=.*\d)[0-9)(-]{1,50}$/;
    return phonePattern.test(phoneNumber);
}

function isValidCity(city){
    return isValidLength(city);
}

function isValidPostalCode(postalCode){
    const postalCodePattern = /^.{5}$/;
    return postalCodePattern.test(postalCode);
}
function isValidStreet(street){
    return isValidLength(street);
}