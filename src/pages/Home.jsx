import React from 'react'
import { SecondaryNav } from '../components/SecondaryNav'
import { Card } from '../components/Card'
import useProductContext from '../context/useProductContext'

export const Home = () => {
  const { products } = useProductContext();
  console.log(products)
  return (
    <>
      <SecondaryNav />

      <div className="mx-auto py-4 max-w-7xl">
        <img src="https://github.com/SHIKHIL8137/OLX-Clone-React/blob/main/src/assets/ad.jpg?raw=true" alt="" className="w-full h-20 md:h-50 object-cover rounded-lg mt-10 mb-5" />
        <div className="max-w-6xl mx-auto p-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Fresh Recommendations
          </h2>
          <div className="p-6 min-h-screen">
            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6">
              {products.map((item) => (
                <Card key={item.id} id={item.id} featured={item.featured} title={item.title} image={item.images[0]} price={item.price} location={item.location} date={item.createdAt}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
