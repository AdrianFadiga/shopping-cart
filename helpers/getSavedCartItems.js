const getSavedCartItems = () => {
  document.querySelector('.cart__items').innerHTML = localStorage.getItem('cartItems');
  document.querySelector('.total-price').innerText = localStorage.getItem('counter');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
