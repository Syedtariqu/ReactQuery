import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();

  // Updated to v5 syntax with the Object form
  const { data:product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetch(`https://dummyjson.com/products/${id}`).then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product details</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
    <div className="flex flex-col md:flex-row items-center">
        <img
            src={product.images[0]}
            alt={product.title}
            className="w-full md:w-1/2 rounded-lg"
        />
        <div className="md:ml-8 mt-4 md:mt-0">
            <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-semibold mb-2">Price: ${product.price}</p>
            <p className="text-lg font-semibold mb-2">Brand: {product.brand}</p>
            <p className="text-lg font-semibold mb-2">Category: {product.category}</p>
            <p className="text-lg font-semibold mb-2">Rating: {product.rating} ⭐</p>
            <p className="text-lg font-semibold mb-2">Stock: {product.stock}</p>

            <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg">
                Add to Cart
            </button>
        </div>
    </div>
</div>
  );
}

export default ProductDetails;
