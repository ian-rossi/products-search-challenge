'use client'

// Setup
import { Key, memo } from 'react';

// Types
import { ProductType } from '@/app/api/products/route';

// Children Components
import ProductBox from './ProductBox';

type ProductsSearchResultProps = {
    products: ProductType[],
    noResults: Boolean
}

const ProductsSearchResult = memo(({ products, noResults }: ProductsSearchResultProps) => {

    return (
        // Main Products List Result Wrapper
        <div className="
            @container
            py-5
            px-8 sm:px-2 md:px-4 lg:px-6
            grid grid-cols-2 lg:grid-cols-1
            justify-center
            items-center
            gap-4
        ">

            {/* Products Search Result List */
                products.map((product: ProductType, index: Key) => {
                    return <ProductBox product={product} key={index} />

                })
            }

            {/* No Results */
            noResults && <h1 className="absolute w-full top-[30%] left-0 text-center">
                Nenhum produto encontrado
            </h1>
            }

        </div>
    );

});

ProductsSearchResult.displayName = 'ProductsSearchResult';
export default ProductsSearchResult;
