require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');
describe('2 - Teste a função fecthItem', () => {
    it(' 1 - Teste se a função fetchItem é uma função', async () => {
        await expect(typeof fetchItem).toBe('function');
    });
    it(' 2 - Execute a função fetchItem com o argumento "MLB1615760527" e teste se fetch foi chamada', async () => {
        fetchItem('MLB1615760527');
        await expect(fetch).toHaveBeenCalled();
    })
    it(' 3 - Teste se, ao chamar a função fetchItems com o argumento "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
        fetchItem('MLB1615760527')
        await expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
    })
    it(' 4 - Teste se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item, que já está importado no arquivo.', async () => {
        const teste = await fetchItem('MLB1615760527')
        expect(teste).toEqual(item);
    })
    it(' 5 - Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error("mensagem esperada aqui") para comparar com o objeto retornado da API.', async () => {
        const teste = await fetchItem()
        expect(teste).toEqual(new Error('You must provide an url'));
    })
});