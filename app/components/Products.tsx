'use client';

// Setup
import { useEffect, useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

// Types
import { ProductType } from "../api/products/route";

// Children Components
import ProductsSearchResult from "./ProductsSearch/ProductsSearchContainer";
import ProductLoading from "./ProductsSearch/ProductsSearchLoading";

export default function Products() {

  // Products Data
  const [productsData, setProductsData] = useState<ProductType[]>([]);

  // Search Query Terms
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Is Loading
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // API Get Data
  async function fetchAPIData() {

    setIsLoading(true);

    try {

      const fetch_response = await fetch('/api/products');
      const products_data = await fetch_response.json();

      //if (!fetch_response.ok)
      //console.error("Network Response Error"); Disabled for Dev Mode

      setProductsData(products_data);
      setIsLoading(false);

    } catch (e) {
      // console.error("API GET Response Error"); Disabled for Dev Mode

    } finally {
      setIsLoading(false);

    }

  }

  // Filtered Products
  const filteredProducts = useMemo(() => {

    // Search Terms With Special Characters Filter
    const searchTerms = searchQuery
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .split(" ")
      .map(t => t.replace(/[^a-zA-Z0-9/]/g, ""))
      .filter(t => t.trim() !== "");

    // Return Filtered Products
    return productsData.filter((product) => {

      // Prepare For Search
      const searchableTerms = [
        product.name,
        product.model,
        ...(product.cars || []),
        ...Object.values(product)
          .filter(val => val && !['cars', 'name', 'model'].includes(val as string))
          .map(String)
      ].map(formatStringToSearch);
      
      // Check If Found Some Terms
      const termsFounded: Boolean = searchTerms.every(term => 
        searchableTerms.some(text => text.includes(term))
      );

      // Return If Found
      if(termsFounded)
        return product;

    });

  }, [searchQuery, productsData]);

  ////// Search Tools
  // Format String To Search
  function formatStringToSearch(value: string) {
    return value
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9/]/g, "");

  }

  ////////////
  // Use Effect On Init Execution
  useEffect(() => {
    fetchAPIData();

  }, []);

  // Render
  return (
    // Main Container
    <div className="w-full flex justify-center flex-col h-full">

      {/* Search Input */}
      <div className="border-gray-500 w-1/2 sm:w-[80%] mx-auto mb-4">

        {/* Label */}
        <label htmlFor="search" className="block text-sm/6 font-medium text-gray-900">
          Pesquisa
        </label>

        {/* Input */}
        <div className="mt-2 grid grid-cols-1">

          <input
            id="search"
            name="search"
            type="search"
            placeholder="Pesquisar produtos"
            className="
              col-start-1 row-start-1 
              block w-full 
              rounded-md bg-white 
              py-1.5 pl-10 pr-3 
              text-base text-gray-900 
              outline outline-1 -outline-offset-1 outline-gray-300 
              placeholder:text-gray-400 
              focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 
              sm:pl-9 sm:text-sm/6
          "
            onChange={e => { setSearchQuery(e.target.value); }}
          />

          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
          />

        </div>

      </div>

      {/* Divider */}
      <div className="mb-4 border-b border-1"></div>

      {/* Products Search Result */
        isLoading
          ? <ProductLoading />
          : <ProductsSearchResult products={filteredProducts} noResults={filteredProducts.length === 0} />
      }

    </div>
  )
}
