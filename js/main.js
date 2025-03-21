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
const errorAddress = document.getElementById("error-address");

document.getElementById("confirmOrderModal").addEventListener("hidden.bs.modal", () => {
    resetModal();
})

function resetModal() {
    Array.from(document.getElementsByClassName("error-message")).forEach(message => {
        message.textContent = "";
    })
}

function displayErrorMessage(element, message) {
    element.textContent = message;
}

document.getElementById("order-form").addEventListener("submit", function (event){
    event.preventDefault();
    errorName.textContent = isValidName(document.getElementById("name").value) ? "" : "Please enter a valid name!";
    errorEmail.textContent = isValidEmail(document.getElementById("email").value) ? "" : "Please enter a valid email!";
    errorPhone.textContent = isValidPhone(document.getElementById("phone").value) ? "" : "Please enter a valid phone number!";
    errorAddress.textContent = isValidAddress(document.getElementById("street").value,
                                            document.getElementById("postal-code").value,
                                            document.getElementById("city").value) ? "" : "Please enter a valid address!";
});

function isValidName(name){
    const namePattern = /^.{2,50}$/;
    return namePattern.test(name);
}

function isValidEmail(email){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPhone(phoneNumber){
    const phonePattern = /^(?=.*\d)[0-9)(-]{1,50}$/;
    return phonePattern.test(phoneNumber);
}

function isValidAddress(street, postalCode, city){
    const streetAndCityPattern = /^.{2,50}$/;
    const postalCodePattern = /^.{5}$/
    return streetAndCityPattern.test(street) && streetAndCityPattern.test(city) && postalCodePattern.test(postalCode);
}