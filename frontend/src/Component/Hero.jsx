import React from 'react';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-base-100 flex items-center overflow-hidden mt-5">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-12 py-12 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* --- Text Content --- */}
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="badge badge-warning gap-2 p-4 mb-6 font-bold shadow-sm">
              ✨ #1 Rated Snack Shop in Purnia
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-16">
              Deliciously Spicy, <br />
              <span className="text-orange-600 italic">Authentically </span> 
              <span className="text-yellow-500">Purnia.</span>
            </h1>

            {/* Hindi Shayari Section */}
            <div className="bg-orange-50 border-l-8 border-orange-500 p-6 mb-8 rounded-r-2xl shadow-inner">
              <p className="text-2xl md:text-3xl font-serif text-gray-800 italic leading-relaxed">
                "पूरी की खनक, पानी का स्वाद, <br />
                शुभम की पानी पूरी, हमेशा रहेगी याद।"
              </p>
            </div>

            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Made with 100% Mineral Water and our secret family spice blend. 
              Experience the crunch that everyone in Purnia is talking about!
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="btn btn-warning btn-lg text-white shadow-lg hover:scale-105 transition-transform border-none px-10">
                Order Now
              </button>
              <button className="btn btn-outline btn-lg border-2 hover:bg-orange-600 hover:border-orange-600 px-10">
                Our Menu
              </button>
            </div>
          </div>

          {/* --- Image Section --- */}
          <div className="flex-1 relative group">
            {/* Main Image Container */}
            <div className="relative z-10 w-full aspect-square md:aspect-auto">
                <img 
                    src="https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=800" 
                    alt="Pani Puri Platter" 
                    className="rounded-[2rem] md:rounded-[4rem] shadow-2xl object-cover w-full h-[400px] md:h-[600px] border-8 border-white"
                />
                
                {/* Floating "Mineral Water" Badge */}
                <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce hidden md:flex">
                    <div className="bg-blue-100 p-2 rounded-full">💧</div>
                    <div>
                        <p className="text-xs font-bold text-gray-500">Safety First</p>
                        <p className="text-sm font-black text-blue-600">Mineral Water Only</p>
                    </div>
                </div>

                {/* Floating "Quick Delivery" Badge */}
                <div className="absolute top-10 -right-5 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 hidden md:flex">
                    <div className="bg-orange-100 p-2 rounded-full">🛵</div>
                    <div>
                        <p className="text-xs font-bold text-gray-500">Fast Delivery</p>
                        <p className="text-sm font-black text-orange-600">Purnia Local</p>
                    </div>
                </div>
            </div>

            {/* Background glowing effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full blur-[100px] opacity-20 -z-10 group-hover:opacity-30 transition-opacity"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;