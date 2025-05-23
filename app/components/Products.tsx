'use client';

import { Suspense, useState } from "react";
import ProductList from "./ProductList";
import SearchInput from "./SearchInput";
import Loading from "./Loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity // Pra somente efetuar uma requisição quando carregar ou der refresh na página
    }
  }
});

export default function Products() {
  // Toda mudança nesse campo, disparado pelo componente SearchInput, 
  // vai forçar a re-renderização do componente ProductList, 
  // renderizando o Loading enquanto não finaliza o mesmo.
  const [searchTokensInLowerCase, setSearchTokensInLowerCase] = useState<string[]>([]);
  return (
    // Main Container
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
