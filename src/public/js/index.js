const socketClient = io();

socketClient.on("saludoDesdeBack", (msg) => {
  console.log(msg);

  socketClient.emit("respuestaDesdeFront", "Muchas gracias");
});

const form = document.getElementById("form");
const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputCode = document.getElementById('code');
const inputPrice = document.getElementById('price');
const inputStock = document.getElementById('stock');
const inputCategory = document.getElementById('category');
const inputProducts = document.getElementById('products');

form.onsubmit = (e)=> {
    e.preventDefault();
    const title = inputTitle.value;
    const description = inputDescription.value;
    const price = inputPrice.value;
    const stock = inputStock.value;
    const category = inputCategory.value;
    const product = {title, description, price, stock, category};
    console.log("Enviando producto:", product);
    socketClient.emit('newProduct', product);
};

socketClient.on('arrayProducts', (productsArray) => {
    let infoProducts = '';
    productsArray.forEach(p => {
        infoProducts += `${p.title} - $${p.price} </br>`
    });
    inputProducts.innerHTML = infoProducts;
});


socketClient.on('message', (msg) => {
    console.log(msg);
});

document.getElementById('form').addEventListener('submit', function(event){
    event.preventDefault();
    window.location.href = '/views/register';
});