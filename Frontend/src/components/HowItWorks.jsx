import {delay, motion} from "framer-motion"
import {Users, MessageSquare, Code2, Rocket} from 'lucide-react'

const steps = [
  {
    icon: <Users size={32} className="text-primary" />,
    title: "1. Create Your Profile",
    description:
      "Sign up, set up your developer profile, and showcase your skills and projects.",
  },
  {
    icon: <MessageSquare size={32} className="text-primary" />,
    title: "2. Connect with Developers",
    description:
      "Follow, chat, and collaborate with other passionate developers across the world.",
  },
  {
    icon: <Code2 size={32} className="text-primary" />,
    title: "3. Share Your Projects",
    description:
      "Post your work, get constructive feedback, and learn from community discussions.",
  },
  {
    icon: <Rocket size={32} className="text-primary" />,
    title: "4. Grow Together",
    description:
      "Build meaningful connections, enhance your skills, and grow your career faster.",
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

const HowItWorks = () => {
  return (
    <section id="howitworks" className="py-20 pb-20 bg-base-100/20 text-center px-6 lg:px-20 border-t-2 border-t-primary">
      <motion.h2
        className="text-3xl lg:text-4xl font-bold mb-12"
        variants={fadeIn(0.1)}
        initial='hidden'
        whileInView='show'
        viewport={{once: true}}
      >
        How It Works
      </motion.h2>
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
      {steps.map((step, index)=>(
        <motion.div
          key={index}
          variants={fadeIn(index * 0.2 + 0.2)}
          initial='hidden'
          whileInView='show'
          viewport={{once:true}}
          className="card bg-base-100 shadow-md hover:scale-110 shadow-primary transition-all duration-300 p-6"
        >
          <div className="flex justify-center mb-4">
            {step.icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">
            {step.title}
          </h3>
          <p className="text-base-content">{step.description}</p>
        </motion.div>
      ))}
    </div>
    </section>
  )
}

export default HowItWorks
