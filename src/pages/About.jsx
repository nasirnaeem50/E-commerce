import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const handleJoinClick = () => {
    navigate('/careers');
  };

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        className="relative bg-gradient-to-br from-purple-800 via-indigo-700 to-blue-600 py-24 text-white"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              variants={heroVariants}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              About Our <span className="text-purple-300">Vision</span>
            </motion.h1>
            <motion.p 
              variants={heroVariants}
              className="text-xl md:text-2xl max-w-3xl mx-auto font-light"
            >
              Redefining e-commerce through innovation and customer obsession
            </motion.p>
          </motion.div>
        </div>
        
        {/* Animated decorative elements */}
        <motion.div 
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 left-1/4 w-4 h-4 rounded-full bg-purple-300 opacity-70"
        />
        <motion.div 
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-indigo-300 opacity-50"
        />
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        {/* Our Story */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-28"
        >
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              variants={fadeIn}
              className="lg:w-1/2 relative"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-20 blur-lg"></div>
              <img 
                src="/assets/images/team.jpeg" 
                alt="Our team working together" 
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover z-10"
              />
            </motion.div>
            <motion.div variants={fadeIn} className="lg:w-1/2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-4"></div>
                <span className="text-sm font-semibold text-purple-600">OUR BEGINNINGS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 leading-tight">
                From Humble <span className="text-purple-600">Beginnings</span> to Industry Leaders
              </h2>
              <p className="mb-6 text-gray-600 text-lg leading-relaxed">
                What started as three friends in a garage in 2024 has blossomed into one of the fastest-growing e-commerce platforms. 
                Our journey has been fueled by a shared passion for connecting people with products that improve their lives.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Today, we serve over 500,000 customers worldwide, but we've never lost sight of our core values: 
                authenticity, quality, and putting people first.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-28"
        >
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div variants={fadeIn}>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 leading-tight">
                Our <span className="text-purple-600">Mission</span> & Philosophy
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We're on a mission to transform online shopping into an experience that's delightful, personal, 
                and truly valuable for every customer.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                ),
                title: "Curated Excellence",
                description: "Every product undergoes rigorous testing to meet our quality standards."
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                ),
                title: "Fair Pricing",
                description: "We believe quality shouldn't come with an unreasonable price tag."
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                  </svg>
                ),
                title: "Sustainable Growth",
                description: "We're committed to ethical sourcing and environmental responsibility."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-purple-600 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-28"
        >
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div variants={fadeIn} className="lg:w-1/2 order-2 lg:order-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-4"></div>
                <span className="text-sm font-semibold text-purple-600">OUR CORE</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 leading-tight">
                The <span className="text-purple-600">Values</span> That Guide Us
              </h2>
              <p className="mb-6 text-gray-600 text-lg leading-relaxed">
                These principles shape every decision we make, from product selection to customer interactions.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Customer First",
                    description: "We listen, adapt, and go above and beyond for our customers."
                  },
                  {
                    title: "Radical Transparency",
                    description: "Honest communication builds lasting relationships."
                  },
                  {
                    title: "Continuous Learning",
                    description: "We embrace challenges as opportunities to grow."
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start"
                  >
                    <div className="bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="lg:w-1/2 order-1 lg:order-2 relative"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 blur-lg"></div>
              <img 
                src="/assets/images/value.jpeg" 
                alt="Our core values" 
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover z-10"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Team CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-purple-900 to-indigo-800 rounded-3xl overflow-hidden p-12 text-center text-white"
        >
          <div className="absolute inset-0 bg-[url('/assets/images/dots-pattern.svg')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Ready to <span className="text-purple-300">Join</span> Our Team?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              We're building the future of e-commerce and we'd love for you to be part of it.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleJoinClick}
              className="bg-white text-purple-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-xl"
            >
              Explore Career Opportunities
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;