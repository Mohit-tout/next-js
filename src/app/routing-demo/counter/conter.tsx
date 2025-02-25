'use client'
import { useState } from "react";

export const CounterPage = () => {

    const [count, setCount] = useState(0);

    return <>
        <div className="">
            <div className="p-10">
                <h1>Counter</h1>
            </div>
            <div className="p-5">
                <div>
                    Count :- {count}
                </div>
                <div className="mt-10">
                    <button
                        type="button"
                        onClick={() => setCount((prev) => prev + 1)}
                        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Increament
                    </button>
                    <button
                        type="button"
                        onClick={() => setCount((prev) => prev - 1)}
                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                        Decreament
                    </button>

                </div>
            </div>
        </div>
    </>
}
