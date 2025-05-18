// Styles
import styles from './ProductsSearch.module.css';

export default function ProductLoading() {

    // Product Loading Component
    return (
        <div className="
            shadow-[3px_3px_6px_0px_rgba(0,_0,_0,_0.25)] 
            rounded-3xl
            w-1/2
            px-8 py-3
            flex
        ">

            <div className="flex animate-pulse space-x-4 w-full">

                <div className="size-48 text-center mr-3 mb-2">
                    <div className="size-40 rounded-2xl bg-gray-200 mb-3"></div>

                    <div className={`${styles.t_d22}`}></div>
                </div>

                <div className="space-y-6 pl-2 my-5 w-full">
                    <div className={`mb-8 ${styles.t_d22}`}></div>

                    <div className="space-y-3">

                        <div className={`flex flex-wrap gap-2 justify-between ${styles.t_d2}`}>
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
        </div>
    );

}
