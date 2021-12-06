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
  counter -= Math.round(event.target.id);
  document.querySelector('.total-price').innerHTML = `Valor no carrinho: R$ ${counter}`;
  event.target.parentElement.removeChild(event.target);
  saveCartItems();
}

// Adiciona item ao carrinho
const createCartItemElement = ({ sku, name, salePrice }) => {  
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.id = salePrice;
  li.addEventListener('click', cartItemClickListener);
  document.querySelector('ol').appendChild(li); 
  return li;
};

// Dá fetch na API através do ID e chama a função de adicionar os itens para o carrinho, utilizando a data
const fetchItems = async (event) => {
  const id = event.target.parentElement.firstChild.innerText;
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const { id: sku, title: name, price: salePrice } = data;  
  createCartItemElement({ sku, name, salePrice });
  return data;
};

// Função somando o valor total no carrinho:
const adicionandoPreçoTotal = async (event) => {
  const id = event.target.parentElement.firstChild.innerText;
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  counter += Math.round(data.price);
  document.querySelector('.total-price').innerHTML = `Valor no carrinho: R$ ${counter}`;
  saveCartItems();
};

// Cria a função de esvaziar o carrinho:
const emptyCart = () => {
  document.querySelector('.cart__items').innerHTML = '';
  counter = 0;
  document.querySelector('.total-price').innerHTML = `Valor no carrinho: R$ ${counter}`;
  saveCartItems();
};

// Função de fazer nova pesquisa conforme os itens do header
const changeItems = async (event) => {
  document.querySelector('.items').innerHTML = '';
  showItems(event.target.id);
  initEventListeners();
};

const showItems = async (id) => {
  const elementItems = document.querySelector('.items');
  const dataResults = await fetchProducts(id);
  for (let i = 0; i <= 11; i += 1) {
    const { id: sku, title: name, thumbnail: image } = dataResults.results[i];
    elementItems.appendChild(createProductItemElement({ sku, name, image }));
  }
  initEventListeners();
};
// Iniciador de escutadores de evento
const initEventListeners = () => {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) =>
    button.addEventListener('click', fetchItems));
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach((item) =>
    item.addEventListener('click', cartItemClickListener));
    const emptyCartBtn = document.querySelector('.empty-cart');
    emptyCartBtn.addEventListener('click', emptyCart);
  buttons.forEach((button) =>
    button.addEventListener('click', adicionandoPreçoTotal));
  const headerButtons = document.querySelectorAll('.change-filter');
  headerButtons.forEach((button) => button.addEventListener('click', changeItems));
};

window.onload = async () => {
  await fetchProducts('computador');
  getSavedCartItems(); 
  showItems('computador');
  initEventListeners();
};
