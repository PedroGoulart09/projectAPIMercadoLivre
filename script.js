const classCart = '.cart__items';
const totalTxt = document.querySelector('.total-price');
let total = 0;
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const createElement = document.createElement(element);
  createElement.className = className;
  createElement.innerText = innerText;
  return createElement;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  const sectionPai = document.querySelector('.items');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  sectionPai.appendChild(section);
};
const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const arrayValue = [];
const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  arrayValue.push(salePrice);
  total = arrayValue.reduce((acc, value) => acc + value, 0);
  totalTxt.innerHTML = total;

  const olCarrinhoDeCompra = document.querySelector(classCart);
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  olCarrinhoDeCompra.appendChild(li);

  return li;
};

const cartItemClickListener = () => {
  const ol = document.querySelector(classCart);
  const btn = document.querySelectorAll('.item__add');
  btn.forEach((button) => button
    .addEventListener('click', async ({ target }) => {
      const nome = getSkuFromProductItem(target.parentNode);
      const result = await fetchItem(nome);
      const li = createCartItemElement(result);
      ol.appendChild(li);
      saveCartItems(ol.innerHTML);
    }));
};

const removeElement = () => {
  const ol = document.querySelector(classCart);
  ol.addEventListener('click', (event) => {
    if (event.target.matches('.cart__item')) {
      const sub = event.target.innerText.split('$');
      total -= Number(sub[1]);
      totalTxt.innerHTML = total;
      ol.removeChild(event.target);
      saveCartItems(ol.innerHTML);
    }
  });
};

const limparCarrinho = () => {
  const limpar = document.querySelector('.empty-cart');
  const cartItems = document.querySelector(classCart);
  limpar.addEventListener('click', () => {
    cartItems.innerHTML = '';
  });
};

const getLocalStorage = () => {
  const saveLocalStorage = getSavedCartItems();
  const ol = document.querySelector('.cart__items');
  ol.innerHTML = saveLocalStorage;
};

const removeLoading = () => {
  const creatP = document.createElement('p');
  creatP.className = 'loading';
  document.body.append(creatP);
  creatP.innerHTML = 'carregando...';
  setTimeout(() => {
    document.body.removeChild(creatP);
  }, 2000);
};

const destructionFetchProducts = async (item) => {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}`);
  const data = await result.json();
  const objArray = data.results.map((e) => ({ name: e.title, image: e.thumbnail, sku: e.id }));
  return objArray;
};

window.onload = async () => {
  const idApi = await destructionFetchProducts('computador');
  idApi.forEach((item) => createProductItemElement(item));
  cartItemClickListener();
  removeLoading();
  removeElement();
  limparCarrinho();
  getLocalStorage();
};
