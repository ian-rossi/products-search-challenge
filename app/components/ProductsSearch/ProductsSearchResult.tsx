'use client'

import { Key } from 'react';
import styles from './ProductsSearchResult.module.css';
import { ProductType } from '@/app/api/products/route';

type ProductsSearchResultProps = {
    products: ProductType[],
    noResults: Boolean
}

export default function ProductsSearchResult({ products, noResults }: ProductsSearchResultProps) {

    // No Results
    if (noResults)
        return <h1 className="absolute w-full top-[30%] left-0 text-center">Nenhum produto encontrado</h1>

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

            {
                products.map((product: ProductType, index: Key) => {

                    {/* Product Result Box */ }
                    return <div data-testid="product" className="
                            shadow-[3px_3px_6px_0px_rgba(0,_0,_0,_0.25)] 
                            rounded-3xl 
                            px-8 sm:px-2 py-3
                            flex xl:flex-col
                            xl:items-center
                            xl:text-center
                            h-full
                            bg-white
                        " key={index}>

                        {/* Product Image Preview */}
                        <div className={`
                                md:size-48 2xl:size-64
                                w-[20%]
                                text-center 
                                mr-3 xl:mr-0
                                sm:mb-0
                                md:my-none 2xl:my-auto
                                h-full
                                sm:justify-normal justify-center 
                                items-center
                                flex flex-col
                                ${styles.t_image_dev}
                            `}>
                            <img src={product.image} alt={product.model} title={product.model} />

                            <h3 className="font-bold text-lg">{product.model}</h3>
                        </div>

                        {/* Product Details */}
                        <div className="border-l-4 border-black pl-5 my-5 xl:border-none xl:pl-0">

                            <h2 className="font-bold text-2xl md:text-xl sm:text-lg mb-4">{product.name}</h2>

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
