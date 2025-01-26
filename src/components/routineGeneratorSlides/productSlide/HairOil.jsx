import React from 'react'
import useStore from '../../../stores/store';

function HairOil() {
  const { formData, updateFormField } = useStore();

  const focusAreas = [
    "Deep hydration",
    "Split end treatment",
    "Shine enhancement",
    "Frizz control",
    "Color preservation",
  ];

  const handleFocusSelection = (focus) => {
    updateFormField('selectedFocus', {
      ...formData.selectedFocus,
      'hair-oil': focus
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {focusAreas.map((focus) => (
          <button
            key={focus}
            onClick={() => handleFocusSelection(focus)}
            className={`p-3 rounded-lg border-2 transition-all text-sm ${
              formData.selectedFocus['hair-oil'] === focus
                ? 'border-[#E2A3B7] bg-[#E2A3B7] text-white scale-95'
                : 'border-[#E2A3B7] hover:scale-105'
            }`}
          >
            {focus}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HairOil