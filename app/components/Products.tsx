'use client';

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

import ProductsSearchResult from "./ProductsSearch/ProductsSearchResult";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { ProductType } from "../api/products/route";
import ProductLoading from "./ProductsSearch/ProductLoading";

export default function Products() {

  // Products Data
  const [allProductsData, setAllProductsData] = useState<ProductType[]>([]);
  const [productsData, setProductsData] = useState<ProductType[]>([]);

  const [noResults, setNoResults] = useState(false);
  
  // API Get Data
  async function fetchAPIData() {

    fetch('/api/products').then(response => response.json()).then(data => {
      setNoResults(data?.length === 0);

      setAllProductsData(data);
      setProductsData(data);
    });
    
    /*
    try {

      const get_response = await fetch('/api/products');

      if (!get_response.ok)
        console.error("Network Response Error");
      
      const products_data = await get_response.json();

      setAllProductsData(products_data);
      setProductsData(products_data);

    } catch (e) {
      console.error("API GET Response Error");

    }
      */

  }

  ////////////
  // Search
  async function searchByText(e: ChangeEvent<HTMLInputElement>) {

    const termToSearch = e.target.value;
    
    if(termToSearch === ""){
      setProductsData(allProductsData);
      setNoResults(false);
      return;
    }

    const searchTerms = termToSearch
    .toLowerCase()
    .split(" ")
    .map(t => t.replace(/[^a-zA-Z0-9/]/g, ""))
    .filter(t => t.trim() !== "");

    const filteredProducts = allProductsData.filter((product: ProductType) => {

      return searchTerms.every(searchTerm => {

        // Most Used Terms
        if(
          product.name.toLowerCase().includes(searchTerm)
          ||
          product.model.toLowerCase().includes(searchTerm)
        )
          return true;

        // Cars Terms
        if(product.cars && Array.isArray(product.cars)) {
          const carMatch = product.cars.some((car: string) => {
            return car.toLowerCase().includes(searchTerm);

          });

          if(carMatch) return true;

        }

        // Other Product Info Terms
        return Object.entries(product).some(([key, value]) => {

          if(['cars', 'name', 'model'].includes(key) || !value) return false;

          if(Array.isArray(value)) {
            return value.some(item => {
              item.toString().toLowerCase().includes(searchTerm);
              
            });
          }

          return value.toString().toLowerCase().includes(searchTerm);

        })

      })

    })

    if(filteredProducts.length === 0){
      setNoResults(true);

    }else{
      setNoResults(false);

    }

    setProductsData(filteredProducts);

  }

  ////////////

  // Use Effect On Init Execution
  useEffect(() => {
    fetchAPIData();

  }, []);

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
            className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
            onChange={e => searchByText(e)}
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
      <Suspense fallback={<ProductLoading />}>

        <ProductsSearchResult products={productsData} noResults={noResults}></ProductsSearchResult>

      </Suspense>

    </div>
  )
}
