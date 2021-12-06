require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Verifica se fetchProducts é uma função', () => {
    expect(typeof(fetchProducts)).toBe('function');
  });
  it('Verifica se fetch é chamada quando a função fetchProducts é chamada com o argumento "computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
  fetchProducts('computador');
  expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it ('Verifica se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const result = fetchProducts('computador')
    expect(await result).toBe(computadorSearch);
  });
  it ('Verifica se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const error = await fetchProducts();
    expect(error).toEqual(new Error('You must provide an url'));
  });
});