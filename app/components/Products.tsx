'use client';

// Setup
import { ChangeEvent, useEffect, useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

// Types
import { ProductType } from "../api/products/route";

// Children Components
import ProductsSearchResult from "./ProductsSearch/ProductsSearchResult";

export default function Products() {

  // Products Data
  const [allProductsData, setAllProductsData] = useState<ProductType[]>([]);
  const [productsData, setProductsData] = useState<ProductType[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [noResults, setNoResults] = useState<boolean>(false);

  // API Get Data
  // async function fetchAPIData() {

  //   try {

  //     const get_response = await fetch('/api/products');

  //     //if (!get_response.ok)
  //       //console.error("Network Response Error"); Disabled for Dev Mode
      
  //     const products_data = await get_response.json();

  //     setAllProductsData(products_data);
  //     setProductsData(products_data);

  //   } catch (e) {
  //     // console.error("API GET Response Error"); Disabled for Dev Mode

  //   }

  // }

  ////////////
  // Search
  async function searchByText(e: ChangeEvent<HTMLInputElement>) {

    const termToSearch = e.target.value;
    
    if(termToSearch === ""){
      setProductsData(allProductsData);
      setNoResults(false);
      
      return;
    }

    // Filtered Products
    const filteredProducts = filter(allProductsData, termToSearch);

    // If No Results
    setNoResults(filteredProducts.length === 0);

    setProductsData(filteredProducts);

  }

  function filter(dataToFilter: ProductType[], termToSearch: string) {

    // Search Terms With Special Characters Filter
    const searchTerms = termToSearch
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .map(t => t.replace(/[^a-zA-Z0-9/]/g, ""))
    .filter(t => t.trim() !== "");

    return dataToFilter.filter((product: ProductType) => {
      return searchTerms.every(term => {

        // Most Used Terms
        if(
          formatStringToSearch(product.name).includes(term)
          ||
          formatStringToSearch(product.model).includes(term)
        )
          return true;

        // Cars Search Terms
        if(product.cars?.some(car => formatStringToSearch(car).includes(term))) {
          return true;

        }

        // Other Product Info Terms
        return Object.entries(product).some(([key, value]) => {

          if(['cars', 'name', 'model'].includes(key) || !value) return false;

          if(Array.isArray(value)) {
            return value.some(item => {
              formatStringToSearch(item.toString()).includes(term);
              
            });
          }

          return formatStringToSearch(value.toString()).includes(term);

        })

      })

    })

  }

  function formatStringToSearch(value: string) {
    return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  }

  ////////////

  // Use Effect On Init Execution
  useEffect(() => {
    
    const fetchAPIData = async () => {

      try{

        const fetch_response = await fetch('/api/products');
        const products_data = await fetch_response.json();

        //if (!fetch_response.ok)
          //console.error("Network Response Error"); Disabled for Dev Mode

        setAllProductsData(products_data);
        setProductsData(products_data);

        setNoResults(products_data?.length === 0);

      } catch (e) {
        // console.error("API GET Response Error"); Disabled for Dev Mode

      }

      // fetch('/api/products').then(response => response.json()).then(data => {
      //   setNoResults(data?.length === 0);

      //   setAllProductsData(data);
      //   setProductsData(data);
      // });

    }

    fetchAPIData();

  }, []);

  useMemo(() => {
    filter(allProductsData, searchQuery);

  }, [searchQuery, allProductsData]);

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
            onChange={e => {searchByText(e); setSearchQuery(e.target.value.toString())}}
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
      <ProductsSearchResult products={productsData} noResults={noResults}></ProductsSearchResult>

    </div>
  )
}
