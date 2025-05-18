import { ProductType } from "@/app/api/products/route";

// Styles
import styles from './ProductsSearch.module.css';

export default function ProductBox({ product }: { product: ProductType }) {
    
    // Product Result Box
    return <div data-testid="product"
    className="
        shadow-[3px_3px_6px_0px_rgba(0,_0,_0,_0.25)] 
        rounded-3xl 
        px-8 sm:px-2 py-3
        flex xl:flex-col
        xl:items-center
        xl:text-center
        h-full
        bg-white
    ">

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
            ${styles.product_result_image}
        `}>
            <img src={product.image} alt={product.model} title={product.model} />

            <h3 className="font-bold text-lg">{product.model}</h3>
        </div>

        {/* Product Details */}
        <div className="border-l-4 border-black pl-5 my-5 xl:border-none xl:pl-0">

            <h2 className="font-bold text-2xl md:text-xl sm:text-lg mb-4">{product.name}</h2>

            {/* Product Info Table */}
            <div className={`flex flex-wrap items-stretch ${styles.product_result_table}`}>

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

}

ProductBox.displayName = 'ProductBox';
