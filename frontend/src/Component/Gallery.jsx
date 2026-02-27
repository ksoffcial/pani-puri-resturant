import React, { useState } from 'react';
import { Image as ImageIcon, Eye, Maximize2, X } from 'lucide-react';

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const images = [
    "https://res.cloudinary.com/dkt7ksipv/image/upload/v1772185607/IMG_20251209_203603.jpg_1_ssnwu2.jpg",
    "https://res.cloudinary.com/dkt7ksipv/image/upload/v1772185606/IMG_20260212_234808_e3vc6e.png",
    "https://res.cloudinary.com/dkt7ksipv/image/upload/v1771580141/IMG_20260212_234839_lelhit.png",
    "https://res.cloudinary.com/dkt7ksipv/image/upload/v1771323142/IMG_20260212_234755_nsfmu9.png",
    "https://res.cloudinary.com/dkt7ksipv/image/upload/v1771494967/IMG_20260212_234818_dexgif.png"
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 mb-4">
            <ImageIcon size={18} />
            <span className="text-sm font-bold uppercase tracking-wider">Visual Treat</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
            Our <span className="text-orange-500 italic">Gallery</span>
          </h2>
          <p className="text-slate-500 max-w-md">
            See our delicious pani puri and happy customers enjoying the authentic flavors of Purnia.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((url, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-[2.5rem] bg-slate-200 aspect-square shadow-sm hover:shadow-2xl hover:shadow-orange-200 transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedImg(url)}
            >
              {/* Image */}
              <img 
                src={url} 
                alt={`Shubham Pani Puri Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30">
                    <Eye size={24} />
                  </div>
                  <div className="p-4 bg-orange-500 rounded-full text-white shadow-lg">
                    <Maximize2 size={24} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DaisyUI Modal for Preview */}
      <input 
        type="checkbox" 
        id="gallery_modal" 
        className="modal-toggle" 
        checked={!!selectedImg} 
        onChange={() => setSelectedImg(null)} 
      />
      <div className="modal modal-bottom sm:modal-middle backdrop-blur-sm transition-all" role="dialog">
        <div className="modal-box p-0 bg-transparent shadow-none max-w-4xl relative">
          <button 
            onClick={() => setSelectedImg(null)}
            className="btn btn-circle btn-sm absolute right-4 top-4 z-50 bg-white/10 text-white border-none hover:bg-orange-500"
          >
            <X size={20} />
          </button>
          
          {selectedImg && (
            <img 
              src={selectedImg} 
              className="w-full h-auto rounded-3xl border-4 border-white/10" 
              alt="Preview" 
            />
          )}
        </div>
        <label className="modal-backdrop" onClick={() => setSelectedImg(null)}>Close</label>
      </div>
    </section>
  );
};

export default Gallery;