import { keepPreviousData, useQuery, } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

function Products() {
    const [searchParams, setSearchParams] = useSearchParams({ skip: 0, limit: 4 });

    // we have to convert those value into number data type
    const skip = parseInt(searchParams.get('skip') || 0);
    const limit = parseInt(searchParams.get('limit') || 0);
    const q = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            return await fetch('https://dummyjson.com/products/categories').then((res) =>
                res.json()
            );
        },
    });

    const { data, isError, isLoading } = useQuery({
       queryKey: ['products', limit, skip, q, category],
        queryFn: async () => {
            let url = `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${q}`;
            if (category) {
                url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
            }
            return await fetch(url).then((res) => res.json());
        },
        placeholderData: keepPreviousData,
        //placeholderData: keepPreviousData
// The placeholderData option is a feature provided by React Query that allows you to prefill the query data with something while the real data is being fetched. This is useful when you want to avoid showing empty or "loading" UI elements, and instead, display some meaningful data while waiting for the new query to complete.

// The value of placeholderData can either be static data or a function that returns data, which is shown as a placeholder while the real query is loading.
        staleTime: 20000,
    });

    const products = data?.products;
    // console.log(products);
  
    const handleMove = (moveCount) => {
        setSearchParams((prev) => {
            prev.set('skip', Math.max(skip + moveCount, 0));
            return prev;
        });
    };

    const handleCategory = (e) => {
        setSearchParams((prev) => {
            prev.set('skip', 0);
            prev.set('category', e.target.value); // Correctly set category
            return prev;
        });
    };

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            My store
                        </h2>
                    </div>
                    <div>
                        <div className="relative mt-2 rounded-md flex items-center gap-8 mb-4">
                            <input
                                type="text"
                                name="price"
                                id="price"
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="IPhone"
                                onChange={(e)=>{
                                    setSearchParams((prev) => {
                                        prev.set('q', e.target.value);
                                        prev.set('skip', 0);
                                        prev.delete('category');
                                        return prev;
                                    });
                                }}
                            />
                            <select className="border p-2" onChange={handleCategory}>
                                <option value="">Select category</option>
                                {categories?.map((category, index) => (
                                    <option key={index} value={category.slug}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {isLoading ? (
                        <h1>Loading....</h1>
                    ) : (
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {products?.map((prod, index) => (
                                <div key={index} className="group relative">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
                                        <img
                                            src={prod.images[0]}
                                            alt="Product"
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                            <Link to={`/product/${prod.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {prod.title}
                    </Link>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{prod.category}</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">${prod.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-2 mt-12">
                        <button
                            className="bg-purple-500 px-4 py-1 text-white rounded"
                            onClick={() => handleMove(-limit)}
                        >
                            Prev
                        </button>
                        <button
                            className="bg-purple-500 px-4 py-1 text-white rounded"
                            onClick={() => handleMove(limit)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
