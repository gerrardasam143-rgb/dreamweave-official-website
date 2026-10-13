function orderProduct(productName, price) {

    const phoneNumber = "233530265065";

    const message = `Hello GERPHTER ENTERPRISE, I'm interested in ordering ${productName} (GH₵ ${price.toFixed(2)}). Is it available?`;

    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");

}