import { Trophy } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t-[3px] border-primary mt-12 px-4 pt-10 pb-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="gradient-primary text-primary-foreground w-10 h-10 rounded-xl flex items-center justify-center">
              <Trophy size={20} />
            </div>
            <span className="font-black text-lg">Sportiq<span className="text-primary">FC</span></span>
          </div>
          <p className="text-sm text-muted-foreground">
            The biggest real-time sports news platform in Brazil.
          </p>
        </div>
        
        {[
          { title: 'Sports', links: ['Football', 'NBA', 'UFC', 'Premier League', 'La Liga'] },
          { title: 'Company', links: ['About Us', 'Contact', 'Careers', 'Advertise'] },
          { title: 'Legal', links: ['Terms of Use', 'Privacy', 'Cookies'] },
        ].map((section) => (
          <div key={section.title}>
            <h4 className="font-extrabold mb-3">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-[1200px] mx-auto mt-8 pt-6 border-t border-border text-center">
        <div className="flex justify-center gap-3 mb-4">
          {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((s) => (
            <a
              key={s}
              href="#"
              className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:-translate-y-1"
            >
              {s.charAt(0)}
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">© 2026 SportiqFC. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
