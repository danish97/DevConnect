import { TypeAnimation } from 'react-type-animation'
import { ArrowRight } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'
import { motion } from "framer-motion";
import { useNavigate} from 'react-router-dom';

const fadeIn = (direction = "up", delay = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut",
    },
  },
});

const HeroSection = () => {

  const nav = useNavigate();
  return (

    <section id='hero' className='relative min-h-[90vh] flex flex-col lg:flex-row items-center justify-center p-4'>
      <div className='absolute inset-0 -z-10'>
        <AnimatedBackground />
      </div>
      <motion.div
        className='text-center lg:text-left max-w-xl'
        variants={fadeIn("up", 0.4)}
        initial='hidden'
        animate='show'
      >
        <motion.h1 className='text-4xl lg:text-6xl font-bold mb-4 text-center ' variants={fadeIn("up", 0.4)}>
          <TypeAnimation
            sequence={[
              "Connect",
              1500,
              "Collaborate",
              1500,
              "Grow",
              1500,
            ]}
            wrapper="span"
            speed={30}
            repeat={Infinity}
            className="text-primary "
          />
        </motion.h1>
        <motion.p className='text-base-content/70 text-lg lg:text-xl mb-6' variants={fadeIn("up", 0.6)}>
          Join a thriving community of developers. Share projects, gain feedback,
          and build meaningful connections in the world of tech.
        </motion.p >
        <div className="flex justify-center gap-4">
          <button className="btn btn-primary" onClick={() => nav('/register')}>
            Get Started <ArrowRight className="ml-2" size={18} />
          </button>
          <a className="btn btn-outline" href='#howitworks'>Learn More</a>
        </div>

      </motion.div >
    </section>
  )
}

export default HeroSection
