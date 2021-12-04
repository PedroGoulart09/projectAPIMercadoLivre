const fetchItem = async (id) => {
  try {
    const url = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const objID = await url.json();

    return objID;
  } catch (e) {
    return ('You must provide an url', e);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
