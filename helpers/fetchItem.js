// Adaptando para passar no requisito dos testes...

const fetchItem = async (id) => {  
  // const id = event.target.parentElement.firstChild.innerText;
  const url = `https://api.mercadolibre.com/items/${id}`;
  try {
  const response = await fetch(url);
  const data = await response.json();
  return data; 
} catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
