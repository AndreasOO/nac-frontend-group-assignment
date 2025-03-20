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

console.log(fetchProducts())


