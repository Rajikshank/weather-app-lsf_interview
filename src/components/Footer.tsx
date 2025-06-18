import React from 'react';
import { Github, Linkedin } from 'lucide-react';
 

const Footer = () => {
  return (
    <footer className="relative z-10 mt-8 border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {/* <div className="flex items-center gap-4">
            <Sun className="scale-75" />
            <span className="text-white/70 text-sm">
              Beautiful weather, beautifully presented
            </span>
          </div> */}
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 text-white/70 text-sm">
              Developed By Rajikshan
            </div>
            
            <div className="flex items-center ">
              <a 
                href="https://github.com/Rajikshank" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        
      
      </div>
    </footer>
  );
};

export default Footer;
