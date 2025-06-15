// components/Footer.tsx
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MyApp. All rights reserved.
        </p>
        <ul className="flex justify-center space-x-4 mt-4">
          <li>
            <a href="/privacy" className="hover:text-gray-300">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" className="hover:text-gray-300">
              Terms of Service
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;