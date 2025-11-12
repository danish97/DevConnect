import { motion } from "framer-motion";
import { Globe2, Users2, Code2, Lightbulb, ShieldCheck, MessageSquare } from "lucide-react";

const features = [
  {
    icon: <Users2 className="text-primary" size={32} />,
    title: "Developer Network",
    desc: "Connect with talented developers and expand your professional network in seconds.",
  },
  {
    icon: <Code2 className="text-primary" size={32} />,
    title: "Showcase Your Projects",
    desc: "Upload and display your latest projects, get feedback, and improve your craft.",
  },
  {
    icon: <MessageSquare className="text-primary" size={32} />,
    title: "Built-in Messaging",
    desc: "Chat and collaborate directly with developers through our secure messaging system.",
  },
  {
    icon: <Lightbulb className="text-primary" size={32} />,
    title: "Skill Discovery",
    desc: "Discover developers by skill, tech stack, or interest for faster collaboration.",
  },
  {
    icon: <ShieldCheck className="text-primary" size={32} />,
    title: "Secure & Private",
    desc: "We prioritize your privacy. Your data and communications are always protected.",
  },
  {
    icon: <Globe2 className="text-primary" size={32} />,
    title: "Global Community",
    desc: "Join developers from all over the world. Share, learn, and grow together.",
  },
];

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut",
    },
  },
});

const Features = () => {
  return (
    <section id="features" className="py-20 bg-base-100 px-6 lg:px-20">
        <motion.div
            className="text-center mb-14"
            variants={fadeIn(0.2)}
            initial='hidden'
            whileInView='show'
            viewport={{once:true}}  
        >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
               Powerfull Features 
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
                DevConnect is more than a platform — it's a thriving ecosystem where developers collaborate,
                learn, and grow together. Explore the core features that make it unique.
            </p>
        </motion.div>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
            {features.map((feature,i) => (
                <motion.div 
                    key={i}
                    variants={fadeIn(i * 0.2 + 0.3)}
                    initial='hidden'
                    whileInView='show'
                    viewport={{once:true}}
                    className="card bg-base-100 hover:scale-110 transition-all duration-300 p-6 rounded-2xl shadow-md shadow-primary"
                >
                    <div className="mb-4 flex justify-center">
                        {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
                    <p className="text-base-content/70 text-center">{feature.desc}</p>
                </motion.div>
            ))}
        </div>
    </section>
  )
}

export default Features
