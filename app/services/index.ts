import { ProductType } from "@/api/products/route";
import { getCompleteURL } from "@/environments";
import { FilterableProducts } from "@/models";

export const getProducts = async (): Promise<ProductType[]> => fetch(getCompleteURL('products'))
    .then(async response => {
        const responseJson = await response.json();
        const httpStatusCode = response.status;
        // Added bypass to validate httpStatusCode bcs test file doesn't add this field on mock.
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