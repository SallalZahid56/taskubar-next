const HeroSection = () => {
  return (
    <section className="hero-section hero-section-bg flex flex-col items-center justify-center text-center py-12">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h1 className="font-[Cormorant_Garamond] text-[42px] md:text-[48px] leading-tight text-[#040110] mb-4">
          <span className="block">
            Get Expert Help with Assignments, FYPs &amp; Content—Delivered Fast
          </span>
          <span className="block text-[#0c8ae5]">
            We Deliver Quality Work—Fast &amp; Hassle-Free
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-3 text-[1.125rem] leading-[150%] text-[#363440] font-['Helvetica_Now_Display'] max-w-2xl mx-auto">
          From urgent assignments and final year projects to real-time production
          tasks and content writing—our expert team gets it done, so you can meet
          every deadline stress-free. 100% original. Always on time.
        </p>

        {/* Button and Tagline */}
        <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
          {/* CTA Button */}
          <a
            href="#services"
            className="clean-hero-btn w-44 h-11 relative inline-flex items-center justify-center text-white bg-[#111] hover:bg-black rounded-full overflow-hidden shadow-lg font-semibold uppercase text-[0.9rem] tracking-wide"
          >
            <span className="btn-text-one absolute transition-all top-1/2 transform -translate-y-1/2 w-full text-center">
              View Our Services
            </span>
            <span className="btn-text-two absolute transition-all top-[150%] transform -translate-y-1/2 w-full text-center">
              View Our Services
            </span>
          </a>

          {/* Badge */}
          <div className="flex flex-col items-center text-sm text-[#040110] font-medium">
            <span>✅ Trusted by 1,000+ Students</span>
            <span>⏰ 24–48hr Delivery | 💯 Original &amp; Confidential</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
