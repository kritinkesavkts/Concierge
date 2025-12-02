import React from 'react';
import { Dish } from '../types';

interface DishCardProps {
  dish: Dish;
  isRecommended?: boolean;
  reason?: string;
}

const DishCard: React.FC<DishCardProps> = ({ dish, isRecommended, reason }) => {
  // Generate a consistent pseudo-random image based on ID for demo purposes
  // using picsum or similar if needed. We'll use picsum with a seed.
  const imageUrl = `https://picsum.photos/seed/${dish.id}/400/300`;

  return (
    <div className={`group relative bg-white rounded-xl shadow-sm border transition-all duration-300 overflow-hidden flex flex-col h-full ${isRecommended ? 'border-brand-500 ring-2 ring-brand-200 shadow-md transform -translate-y-1' : 'border-brand-100 hover:shadow-md'}`}>
      
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={dish.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-0 right-0 p-2">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-brand-900 shadow-sm">
            ${dish.price}
          </span>
        </div>
        {isRecommended && (
          <div className="absolute top-0 left-0 p-2">
            <span className="bg-brand-600 text-white px-2 py-1 rounded text-xs font-bold shadow-sm flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Top Pick
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-lg font-bold text-brand-900 leading-tight">
            {dish.name}
          </h3>
        </div>
        
        <p className="text-brand-700 text-sm mb-3 line-clamp-2 flex-grow">
          {dish.description}
        </p>

        {isRecommended && reason && (
          <div className="mb-3 p-2 bg-brand-50 rounded border border-brand-200 text-xs text-brand-800 italic">
            " {reason} "
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {dish.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 text-[10px] font-medium uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-auto border-t border-brand-100 pt-3 flex justify-between items-center text-xs text-brand-500">
           <span>{dish.calories} kcal</span>
           <button className="text-brand-600 font-bold hover:text-brand-800 transition-colors">
             + Add to Order
           </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;