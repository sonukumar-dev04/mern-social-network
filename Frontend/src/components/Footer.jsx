const Footer = () => {
  const year = new Date().getFullYear();

  const links = ["About", "Privacy", "Terms", "Help", "Careers"];

  return (
    <footer className="bg-gray-200 py-8 pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-3">
        {/* Links */}
        <div className="flex items-center gap-6 flex-wrap justify-center">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">
          © {year} ProNet, All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
