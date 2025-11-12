import { Github, Twitter, Linkedin } from "lucide-react";
import ThemeToggle from './ThemeToggle'

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-10 border-t-2 border-primary">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-primary">DevConnect</h2>
          <p className="text-sm text-base-content/70 mt-2">
            Connecting developers. Building futures.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle/>
        </div>  
      </div>
      <div className="border-t border-base-300 mt-6 pt-4 text-center text-sm text-base-content/70">
        © {new Date().getFullYear()} DevConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
