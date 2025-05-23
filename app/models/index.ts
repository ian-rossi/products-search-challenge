import { ProductType } from "../api/products/route";

export type FilterableProducts = {
    readonly index: number;
    readonly name: string;
    readonly model: string;
    readonly cars: string[];
};

export type ProductListModel = {
    searchTokensInLowerCase: string[];
};

export type ProductItemModel = {
    product: ProductType;
};

export type SearchInputModel = {
    onSearch: (searchTokens: string[]) => void;
};