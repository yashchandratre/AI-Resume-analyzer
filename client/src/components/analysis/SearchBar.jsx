import { Search } from "lucide-react";

export default function SearchBar({value,onChange}){
    return(
        <div className="relative">
            <Search
                className="absolute left-4 top-3.5 text-gray-400"
                size={18}
            />
            <input
                value={value}
                onChange={(e)=>onChange(e.target.value)}
                placeholder="Search Resume..."
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    )
}