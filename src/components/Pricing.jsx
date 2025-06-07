import React, { useState } from 'react';

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = {
    monthly: [
      {
        name: 'Basic',
        price: '$9.99',
        features: ['Feature 1', 'Feature 2', 'Basic Support'],
        popular: false
      },
      {
        name: 'Professional',
        price: '$19.99',
        features: ['All Basic features', 'Feature 3', 'Priority Support'],
        popular: true
      },
      {
        name: 'Enterprise',
        price: '$49.99',
        features: ['All Professional features', 'Feature 4', '24/7 Support'],
        popular: false
      }
    ],
    yearly: [
      {
        name: 'Basic',
        price: '$99.99',
        features: ['Feature 1', 'Feature 2', 'Basic Support'],
        popular: false
      },
      {
        name: 'Professional',
        price: '$199.99',
        features: ['All Basic features', 'Feature 3', 'Priority Support'],
        popular: true
      },
      {
        name: 'Enterprise',
        price: '$499.99',
        features: ['All Professional features', 'Feature 4', '24/7 Support'],
        popular: false
      }
    ]
  };

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Pricing Plans</h2>
        
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1">
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-6 py-2 rounded-full transition-all ${activeTab === 'monthly' ? 'bg-amber-400 text-black font-bold' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setActiveTab('yearly')}
              className={`px-6 py-2 rounded-full transition-all ${activeTab === 'yearly' ? 'bg-amber-400 text-black font-bold' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Yearly (20% off)
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans[activeTab].map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md border-t-4 transition-all duration-300 
                        ${plan.popular ? 'border-amber-400 transform md:-translate-y-4' : 'border-gray-300 dark:border-gray-600'}
                        ${hoveredPlan === index ? 'shadow-lg dark:shadow-gray-900' : ''}`}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{plan.name}</h3>
              <div className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{plan.price}
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/{activeTab === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 text-amber-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                className={`w-full py-3 px-4 rounded-md font-bold transition-all 
                          ${plan.popular ? 'bg-amber-400 hover:bg-amber-500 text-black' : 'bg-gray-800 hover:bg-gray-700 text-white dark:bg-gray-600 dark:hover:bg-gray-500'}`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;