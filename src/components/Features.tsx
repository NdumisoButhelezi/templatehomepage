

const Features = () => {
  const features = [
    {
      title: 'Responsive Design',
      description: 'Fully responsive layout that looks great on all devices from mobile to desktop.'
    },
    {
      title: 'Modern Stack',
      description: 'Built with React, TypeScript, and Tailwind CSS for a modern development experience.'
    },
    {
      title: 'Easy Customization',
      description: 'Simple to customize with Tailwind utility classes and component-based architecture.'
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md border-t-4 border-amber-400 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;