let counter = 0;

// Adiciona imagem aos elementos
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
// Cria um elemento
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
// Cria os itens
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
}
// pega o Id (sku) dos produtos da lista
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
// Clique remove os itens do carrinho
function cartItemClickListener(event) {
  counter -= event.target.id;
  document.querySelector('.total-price').innerHTML = `Valor no carrinho: R$ ${counter}`;
  event.target.parentElement.removeChild(event.target);
}
// Adiciona item ao carrinho
const createCartItemElement = async ({ sku, name, salePrice }) => {  
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.id = salePrice;
  li.addEventListener('click', cartItemClickListener);
  const cartItems = document.querySelector('ol');
  cartItems.appendChild(li);
  return li;
};
// Dá fetch na API através do ID e chama a função de adicionar os itens para a lista
const fetchItems = async (event) => {
  const id = event.target.parentElement.firstChild.innerText;
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const { id: sku, title: name, price: salePrice } = await data;
  createCartItemElement({ sku, name, salePrice });
  saveCartItems();
};
// Função somando o valor total no carrinho:
const adicionandoPreçoTotal = async (event) => {
  const id = event.target.parentElement.firstChild.innerText;
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  counter += await data.price;
  document.querySelector('.total-price').innerHTML = `Valor no carrinho: R$ ${counter}`;
};

// Criando o item do totalPrice:
const addTotalPrice = () => {
  coisa = document.createElement('p');
  coisa.className = 'total-price';
  coisa.innerHTML = `Valor no carrinho: R$ ${counter}`;
  document.querySelector('.cart').appendChild(coisa);  
};

const emptyCart = () => {
  document.querySelector('.cart__items').innerHTML = '';
  saveCartItems();
  counter = 0;
  document.querySelector('.total-price').innerHTML = `Valor no carrinho: R$ ${counter}`;
};
// Iniciador de escutadores de evento
const initEventListeners = () => {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) =>
    button.addEventListener('click', fetchItems));
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach((item) =>
    item.addEventListener('click', cartItemClickListener));
    buttons.forEach((button) =>
    button.addEventListener('click', fetchItems));
    const emptyCartBtn = document.querySelector('.empty-cart');
    emptyCartBtn.addEventListener('click', emptyCart);
  buttons.forEach((button) =>
    button.addEventListener('click', adicionandoPreçoTotal));
};
window.onload = async () => {
  const elementItems = document.querySelector('.items');
  const dataResults = await fetchProducts('computador');
  dataResults.results.forEach((data) => {
    const { id: sku, title: name, thumbnail: image } = data;
    elementItems.appendChild(createProductItemElement({ sku, name, image }));
  });
  const testee = await fetchProducts('computador');
  const loading = document.querySelector('.loading');
  if (testee) {
    loading.remove();
  }
  getSavedCartItems();
  initEventListeners();
  addTotalPrice();
};
