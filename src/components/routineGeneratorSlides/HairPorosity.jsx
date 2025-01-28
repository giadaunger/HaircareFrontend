import React from 'react'
import useStore from '../../stores/store';

function HairPorosity() {
  const { formData, updateFormField } = useStore();

  const porosityTypes = [
    {
      name: 'Low Porosity',
      title: 'Low Porosity',
      description: 'Hair that resists moisture absorption',
      includes: 'Products that are lightweight and can penetrate the hair shaft. Avoid heavy oils and butters.',
    },
    {
      name: 'Normal Porosity',
      title: 'Normal Porosity',
      description: 'Hair that maintains good moisture balance',
      includes: 'Most hair products work well. Focus on maintaining the current balance.',
    },
    {
      name: 'High Porosity',
      title: 'High Porosity',
      description: 'Hair that absorbs moisture quickly but loses it easily',
      includes: 'Rich, moisturizing products and proteins to help seal the cuticle.',
    }
  ];

  const handleTypeChange = (type) => {
    updateFormField('hairPorosity', type);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-gray-600 mb-8 text-center">
        Understanding your hair porosity helps determine how well your hair absorbs and retains moisture. 
        This is crucial for selecting the right products and building an effective hair care routine.
      </p>
      
      <div className="grid grid-cols-1 gap-4">
        {porosityTypes.map((type) => (
          <button
            key={type.name}
            onClick={() => handleTypeChange(type.name)}
            className={`p-6 rounded-lg border-2 transition-all border-[#E2A3B7] ${
              formData.hairPorosity === type.name
                ? 'border-[#E2A3B7] bg-[#E2A3B7] text-white scale-95'
                : 'transform transition duration-300 hover:scale-105'
            }`}
          >
            <h3 className="font-semibold text-xl mb-2">{type.title}</h3>
            <p className={`text-sm font-medium mb-2 ${formData.hairPorosity === type.name ? 'text-white' : 'text-gray-700'}`}>
              {type.description}
            </p>
            <p className={`text-sm ${formData.hairPorosity === type.name ? 'text-white' : 'text-gray-600'}`}>
              {type.includes}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default HairPorosity