const saveCartItems = () => {
  localStorage.setItem('cartItems', document.querySelector('.cart__items').innerHTML);
  // localStorage.setItem('counter', document.querySelector('.total-price').innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
