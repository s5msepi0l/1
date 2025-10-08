"use client";

import { useEffect, useState } from "react";

export default function Page() {
    const [data, setData] = useState("");

    const read = async () => {
        const resp = await fetch("/api/test");
        //const Data = await resp.json();
        console.log((await resp.json()));
        setData("");
    }

    const write = async() => {
        console.log("Write");
    }

    return (<div className="flex flex-col items-center align-middle justify-center bg-gray-900 w-full m-auto h-screen ">
        <div className="
        w-1/4
        h-3/6
        flex
        flex-col
        items-center
        justify-around

        ">
            <div className="flex justify-around w-3/5">
                <button onClick={read} className="
                
                bg-indigo-600 
                hover:bg-indigo-500
                px-8
                p-1
                rounded-2xl
                font-bold
                text-lg
                font-mono
                "> Read </button>
                <button onClick={write} className="
                
                ring-gray-950
                bg-indigo-600 
                hover:bg-indigo-500
                px-8
                p-1
                rounded-2xl
                font-bold
                text-lg
                font-mono
                "> Write </button>
            </div>

            <div className="w-full h-3/5 flex flex-col mt-0 justify-center items-center">
                <h1
                className="bg-gray-800 w-4/5 rounded-t-full text-center font-bold text-gray-50"
                > Server data:</h1>
                <textarea className="
                p-1
                bg-gray-700
                font-bold
                h-full w-4/5
                resize-none
                border-none
                select-none
                focus:outline-none
                "
                readOnly={true}
                spellCheck={false}
                value={data}
                />
                
                
            </div>
        </div>
        
    
    </div>)
}