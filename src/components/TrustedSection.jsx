import React from "react";

const TrustedSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-8 lg:px-6">
        <div className="col-span-2 mb-8">
          <p className="text-lg font-medium text-purple-600 dark:text-purple-500">Reliable Task Management</p>
          <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl dark:text-white">
            Trusted by 500,000+ professionals and 2,000+ organizations
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Our platform ensures seamless task management, collaboration, and productivity enhancements for teams and individuals.
          </p>
          <div className="pt-6 mt-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <a href="#" className="inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700">
                Learn About Our Features
                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
            <div>
              <a href="#" className="inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700">
                Explore Security & Privacy
                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
          <div>
            <h3 className="mb-2 text-2xl font-bold dark:text-white">99.9% Uptime</h3>
            <p className="font-light text-gray-500 dark:text-gray-400">Ensuring smooth and uninterrupted workflow</p>
          </div>
          <div>
            <h3 className="mb-2 text-2xl font-bold dark:text-white">500K+ Users</h3>
            <p className="font-light text-gray-500 dark:text-gray-400">Professionals rely on our tool daily</p>
          </div>
          <div>
            <h3 className="mb-2 text-2xl font-bold dark:text-white">50+ Integrations</h3>
            <p className="font-light text-gray-500 dark:text-gray-400">Seamlessly connect with your favorite tools</p>
          </div>
          <div>
            <h3 className="mb-2 text-2xl font-bold dark:text-white">10M+ Tasks Completed</h3>
            <p className="font-light text-gray-500 dark:text-gray-400">Helping teams achieve more every day</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;