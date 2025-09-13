// src/components/ServicesSection.tsx

import Image from "next/image";

const services = [
  {
    title: "Writing & Essays",
    points: [
      "Academic Essay Writing",
      "Plagiarism-Free Research Papers",
      "Custom Case Study Solutions",
      "Creative & Blog Content Writing",
      "Professional Reports & Reviews",
    ],
    img: "/assets/Cyber2.jpeg",
  },
  {
    title: "Cybersecurity & Labs",
    points: [
      "Network Security Lab Reports",
      "Ethical Hacking & Pen Testing Tasks",
      "Wireshark Packet Analysis",
      "Security Tool Usage Guidance",
      "Cyber Risk & Compliance Reports",
    ],
    img: "/assets/Cyber2.jpeg",
  },
  {
    title: "Programming Tasks",
    points: [
      "Python, Java & C++ Tasks",
      "Data Structures & Algorithms Help",
      "Object-Oriented Programming",
      "Database Queries (SQL & NoSQL)",
      "Code Review & Debugging Services",
    ],
    img: "/assets/Cyber2.jpeg",
  },
  {
    title: "Projects & FYPs",
    points: [
      "MERN & MEAN Stack Development",
      "WordPress & Web App Creation",
      "AI & Machine Learning Models",
      "UI/UX Prototypes & Design Systems",
      "Final Year Project Documentation",
    ],
    img: "/assets/Cyber2.jpeg",
  },
  {
    title: "Homework & Coursework",
    points: [
      "Mathematics & Statistics Solutions",
      "Engineering Subject Tasks",
      "PowerPoint Case Presentations",
      "Online Class & Quiz Support",
      "Deadline-Oriented Submissions",
    ],
    img: "/assets/Cyber2.jpeg",
  },
];

const ServicesSection = () => {
  return (
    <section
      className="relative py-20 text-white bg-cover bg-center font-inter"
      style={{ backgroundImage: "url('/assets/Cyber2.jpeg')" }}
      id="services"
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative container mx-auto px-4 text-center z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Professional Academic &amp; Technical Services
        </h2>
        <p className="text-gray-200 max-w-3xl mx-auto mb-12">
          We offer high-quality, deadline-driven support for your assignments,
          coding projects, lab tasks, and final year submissions — tailored to
          boost performance and save your time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border-2 border-white/30 flex flex-col justify-between"
            >
              <Image
                src={service.img}
                alt={service.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-left text-white flex-1">
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <ul className="space-y-2 text-sm mb-6">
                  {service.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-400">✔</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-4 mt-auto">
                  <button className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white text-sm transition">
                    Apply Now
                  </button>
                  <button className="px-4 py-2 rounded-md bg-transparent border border-white hover:bg-white hover:text-black text-sm transition">
                    View Work
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
