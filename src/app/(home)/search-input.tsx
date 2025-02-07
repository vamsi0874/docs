"use client"
import { SearchIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useRef, useState } from "react";
import { useSearchParam } from "../../hooks/use-search-param";

export const SearchInput = ()=>{
    const [search,setSearch] = useSearchParam()
    const [value, setValue] = useState(search)
    const inputRef = useRef<HTMLInputElement>(null)
     

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
           

    
    }
 const handleClear = ()=>{
    setValue("")
    setSearch("")
    inputRef.current?.focus()
 }
const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setSearch(value)
    inputRef.current?.blur()
}
    return (
        <div className="flex-1 flex items-center justify-center">
        <form className="relative max-w-[720px] w-full" 
        onSubmit={handleSubmit}>
            <Input
            value={value}
            onChange={handleChange}
            ref={inputRef}
            placeholder="Search"
            className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#F9FBFD] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white"
            />
            <Button
            variant="ghost"
            size="icon"
            type="submit"
            className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
            >
            <SearchIcon />
            </Button>
        {
            value.length > 0 && (
                <div className="absolute top-0 right-0 bottom-0 flex items-center pr-3">
                    <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleClear}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Button>
                </div>
            )
        }
        </form>
        
        </div>
    );
}