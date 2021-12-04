require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
describe('Desenvolva testes de no mínimo 25% de cobertura total e 100% da função fetchProducts', () => {
    it(' 1 - Teste a função fecthProducts', async () => {
        await expect(typeof fetchProducts).toBe('function');
    });
    it(' 2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
        fetchProducts('computador');
        await expect(fetch).toHaveBeenCalled();
    })
    it(' 3 - Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
        fetchProducts('computador')
        await expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    })
    it(' 4 - Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
        const teste = await fetchProducts('computador')
        expect(teste).toEqual(computadorSearch);
    })
    it(' 5 - Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error("mensagem esperada aqui") para comparar com o objeto retornado da API.', async () => {
        const teste = await fetchProducts()
        expect(teste).toEqual(new Error('You must provide an url'));
    })
});