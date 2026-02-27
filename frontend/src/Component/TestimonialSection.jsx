import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, MapPin, Heart } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Kishan KD",
    location: "Purnia City",
    shayari: "तारीफ़ क्या करूँ उसकी मिठास और तीखेपन की,",
    line2: "शुभम की पानी पूरी में बसी है रूह सुकूँ की।",
    rating: 5,
  },
  {
    id: 2,
    name: "Anjali Singh",
    location: "Line Bazar",
    shayari: "होंठों पे चटखारा और आँखों में पानी,",
    line2: "यही है शुभम पानी पूरी की असली कहानी।",
    rating: 5,
  },
  {
    id: 3,
    name: "shubham kumar",
    location: "Kishanganj",
    shayari: "रिश्ते पुराने हों या स्वाद निराला,",
    line2: "एक पत्ता पानी पूरी ने सबको संभाल डाला।",
    rating: 5,
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-20 md:mx-10 mx-4 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-3 bg-primary/10 rounded-2xl mb-4"
          >
            <Heart className="text-primary w-8 h-8 fill-primary/20" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 text-center tracking-tight">
            हमारे <span className="text-primary">चटखारे</span> के दीवाने
          </h2>
          <p className="text-slate-500 mt-4 text-center max-w-md">
            The authentic taste of Purnia, loved by every foodie.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative"
            >
              {/* The Card */}
              <div className="h-full p-8 bg-white rounded-3xl border border-slate-100 shadow-sm group-hover:shadow-2xl group-hover:border-primary/20 transition-all duration-300">
                
                {/* Lucide Quote Icon */}
                <div className="mb-6 flex justify-between items-start">
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-primary/10 transition-colors">
                    <Quote className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Shayari Content */}
                <div className="space-y-2 mb-8">
                  <p className="text-xl font-bold text-slate-800 leading-relaxed">
                    “{item.shayari}”
                  </p>
                  <p className="text-lg font-medium text-primary/80 italic">
                    {item.line2}
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-slate-100 mb-6"></div>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-12 flex justify-center items-center">
                      <span className="text-2xl uppercase">{item.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.name}</h4>
                    <div className="flex items-center text-slate-400 text-xs gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;