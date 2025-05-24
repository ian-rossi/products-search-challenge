'use client'

import { useMemo } from 'react';

import ProductItem from './ProductItem';
import { ProductListModel } from '../models';
import { getFilterableProducts, getProducts, getProductsIndexesBySearchTokensInLowerCase } from '../services';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function ProductList({ searchTokensInLowerCase }: ProductListModel) {
    // Used react-query to integrate correctly with Suspense component on React 18.
    // Recommmended way is the 'use' React hook, but it's only available on React 19.
    // Introduce a major is usually not recommended at first bcs it can break other parts of the code.
    const { data } = useSuspenseQuery({
        queryKey: ['products'],
        queryFn: getProducts
    });
    const filterableProducts = useMemo(() => getFilterableProducts(data), [data])
    const filteredProducts = useMemo(
        () => getProductsIndexesBySearchTokensInLowerCase(
            filterableProducts, searchTokensInLowerCase
        ).map(i => data[i]),
        [filterableProducts, searchTokensInLowerCase]
    );
    return (
        <div className="
            @container
            py-5
            px-8 sm:px-2 md:px-4 lg:px-6
            grid grid-cols-2 lg:grid-cols-1
            justify-center
            items-center
            gap-4
        ">
            {filteredProducts.map(product => (<ProductItem product={product} key={product.name} />))}
            {filteredProducts.length === 0 && (
                <h1 className="absolute w-full top-[30%] left-0 text-center">Nenhum produto encontrado</h1>
            )}
        </div>
    );
};
