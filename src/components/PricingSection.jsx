const pricingData = [
    {
        name: "Basic Plan",
        description: "Best choice for individuals.",
        price: "29",
        duration: "month",
        buttonText: "Get Started",
        isPopular: false,
        features: [
            "50 Tasks per Month",
            "Single User Access",
            "Basic Support",
            "No Task Sharing",
            "Limited Integrations",
        ],
    },
    {
        name: "Standard Plan",
        description: "Ideal for small teams and startups.",
        price: "59",
        duration: "month",
        buttonText: "Get Started",
        isPopular: true,
        features: [
            "500 Tasks per Month",
            "Up to 5 Users",
            "Priority Email Support",
            "Task Sharing Enabled",
            "Third-Party Integrations",
        ],
    },
    {
        name: "Premium Plan",
        description: "Perfect for large teams and enterprises.",
        price: "99",
        duration: "month",
        buttonText: "Get Started",
        isPopular: false,
        features: [
            "Unlimited Tasks",
            "Unlimited Users",
            "24/7 Priority Support",
            "Task Sharing & Collaboration",
            "Advanced Analytics & Reporting",
        ],
    },
];

const PricingSection = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-screen-xl px-4 py-6 mx-auto lg:gap-16 xl:gap-24 lg:py-10 lg:px-6">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full px-4">
                        <div className="mb-12 max-w-[510px] text-center lg:mb-20 mx-auto">
                            {/* <span className="block mb-2 text-lg font-semibold text-primary">Pricing Plans</span> */}
                            <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">Choose the Best Plan for You</h2>
                            <p className="text-base text-body-color">Find the perfect plan for your task management needs.</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center -mx-4">
                    {pricingData.map((plan, index) => (
                        <div key={index} className="w-full px-4 md:w-1/2 lg:w-1/3">
                            <div className="relative z-10 mb-10 overflow-hidden rounded-xl border border-[#E4E4E4] bg-white py-10 px-8 text-center shadow-pricing sm:p-12 lg:px-6 xl:p-14 flex flex-col h-full">
                                {plan.isPopular && (
                                    <span className="absolute right-0 top-7 z-[-1] h-14 w-14 bg-primary text-white text-xs font-semibold leading-[3.5rem] text-center rotate-45 block">
                                        Popular
                                    </span>
                                )}
                                <h3 className="mb-2 text-3xl font-bold text-dark">{plan.name}</h3>
                                <p className="mb-5 text-base text-body-color">{plan.description}</p>
                                <div className="mb-7 flex items-center justify-center">
                                    <span className="text-3xl font-semibold text-primary">${plan.price}</span>
                                    <span className="text-base font-medium text-body-color">/{plan.duration}</span>
                                </div>

                                {/* Features List */}
                                <ul role="list" className="mb-8 space-y-4 text-left flex-grow">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center space-x-3">
                                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className="inline-block rounded-lg bg-purple-600 py-3 px-6 text-base font-medium text-white transition hover:bg-purple-700">
                                    {plan.buttonText}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PricingSection;