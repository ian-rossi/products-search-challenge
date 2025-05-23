import styles from './Products.module.css';

export default function Loading() {

    // Product Loading Component
    return (
        <div className="
            shadow-[3px_3px_6px_0px_rgba(0,_0,_0,_0.25)] 
            rounded-3xl
            animate-pulse
            space-x-4
            xl:space-x-0
            w-1/2 lg:w-full
            px-8 sm:px-2 py-3
            flex xl:flex-col
            xl:items-center
            xl:text-center
            h-full
            bg-white
        ">

            {/* Load > Product Image Preview */}
            <div className="
                md:size-48 2xl:size-64
                w-[20%]
                mr-3 xl:mr-0
                md:mb-8
                md:my-none 2xl:my-auto
                h-full
                sm:justify-normal justify-center 
                items-center
                flex flex-col
            ">
                <div className="size-40 rounded-2xl bg-gray-200 mb-3"></div>

                <div className={`w-[100%] xl:w-[80%] ${styles.product_load_skeleton_line}`}></div>
            </div>

            {/* Load > Product Details */}
            <div className="
                space-y-6 
                pl-2 
                my-5 
                xl:my-0 
                xl:pl-0
                w-full
            ">
                <div className={`mb-8 ${styles.product_load_skeleton_line}`}></div>

                <div className="space-y-3">

                    <div className={`flex flex-wrap gap-2 justify-between xl:justify-center ${styles.product_load_skeleton}`}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                </div>
            </div>

        </div>
    );

}
