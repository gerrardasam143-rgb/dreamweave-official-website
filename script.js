// WHATSAPP ORDER FUNCTION
const blindSizePrices = {
    "3 feet": 120,
    "4 feet": 150,
    "5 feet": 170,
    "6 feet": 190,
    "7 feet": 220
};

function orderProduct(productName, price, size = "") {
    const isBlind = productName.includes("Blinds");
    if (isBlind && !size) {
        window.alert("Please choose a blinds size before ordering.");
        return;
    }

    const orderPrice = isBlind ? blindSizePrices[size] : price;
    if (isBlind && typeof orderPrice !== "number") {
        window.alert("Please choose a valid blinds size before ordering.");
        return;
    }

    const phoneNumber = "233530265065";
    const sizeDetails = size ? `, size: ${size}` : "";
    const message = `Hello DREAMWEAVE, I'm interested in ordering ${productName}${sizeDetails} (GH₵ ${orderPrice.toFixed(2)}). Is it available?`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
}

function updateBlindPrice(sizeSelectId, priceDisplayId) {
    const size = document.getElementById(sizeSelectId).value;
    const price = blindSizePrices[size];
    document.getElementById(priceDisplayId).textContent = typeof price === "number"
        ? `GH₵ ${price.toFixed(2)}`
        : "Choose a size to see price";
}

// PRODUCT COLLECTIONS
const collections = {
bedsheets: {
    title: "Our Bedsheet Collection",
    description: "Explore our beautiful bedsheet designs.",
    products: [
        { name: "Chanel Bedsheet", price: 100, image: "images/Chanel Bedsheet.jpeg" },
        { name: "Classic Bedsheet", price: 100, image: "images/Bedsheet.jpg" },
        { name: "Royal Bedsheet", price: 100, image: "images/Royal Bedsheet.jpeg" },
        { name: "Chanel Bedsheet", price: 100, image: "images/Chanel Bedsheet1.jpeg" },
        { name: "Burberry Bedsheet", price: 100, image: "images/Kingsize.jpeg" },
        { name: "Luxe Bedsheet", price: 100, image: "images/Luxe Bedsheet.jpeg" }
    ]
},

curtains: {
    title: "Our Curtain Collection",
    description: "Discover elegant curtains in different styles.",
    products: [
        { name: "Grey Curtain", price: 200, image: "images/Grey Curtains.jpg" },
        { name: "Gold Curtain", price: 200, image: "images/Gold Curtain.jpg" },
        { name: "Blue Curtain", price: 200, image: "images/Blue Curtain.jpg" },
        { name: "Brown Curtain", price: 200, image: "images/Brown Curtain.jpg" },
        { name: "Royal Blue Curtain", price: 200, image: "images/Purple Curtains.jpg" },
        { name: "Black Curtain", price: 200, image: "images/Black Curtains.jpeg" }
    ]
},

blinds: {
    title: "Our Blinds Curtains Collection",
    description: "Discover stylish blinds for your home.",
    products: [
        { name: "Wine Blinds", price: 200, image: "images/Blinds Wine .jpeg" },
        { name: "Grey Blinds", price: 200, image: "images/Blinds grey.jpeg" },
        { name: "Brown Blinds", price: 200, image: "images/Blinds Brown.jpeg" },
        { name: "Blue Blinds", price: 200, image: "images/Blinds Blue.jpeg" },
        { name: "Black Blinds", price: 200, image: "images/Blinds Black.jpeg" }
    ]
},

carpets: {
    title: "Our Fluffy Carpet Collection",
    description: "Explore soft, cozy carpets for your home.",
    products: [
        { name: "Fluffy Carpet 1", price: 300, image: "images/Fluffy 1.jpeg" },
        { name: "Fluffy Carpet 2", price: 300, image: "images/Fluffy 2.jpeg" },
        { name: "Fluffy Carpet 3", price: 300, image: "images/Fluffy 3.jpeg" },
        { name: "Fluffy Carpet 4", price: 300, image: "images/Fluffy 4.jpeg" },
        { name: "Fluffy Carpet 5", price: 300, image: "images/Fluffy 5.jpeg" }
    ]
}
};
// DISPLAY SELECTED COLLECTION
function showCollection(collectionName) {
const collection = collections[collectionName];

if (!collection) return;

document.getElementById("collection-menu").style.display = "none";

document.getElementById("collection-products").style.display = "block";

document.getElementById("collection-title").textContent = collection.title;

document.getElementById("collection-description").textContent = collection.description;

const productGrid = document.getElementById("collection-product-grid");

productGrid.innerHTML = "";

collection.products.forEach((product, index) => {
    const productCard = document.createElement("div");
    const isBlind = collectionName === "blinds";
    const sizeSelector = isBlind ? `
        <label class="blind-size-label" for="blind-size-${index}">Choose size</label>
        <select class="blind-size-select" id="blind-size-${index}">
            <option value="" selected disabled>Select feet</option>
            <option value="3 feet">3 feet</option>
            <option value="4 feet">4 feet</option>
            <option value="5 feet">5 feet</option>
            <option value="6 feet">6 feet</option>
            <option value="7 feet">7 feet</option>
        </select>
    ` : "";
    const orderSize = isBlind
        ? `, document.getElementById('blind-size-${index}').value`
        : "";
    const priceDisplay = isBlind
        ? `<p class="price" id="blind-price-${index}" aria-live="polite">Choose a size to see price</p>`
        : `<p class="price">GH₵ ${product.price.toFixed(2)}</p>`;

    productCard.className = "product-card";

    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">

        <h3>${product.name}</h3>

        ${sizeSelector}

        ${priceDisplay}

        <button onclick="orderProduct('${product.name}', ${product.price}${orderSize})">
            Order Now
        </button>
    `;

    productGrid.appendChild(productCard);

    if (isBlind) {
        productCard.querySelector(".blind-size-select").addEventListener("change", () => {
            updateBlindPrice(`blind-size-${index}`, `blind-price-${index}`);
        });
    }

});
}
// RETURN TO COLLECTION MENU
function backToCollections() {
document.getElementById("collection-products").style.display = "none";

document.getElementById("collection-menu").style.display = "grid";
}