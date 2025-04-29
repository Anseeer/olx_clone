import React, { useState, useEffect } from 'react'
import useProductContext from '../context/useProductContext'
import { useParams } from 'react-router-dom';

export const ProductPage = () => {
    const { id } = useParams();
    const { fetchProductById } = useProductContext();
    const [product, setProduct] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchProductById(id);
            setProduct(res);
        }
        
        fetchData();
    }, [fetchProductById, id])
  
    if (!product) return <p className='flex w-full h-dvh justify-center items-center'>Loading product details...</p>;
  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden grid md:grid-cols-3 gap-6 p-6">
      <div className="md:col-span-2 items-center justify-center">
        <div className="relative px-10">
          <img 
            src={product?.images?.[currentImage]} 
            alt="OnePlus 12" 
            className="w-full h-45 md:h-96 rounded-xl"
          />
          <div className="absolute top-4 right-6 flex space-x-2">
            <button className="bg-white/50 p-2 rounded-full hover:bg-white/70 transition">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
                  <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
              </svg>
            </button>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {product?.images && product.images.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full ${
                  currentImage === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          {product.images.map((img, index) => (
            <img 
              key={index}
              src={img} 
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setCurrentImage(index)}
              className={`w-full h-20 object-cover rounded-lg cursor-pointer ${
                currentImage === index ? 'border-2 border-blue-500' : ''
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-800">₹ {product.price}</span>
          {product.featured && <span className="bg-yellow-500 text-white px-2 py-1 rounded-md text-sm">FEATURED</span>}
        </div>

        <div>
          <h1 className="text-xl font-semibold text-gray-900">{product.title}</h1>
          <p className="text-gray-600 text-sm">{(new Date(product.createdAt.seconds * 1000 + product.createdAt.nanoseconds / 1e6)).toISOString().split("T")[0]}</p>
        </div>

        <div className="flex items-center space-x-2 text-gray-600">
          <span>{product.location}</span>
        </div>

        <div className="border-t pt-4">
          <h2 className="font-semibold text-gray-800 mb-2">Details</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {product.description}
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2">
            {/* <MessageCircle /> */}
            <span>Chat with Seller</span>
          </button>
        </div>
      </div>
    </div>
  )
}
