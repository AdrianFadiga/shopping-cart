const fetchProducts = async ($QUERY) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${$QUERY}`;  
  const result = await fetch(url);
  const data = await result.json();
  return data;
  };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
