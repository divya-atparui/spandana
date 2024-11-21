export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact Information</h3>
              <address className="not-italic">
                <p className="mb-2">Dharmavaram-Puttaparthi Rd, Near Sai baba Nagar,</p>
                <p className="mb-2">
                  Email:{" "}
                  <a href="mailto:care@spandanahospital.com" className="hover:text-white transition-colors">
                    care@spandanahospital.com
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a href="tel:+918559225919" className="hover:text-white transition-colors">
                    +91 8559225919
                  </a>
                  {" / "}
                  <a href="tel:+918500858888" className="hover:text-white transition-colors">
                    +91 8500858888
                  </a>
                </p>
              </address>
            </div>
  
            {/* Doctors */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Doctors</h3>
              <ul className="space-y-2">
                <li>Dr.Y. Sowmya</li>
                <li>Dr.T.M. Bashir</li>
                <li>Dr. Madhavarao</li>
                <li>Dr. Rajesh</li>
              </ul>
            </div>
  
            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
              <ul className="space-y-2">
                <li>Orthopaedics</li>
                <li>Urology</li>
                <li>Paediatrics</li>
                <li>General Medicine</li>
              </ul>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} Spandana Hospital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }