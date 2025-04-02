import { Link } from "wouter";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--cms-primary-darker)] text-white py-6 mt-10">
      <div className="max-w-[900px] mx-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-white hover:text-[var(--cms-gray-light)] cursor-pointer">
                    About ASETT
                  </span>
                </li>
                <li>
                  <span className="text-white hover:text-[var(--cms-gray-light)] cursor-pointer">
                    Contact Us
                  </span>
                </li>
                <li>
                  <span className="text-white hover:text-[var(--cms-gray-light)] cursor-pointer">
                    FAQ
                  </span>
                </li>
                <li>
                  <span className="text-white hover:text-[var(--cms-gray-light)] cursor-pointer">
                    ASETT Glossary
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[var(--cms-gray-light)]"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.cms.gov/accessibility"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[var(--cms-gray-light)]"
                  >
                    Accessibility
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.cms.gov/about-cms/agency-information/aboutwebsite/cmsnondiscriminationnotice"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[var(--cms-gray-light)]"
                  >
                    Nondiscrimination Notice
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
              <address className="not-italic">
                <p className="mb-2">Centers for Medicare & Medicaid Services</p>
                <p className="mb-2">7500 Security Boulevard</p>
                <p className="mb-2">Baltimore, MD 21244</p>
                <p className="mb-2">
                  <a
                    href="tel:1-800-633-4227"
                    className="text-white hover:text-[var(--cms-gray-light)]"
                  >
                    1-800-MEDICARE (1-800-633-4227)
                  </a>
                </p>
              </address>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--cms-gray-dark)]">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-[var(--cms-gray-light)]">
                &copy; {currentYear} Centers for Medicare & Medicaid Services.
                All rights reserved.
              </p>
              <div className="mt-4 md:mt-0">
                <img
                  src="https://www.cms.gov/files/images/cms-logo-white-footer.png"
                  alt="CMS Logo"
                  className="h-10 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
