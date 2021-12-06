const saveCartItems = () => {
  localStorage.setItem('cartItems', document.querySelector('.cart__items').innerHTML);
  localStorage.setItem('counter', counter);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
