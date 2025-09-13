// src/components/HowItWorks.tsx

import { FileText, Clock, MessageCircle, CheckSquare } from "lucide-react";

const steps = [
  {
    icon: <FileText className="w-8 h-8 text-blue-600" />,
    title: "Submit Your Task",
    description:
      "Use our simple form to share your assignment, project, or content writing task. Upload files and specify your deadline for fast assistance.",
  },
  {
    icon: <Clock className="w-8 h-8 text-green-600" />,
    title: "Receive a Custom Quote",
    description:
      "Our team will review your request and send a fair, personalized price estimate—tailored to your specific academic or technical requirements.",
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-yellow-500" />,
    title: "Track Progress & Communicate",
    description:
      "Stay updated on the status of your work. Communicate directly with our experts or support team through your personal dashboard anytime.",
  },
  {
    icon: <CheckSquare className="w-8 h-8 text-purple-600" />,
    title: "Download & Review Your Work",
    description:
      "Once delivered, download your assignment or project files. Need changes? Request quick revisions to ensure top quality and satisfaction.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-[#f9f9f9] text-gray-800" id="howItWorks">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">How Our Service Works</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Whether it’s an urgent assignment, programming task, or final year
          project — our process makes it easy, fast, and secure to get expert
          help.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 text-left border-[3px] border-gray-200"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
