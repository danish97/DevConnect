import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X,  LogIn, UserPlus } from "lucide-react";
import ThemeToggle from './ThemeToggle';

const navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();
  return (
    <header className='w-full bg-primary backdrop-blur-sm shadow-sm fixed top-0 z-50'>
      <nav className='flex items-center justify-between px-4 h-16'>
        <div className='flex items-center gap-3'>
          <Link to='/' className='btn btn-primary normal-case text-xl'>
            DevConnect
          </Link>
        </div>
        {/* Middle Links */}
        <div className='hidden md:flex items-center gap-4'>
          <a href="#howitworks" className='btn btn-primary normal-case'>How It Works</a>
          <a href="#features" className='btn btn-primary normal-case'>Features</a>
        </div>
        {/* Right:login/reg links */}
        <div className='flex items-center gap-2'>
          <div className='hidden md:flex items-center gap-2'>
            <button className='btn btn-primary normal-case' onClick={() => nav('/login')}><LogIn size={18} />Login</button>
            <button className='btn btn-primary normal-case' onClick={() => nav('/register')}><UserPlus size={18} />Register</button>
            <div>
              <ThemeToggle />
            </div>
          </div>
          <div className='md:hidden btn btn-square btn-ghost z-50'>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-base-100 min-h-screen pb-4 animate-fadeIn fixed inset-0 z-40 flex flex-col items-center justify-center'>
          <div className='flex flex-col items-center gap-2'>
            <a href="#features" className='btn btn-ghost shadow-sm w-full text-2xl md:text-xl text-left' onClick={() => setIsOpen(!isOpen)}>Features</a>
            <a href="#how" className='btn btn-ghost shadow-sm w-full text-2xl md:text-xl text-left' onClick={() => setIsOpen(!isOpen)}>How It Works</a>
            <div className='flex gap-2 mt-4'>
              <button
                className='btn btn-primary w-full flex-1 flex items-center justify-center gap-2'
                onClick={() => {
                  setIsOpen(false);
                  nav('/login');
                }}
              >
                <LogIn size={18} />Login
              </button>
              <button
                className='btn btn-primary w-full flex-1 flex items-center justify-center gap-2'
                onClick={() => {
                  setIsOpen(false);
                  nav('/register');
                }}
              >
                <UserPlus size={18} />Register
              </button>
            </div>
            <div >
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default navbar
