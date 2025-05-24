import { ProductType } from "@/api/products/route";

export type FilterableProducts = Readonly<{
    readonly index: number;
    readonly name: string;
    readonly model: string;
    readonly cars: string[];
}>;

export type ProductListModel = Readonly<{
    readonly searchTokensInLowerCase: string[];
}>;

export type ProductItemModel = Readonly<{
    readonly product: ProductType;
}>;

export type SearchInputModel = Readonly<{
    readonly onSearch: (searchTokens: string[]) => void;
}>;