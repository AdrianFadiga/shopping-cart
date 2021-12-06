const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');
const { TestScheduler } = require('jest-cli');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test('Verifica se, ao executar a função getSavedCartItems, o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  test('Verifica se, ao executar, getSaveCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro', () => {
    expect(localStorage.getItem).toHaveBeenCalled('cartItems');
  })
});
