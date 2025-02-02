import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useStore from '../stores/store'
import GoBackBtn from '../components/GoBackBtn'
import Loader from '../components/Loader'

function ProductPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('description');
  const { fetchProductInfo, productInfo } = useStore();

  useEffect(() => {
    fetchProductInfo(id);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id, fetchProductInfo]);

  if (!productInfo) return <div className="flex justify-center items-center min-h-screen"><Loader /></div>;

  return (
    <div className="">
      <GoBackBtn />
      <div className="w-5/6 md:w-2/3 mx-auto flex flex-col min-[1000px]:flex-row justify-center gap-10">
        {/* Product Image */}
        <div className="w-full min-[1000px]:w-1/3">
          <img src={productInfo.product_img || "/productPic.png"} alt="" className="mx-auto" />
        </div>

        {/* Product Details */}
        <div className="w-full min-[1000px]:w-2/3">
          <div className="mb-32 text-center min-[1000px]:text-left">
            <h2 className="text-4xl">{productInfo.product_name}</h2>
            <p className="text-xl">{productInfo.company}</p>
            <p>{productInfo.product_type}</p>
          </div>

          {/* Tabs */}
          <div className="w-full">
            <div className="w-full flex justify-start mb-5 border-b border-black">
              <button
                onClick={() => setActiveTab('description')}
                className={`p-2 sm:p-4 text-sm sm:text-lg font-medium rounded-t-md ${
                  activeTab === 'description'
                    ? 'text-[#E2A3B7] font-extrabold border-x border-t border-black relative -mb-[1px] bg-white'
                    : 'text-black transform transition duration-300 hover:scale-105'
                }`}
              >
                DESCRIPTION
              </button>

              <button
                onClick={() => setActiveTab('ingredients')}
                className={`p-2 sm:p-4 text-sm sm:text-lg font-medium rounded-t-md ${
                  activeTab === 'ingredients'
                    ? 'text-[#E2A3B7] font-extrabold border-x border-t border-black relative -mb-[1px] bg-white'
                    : 'text-black transform transition duration-300 hover:scale-105'
                }`}
              >
                INGREDIENTS
              </button>

              <button
                onClick={() => setActiveTab('hairType')}
                className={`p-2 sm:p-4 text-sm sm:text-lg font-medium rounded-t-md ${
                  activeTab === 'hairType'
                    ? 'text-[#E2A3B7] font-extrabold border-x border-t border-black relative -mb-[1px] bg-white'
                    : 'text-black transform transition duration-300 hover:scale-105'
                }`}
              >
                HAIR TYPE
              </button>
            </div>

            {/* Tab Content */}
            <div className="w-11/12 mx-auto">
              {activeTab === 'description' && (
                <div>
                  <p>{productInfo.description}</p>
                </div>
              )}
              {activeTab === 'ingredients' && (
                <div>
                  {productInfo.ingredients?.map((ingredient, index) => (
                    <span key={ingredient.id} className="inline mr-4">
                      {ingredient.ingredient}
                      {index < productInfo.ingredients.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
              )}
              {activeTab === 'hairType' && (
                <div>
                  <p>This product is recommended for your hair porosity type.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Store Links */}
      <div className="w-5/6 md:w-2/3 mx-auto mt-40 space-y-10 mb-20">
        <div className="bg-[#FFDFE9] w-full rounded-md flex flex-row p-4 justify-between items-center">
          <div>Logo</div>
          <div className="flex flex-row space-x-5 items-center">
            <p>95kr</p>
            <button className="bg-white text-black p-2 items-center hover:bg-gray-100 transition-colors duration-300">
              Go to store
            </button>
          </div>
        </div>
        <div className="bg-[#FFDFE9] w-full rounded-md flex flex-row p-4 justify-between items-center">
          <div>Logo</div>
          <div className="flex flex-row space-x-5 items-center">
            <p>95kr</p>
            <button className="bg-white text-black p-2 items-center hover:bg-gray-100 transition-colors duration-300">
              Go to store
            </button>
          </div>
        </div>
        <div className="bg-[#FFDFE9] w-full rounded-md flex flex-row p-4 justify-between items-center">
          <div>Logo</div>
          <div className="flex flex-row space-x-5 items-center">
            <p>95kr</p>
            <button className="bg-white text-black p-2 items-center hover:bg-gray-100 transition-colors duration-300">
              Go to store
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage