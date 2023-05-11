/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const fetchImages = async () => {
        const API_KEY = "36208340-1589197b659eba2c083d44046";
        const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setResults(data.hits);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    useEffect(() => {
        if (query.trim() !== "") {
            fetchImages();
        }
    }, [fetchImages, query]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Pixabay Image Search</h1>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search images..."
                    className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 flex-grow"
                />
                <button
                    onClick={fetchImages}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Search
                </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {results.map((image) => (
                    <img
                        key={image.id}
                        src={image.webformatURL}
                        alt={image.tags}
                        className="w-full h-auto"
                    />
                ))}
            </div>
        </div>
    );
};

export default Search;
