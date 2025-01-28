import React from "react";
import useStore from "../stores/store";

function DisplayResult() {
  const { recommendations } = useStore();

  if (!recommendations.recommendations) {
    return <div>No recommendations available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {Object.entries(recommendations.recommendations).map(([productType, recommendation]) => (
        <div key={productType} className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 capitalize">{productType}</h2>
          
          {/* Main recommendation */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Main Recommendation</h3>
            <div className="space-y-2">
              <img 
                src={recommendation.main_recommendation.product_img} 
                alt={recommendation.main_recommendation.product_name}
                className="w-full h-48 object-cover rounded"
              />
              <h4 className="font-medium">{recommendation.main_recommendation.product_name}</h4>
              <p className="text-gray-600">{recommendation.main_recommendation.company}</p>
              <p className="text-sm text-gray-500">{recommendation.main_recommendation.description}</p>
            </div>
          </div>

          {/* Similar products */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Similar Products</h3>
            <div className="space-y-4">
              {recommendation.similar_products.map(product => (
                <div key={product.id} className="border-t pt-4">
                  <img 
                    src={product.product_img} 
                    alt={product.product_name}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <h4 className="font-medium">{product.product_name}</h4>
                  <p className="text-gray-600">{product.company}</p>
                  <p className="text-sm text-gray-500">{product.description}</p>
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