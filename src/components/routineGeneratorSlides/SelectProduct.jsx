import React from 'react'
import useStore from '../../stores/store';

function SelectProduct() {
  const { formData, updateFormField } = useStore();

  const products = [
    {
      name: 'shampoo',
      title: 'Shampoo',
      description: 'Cleanses scalp and hair',
      includes: 'Essential for removing dirt, oil, and product buildup',
    },
    {
      name: 'conditioner',
      title: 'Conditioner',
      description: 'Moisturizes and detangles',
      includes: 'Helps maintain hair hydration and manageability',
    },
    {
      name: 'hair oil',
      title: 'Hair Oil',
      description: 'Deep nourishment and protection',
      includes: 'Adds shine and provides heat protection',
    },
    {
      name: 'scalp serum',
      title: 'Scalp Serum',
      description: 'Targeted scalp treatment',
      includes: 'Addresses specific scalp concerns and promotes healthy growth',
    },
    {
      name: 'hair serum',
      title: 'Hair Serum',
      description: 'Lightweight treatment for hair strands',
      includes: 'Controls frizz and adds shine without weighing hair down',
    },
    {
      name: 'scalp scrub',
      title: 'Scalp Scrub',
      description: 'Exfoliates the scalp',
      includes: 'Removes dead skin cells and product buildup',
    }
  ];

  const handleProductSelection = (productName) => {
    const updatedProducts = formData.selectedProducts.includes(productName)
      ? formData.selectedProducts.filter(p => p !== productName)
      : [...formData.selectedProducts, productName];
    updateFormField('selectedProducts', updatedProducts);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-gray-600 mb-8 text-center">
        Select the products you want to include in your hair care routine. 
        Choose based on your hair needs and desired level of care.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <button
            key={product.name}
            onClick={() => handleProductSelection(product.name)}
            className={`p-4 rounded-lg border-2 transition-all border-[#E2A3B7] h-full flex flex-col ${
              formData.selectedProducts.includes(product.name)
                ? 'border-[#E2A3B7] bg-[#E2A3B7] text-white scale-95'
                : 'transform transition duration-300 hover:scale-105'
            }`}
          >
            <h3 className="font-semibold text-lg mb-2 mx-auto">{product.title}</h3>
            <p className={`text-sm font-medium mb-2 mx-auto ${formData.selectedProducts.includes(product.name) ? 'text-white' : 'text-gray-700'}`}>
              {product.description}
            </p>
            <p className={`text-xs mt-auto ${formData.selectedProducts.includes(product.name) ? 'text-white' : 'text-gray-600'}`}>
              {product.includes}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SelectProduct