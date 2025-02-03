import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '@styled-icons/fa-solid'
import useStore from '../stores/store'
import StartSlide from '../components/routineGeneratorSlides/FirstSlide'
import HairPorosity from '../components/routineGeneratorSlides/HairPorosity'
import SelectProduct from '../components/routineGeneratorSlides/SelectProduct'
import LastSlide from '../components/routineGeneratorSlides/LastSlide'

import Shampoo from '../components/routineGeneratorSlides/productSlide/Shampoo'
import Conditioner from '../components/routineGeneratorSlides/productSlide/Conditioner'
import HairOil from '../components/routineGeneratorSlides/productSlide/HairOil'
import ScalpSerum from '../components/routineGeneratorSlides/productSlide/ScalpSerum'
import HairSerum from '../components/routineGeneratorSlides/productSlide/HairSerum'
import ScalpScrub from '../components/routineGeneratorSlides/productSlide/ScalpScrub'


function HaircareRoutineGenerator() {
  const navigate = useNavigate();
  const [currentSlideStep, setCurrentSlideStep] = useState(0);
  const { formData, error, fetchRecommendations, setIsLoading } = useStore();

  const productComponents = {
    'shampoo': Shampoo,
    'conditioner': Conditioner,
    'hair oil': HairOil,
    'scalp serum': ScalpSerum,
    'hair serum': HairSerum,
    'scalp scrub': ScalpScrub
  };
  
  const slides = [
    {
      component: <HairPorosity />,
      title: "What's Your Hair Porosity?",
    },
    {
      component: <SelectProduct />,
      title: "Select Your Essentials",
    },
    ...formData.selectedProducts.map(product => ({
      component: React.createElement(productComponents[product]),
      title: `Choose Focus Area for ${product.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`,
    })),
    {
      component: <LastSlide />,
      title: "Result",
    },
  ]
  
  const handleNext = () => {
    if (currentSlideStep < slides.length - 1) {
      setCurrentSlideStep(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentSlideStep > 0) {
      setCurrentSlideStep(prev => prev - 1);
    }
  };

  const handleFetchRecommendations = async () => {
    try {
      setIsLoading(true);
      await fetchRecommendations(formData);
      navigate('/result');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-11/12 mx-auto mb-20 mt-20">
      <div className="bg-[#FFDFE9] rounded-xl p-8 w-5/6 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">{slides[currentSlideStep].title}</h2>
          <p className="text-gray-600">Step {currentSlideStep + 1} of {slides.length}</p>
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, index) => (
              <div 
                key={index} 
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentSlideStep ? 'bg-[#E2A3B7]' : 'bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-rows-[1fr_auto] sm:grid-rows-1 grid-cols-2 sm:grid-cols-[auto_1fr_auto] gap-4 items-center">
          <button 
            onClick={handlePrevious}
            className={`p-2 col-start-1 row-start-2 sm:row-start-1 ${currentSlideStep === 0 ? 'invisible' : ''}`}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex justify-center col-span-2 row-start-1 sm:col-span-1 sm:col-start-2">
            {slides[currentSlideStep].component}
          </div>

          <button 
            onClick={handleNext}
            className={`p-2 col-start-2 row-start-2 justify-self-end sm:justify-self-start sm:row-start-1 sm:col-start-3 ${
              currentSlideStep === slides.length - 1 ? 'invisible' : ''
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="justify-center w-full flex mt-10">
          <button 
            onClick={handleFetchRecommendations}
            className={`p-2 rounded-xl border border-[#E2A3B7] bg-[#E2A3B7] text-white font-semibold text-xl ${currentSlideStep < slides.length - 1 ? 'invisible' : ''}`}>Create Routine!</button>
        </div>
      </div>
    </div>
  )
}

export default HaircareRoutineGenerator