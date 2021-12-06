require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Verifica se fetchItem é uma função', () => {
    expect(typeof(fetchItem)).toBe('function');
  })
  it('Verica se fetch é chamada quando a função fetchItem é chamada com o argumento "MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica se, ao chamar a função fetchItem com o argumento MLB1615760527, a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    fetchItem('MLB1615760527')
  expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('Verifica se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
    const resultado = await fetchItem('MLB1615760527');
    expect(resultado).toBe(item);
  });
  it('Verifica se a função fetchItem seu argumento retorna um erro com a mensagem: "You must provide an url"', async () => {
    const error = await fetchItem();
    expect(error).toEqual(new Error('You must provide an url'))
  })
});
