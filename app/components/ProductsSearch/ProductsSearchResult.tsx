'use client'

import { useState, useEffect, Key } from 'react';

import { ProductType } from '@/app/api/products/route';
import styles from './ProductsSearchResult.module.css';
import ProductLoading from './ProductLoading';

type ProductsSearchResultProps = {
    products: Object[]
}

export default function ProductsSearchResult({ products }: ProductsSearchResultProps) {

    const [isLoading, setIsLoading] = useState(true);

    const [productsSearchResult, setProductsSearchResult] = useState<Object[]>([]);

    useEffect(() => {
        setIsLoading(true);

        if(products.length > 0){
            setProductsSearchResult(products);
            setIsLoading(false);

        }

        setIsLoading(false);

    }, [products]);

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


            {/* Loading Box */
            isLoading && <ProductLoading />
            }

            {/* No Results */
            productsSearchResult.length === 0 && !isLoading ? <h1>Nenhum produto encontrado</h1> : null
            }

            {
                productsSearchResult.map((product: any, _: Key) => {

                    {/* Product Result Box */ }
                    return <div className="
                        shadow-[3px_3px_6px_0px_rgba(0,_0,_0,_0.25)] 
                        rounded-3xl 
                        px-8 sm:px-2 py-3
                        flex xl:flex-col
                        xl:items-center
                        xl:text-center
                        h-full
                        bg-white
                    " key={_}>

                        {/* Product Image Preview */}
                        <div className="
                            size-48 sm:size-48 2xl:size-64 
                            text-center 
                            mr-3 mb-2 
                            h-full 
                            justify-center flex flex-col
                        "> 
                            <img src={product.image} alt="" title="" />

                            <h3 className="font-bold text-lg">{product.model}</h3>
                        </div>

                        {/* Product Details */}
                        <div className="border-l-4 border-black pl-5 my-5 xl:border-none xl:pl-0"> 

                            <h2 className="font-bold text-2xl mb-4">{product.name}</h2>

                            {/* Product Info Table */}
                            <div className={`flex flex-wrap items-stretch ${styles.t_dev_test}`}> 

                                <div className="mb-4">
                                    <p>Durabilidade</p>
                                    <p className="title">{product.treadwear}</p>
                                </div>

                                <div>
                                    <p>Tração</p>
                                    <p className="bold">{product.traction}</p>
                                </div>

                                <div className="mb-4">
                                    <p>Temperatura</p>
                                    <p className="bold">{product.temperature}</p>
                                </div>

                                <div>
                                    <p>Índice de velocidade</p>
                                    <p className="bold">{product.speedRating}</p>
                                </div>

                                <div>
                                    <p>Capacidade de Carga</p>
                                    <p className="bold">{product.loadIndex}</p>
                                </div>

                                <div>
                                    <p>Desenho</p>
                                    <p className="bold">{product.pattern}</p>
                                </div>

                            </div>

                        </div>

                    </div>

                })
            }


        </div>
    );

}
