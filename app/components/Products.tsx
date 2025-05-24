'use client';

import { Suspense, useState } from "react";
import ProductList from "./ProductList";
import SearchInput from "./SearchInput";
import Loading from "./Loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Usually not a good practice cache forever until page (re)?load.
      // I'm doing this bcs data from API is fixed.
      staleTime: Infinity
    }
  }
});

export default function Products() {
  const [searchTokensInLowerCase, setSearchTokensInLowerCase] = useState<string[]>([]);
  return (
    <div className="w-full flex justify-center flex-col h-full">

      <SearchInput onSearch={setSearchTokensInLowerCase} />

      {/* Divider */}
      <div className="mb-4 border-b border-1"></div>

      <Suspense fallback={<Loading />}>
        <QueryClientProvider client={queryClient}>
          <ProductList searchTokensInLowerCase={searchTokensInLowerCase} />
        </QueryClientProvider>
      </Suspense>

    </div>
  )
}
