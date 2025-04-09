const Footer = () => (
    <footer className="bg-gray-900 text-center py-6 border-t border-gray-800">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <p className="text-gray-300 font-medium">&copy; 2025 404.js - Tous droits réservés</p>
                </div>
                <div className="flex space-x-6">
                    <a href="https://github.com/ABDELKRIM-ELJAMIY" className="text-gray-400 hover:text-white transition-colors">
                        GitHub
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Twitter
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Contact
                    </a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;