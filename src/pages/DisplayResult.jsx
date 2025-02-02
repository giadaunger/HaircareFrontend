import React from "react";
import useStore from "../stores/store";
import { AddCircle } from "styled-icons/ionicons-outline";
import { ExternalLinkOutline } from "styled-icons/evaicons-outline";

function DisplayResult() {
  const { recommendations } = useStore();

  if (!recommendations.recommendations) {
    return <div>No recommendations available</div>;
  }

  return (
    <div className="w-11/12 sm:w-3/4 mx-auto mb-20 mt-20">
      {Object.entries(recommendations.recommendations).map(([productType, recommendation]) => (
        <div key={productType} className="mb-14 p-4 flex lg:flex-row flex-col">
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl mb-4">{productType} :</h2>
            <div className="space-y-2 w-full sm:w-1/2 mx-auto bg-blue-200 p-4 rounded">
              <img 
                src="/productPic.png" 
                alt={recommendation.main_recommendation.product_name}
                className="w-full h-48 object-scale-down rounded"
              />
              <h4 className="font-medium">{recommendation.main_recommendation.product_name}</h4>
              <p className="text-gray-600">{recommendation.main_recommendation.company}</p>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="mb-4">Similar products:</h2>
            <div className="flex flex-col gap-4 xl:flex-row">
              {recommendation.similar_products.map(product => (
                <div key={product.id} className="flex-1 bg-yellow-200 p-4 rounded">
                  <div className="flex xl:flex-col items-center">
                    <img 
                      src="/productPic.png" 
                      alt={product.product_name}
                      className="object-scale-down rounded mb-2 h-32 w-32 xl:w-full"
                    />
                    <div className="flex flex-col w-full">
                      <div className="ml-4 xl:ml-0 flex flex-col xl:items-center text-center">
                        <h4 className="font-medium">{product.product_name}</h4>
                        <p className="text-gray-600">{product.company}</p>
                      </div>
                      <div className="flex justify-between w-1/2 xl:w-full mx-auto">
                        <AddCircle className="w-10 h-10"/>
                        <ExternalLinkOutline  className="w-10 h-10"/>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayResult;