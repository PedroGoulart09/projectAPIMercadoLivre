const fetchProducts = async (item) => {
  try {
    const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`);
    const obj = await result.json();
    return obj;
  } catch (err) {
    return ('You must provide an url', err);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
