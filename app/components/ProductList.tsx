'use client'

import { useMemo } from 'react';

import ProductItem from './ProductItem';
import { ProductListModel } from '../models';
import { getFilterableProducts, getProducts, getProductsIndexesBySearchTokensInLowerCase } from '../services';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function ProductList({ searchTokensInLowerCase }: Readonly<ProductListModel>) {
    // Por padrão, esse carinha cacheia as requisições, 
    // então não precisa efetuar esse tratamento manualmente :)
    // Usei esse cara, pois foi a lib que encontrei pra fzr a msm coisa da hook 'use' kkkkk
    const { data } = useSuspenseQuery({
        queryKey: ['products'],
        queryFn: getProducts
    });
    // Já que a consulta é feita somente uma vez e o filtro é feito em memória, 
    // já deixa os todos os produtos mais próximos do ideal para serem filtrados :)
    // Economiza o processamento de, toda vez, passar por todos os elementos
    // e deixá-los em lowerCase. 
    const filterableProducts = useMemo(() => getFilterableProducts(data), [data])
    const filteredProducts = useMemo(
        () => getProductsIndexesBySearchTokensInLowerCase(
            filterableProducts, searchTokensInLowerCase
        ).map(i => data[i]),
        [filterableProducts, searchTokensInLowerCase]
    );
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
            {/** 
             * O atributo 'key' serve para identificar qual chave pertence à um certo item de uma lista.
             * É um recurso de otimização dentro do React que permite identificar quais itens de fato vão mudar na renderização
             * e efetuá-los de acordo. 
             * Quando você define um índice de array como atributo 'key', o React pode se perder nessa identificação,
             * degradando a performance do front. Como não tem um ID (que seria o correto) e usualmente os nomes de produtos são únicos,
             * os utilizei de chave aqui nesse contexto.
             * Segue a documentação para mais detalhes: https://react.dev/learn/rendering-lists#why-does-react-need-keys
             * */}
            {filteredProducts.map(product => (<ProductItem product={product} key={product.name} />))}
            {filteredProducts.length === 0 && (
                <h1 className="absolute w-full top-[30%] left-0 text-center">Nenhum produto encontrado</h1>
            )}
        </div>
    );
};
