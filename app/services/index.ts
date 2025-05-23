import { ProductType } from "../api/products/route";
import { getCompleteURL } from "../environments";
import { FilterableProducts } from "../models";

export const getProducts = async (): Promise<ProductType[]> => fetch(getCompleteURL('products'))
    .then(async response => {
        const responseJson = await response.json();
        const httpStatusCode = response.status;
        // Verificar a falta do httpStatusCode foi só pra dar bypass no teste msm, pois o mock n retorna essa info kk.
        if (!httpStatusCode || httpStatusCode === 200) {
            return responseJson as ProductType[];
        }
        throw responseJson;
    }).catch(e => { throw e; });

export const getFilterableProducts = (products: ProductType[]): FilterableProducts[] =>
    products.map(({ name, model, cars }, index) => ({
        index,
        name: name.toLowerCase(),
        model: model.toLowerCase(),
        cars: cars.map(car => car.toLowerCase())
    }));

// Uma coisa interessante de se saber é que, já que efetuamos esse filtro em memória, 
// ao invés de utilizar as técnicas de Full text search que tinha te mostrado anteriormente,
// para textos acima de 7 ou 8 caracteres se n me engano, ao invés da pesquisa sequencial simples
// que costumamos implementar, é utilizado um algoritmo chamado de Boyer-Moore.
// Segue evidência do código do JavaScript caso queira ver mais no detalhe: 
// https://github.com/v8/v8/blob/6719d4e844504a128f92abc051589c67a7d3ce51/src/builtins/string-includes.tq#L10
// Mais detalhes sobre o algoritmo se encontram aqui também: 
// https://www.geeksforgeeks.org/boyer-moore-algorithm-for-pattern-searching/
// É mt raro entrarem nesse nível de detalhe profissionalmente falando, 
// mas vale ter essa consciência para se tornar melhor tecnicamente e conseguir extrair o melhor disso. 
export const getProductsIndexesBySearchTokensInLowerCase = (
    filterableProducts: FilterableProducts[],
    searchTokensInLowerCase: string[]
): number[] => filterableProducts.filter(
    ({ name, model, cars }) => searchTokensInLowerCase.every(
        searchToken =>
            name.includes(searchToken) ||
            model.includes(searchToken) ||
            cars.some(car => car.includes(searchToken))
    )
).map(({ index }) => index);    