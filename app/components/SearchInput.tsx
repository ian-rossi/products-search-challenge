'use client';

import { useState, ChangeEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

import { SearchInputModel } from "@/models";

export default function SearchInput({ onSearch }: SearchInputModel) {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const onChangeSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchTerm(value);
        const searchTokens = value
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .split(" ")
            .map(searchToken => searchToken.replace(/[^a-zA-Z0-9/]/g, "").trim())
            .filter(searchToken => searchToken.length >= 2);
        const filteredSearchTokensLength = searchTokens
            .map(searchToken => searchToken.length)
            .reduce((prev, curr) => prev + curr, 0);
        if (filteredSearchTokensLength === 0 || filteredSearchTokensLength >= 2) {
            setIsDisabled(true);
            try {
                onSearch(searchTokens);
            } finally {
                setIsDisabled(false);
            }
        }
    };

    return (
        <div className="border-gray-500 w-1/2 sm:w-[80%] mx-auto mb-4">
            <label htmlFor="search" className="block text-sm/6 font-medium text-gray-900">
                Pesquisa
            </label>

            <div className="mt-2 grid grid-cols-1" >

                <input
                    id="search"
                    name="search"
                    type="search"
                    placeholder="Pesquisar produtos"
                    className="
                        col-start-1 row-start-1
                        block w-full
                        rounded-md bg-white disabled:bg-gray-100
                        py-1.5 pl-10 pr-3
                        text-base text-gray-900
                        outline outline-1 -outline-offset-1 outline-gray-300
                        placeholder:text-gray-400
                        focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600
                        sm:pl-9 sm:text-sm/6
                    "
                    disabled={isDisabled}
                    value={searchTerm}
                    onChange={onChangeSearchTerm}
                />

                <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
                />

            </div>
        </div>
    )
}
