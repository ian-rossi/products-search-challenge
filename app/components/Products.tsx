'use client';

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

import ProductsSearchResult from "./ProductsSearch/ProductsSearchResult";
import { useEffect, useState } from "react";

export default function Products() {

  // Products Data
  const [searchTerms, setSearchTerms] = useState("");

  const [productsData, setProductsData] = useState([]);

  // API Get Data
  async function fetchAPIData() {

    try {

      const get_response = await fetch('/api/products');

      if (!get_response.ok)
        throw new Error("Network Response Error");

      const products_data = await get_response.json();
      setProductsData(products_data);

    } catch (e) {
      throw new Error("API GET Response Error");

    }

  }

  // Use Effect On Init Execution
  useEffect(() => {
    fetchAPIData();

  }, []);

  return (
    // Main Container
    <div className="w-full flex justify-center flex-col h-full">

      {/* Search Input */}
      <div className="border-gray-500 w-1/2 mx-auto mb-4">

        <label htmlFor="search" className="block text-sm/6 font-medium text-gray-900">
          Pesquisa
        </label>

        <div className="mt-2 grid grid-cols-1">

          <input
            id="search"
            name="search"
            type="search"
            placeholder="Pesquisar produtos"
            className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
            onChange={e => setSearchTerms(e.target.value)}
          />

          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
          />

        </div>

      </div>

      {/* Divider */}
      <div className="mb-4 border-b border-1"></div>

      {/* Products Search Result */}
      <ProductsSearchResult data-testid="product" products={productsData}></ProductsSearchResult>

    </div>
  )
}
