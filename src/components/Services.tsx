import { FaLaptopCode, FaPalette, FaMobileAlt, FaSearch } from 'react-icons/fa';

const services = [
	{
		icon: <FaLaptopCode className="text-4xl text-amber-400 mb-4" />,
		title: 'Custom Website Development',
		desc: 'Modern, scalable, and secure web solutions tailored to your business needs.',
	},
	{
		icon: <FaPalette className="text-4xl text-amber-400 mb-4" />,
		title: 'UI/UX Design',
		desc: 'Beautiful, intuitive interfaces and seamless user experiences.',
	},
	{
		icon: <FaMobileAlt className="text-4xl text-amber-400 mb-4" />,
		title: 'Responsive Layouts',
		desc: 'Mobile-first, adaptive designs that look great on any device.',
	},
	{
		icon: <FaSearch className="text-4xl text-amber-400 mb-4" />,
		title: 'SEO Optimization',
		desc: 'Boost your visibility and ranking with best SEO practices.',
	},
];

const Services = () => (
	<section className="py-20 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
		<div className="container mx-auto px-4">
			<h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-white tracking-tight">
				Our Services
			</h2>
			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
				{services.map((service, i) => (
					<div
						key={i}
						className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col items-center text-center group transform hover:-translate-y-2"
					>
						<div className="animate-bounce-slow group-hover:animate-bounce text-amber-400">
							{service.icon}
						</div>
						<h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-amber-400 transition-colors duration-300">
							{service.title}
						</h3>
						<p className="text-gray-600 dark:text-gray-300 mb-4">
							{service.desc}
						</p>
					</div>
				))}
			</div>
		</div>
	</section>
);

export default Services;