function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 bg-dark-900 border-t border-dark-600">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a href="#hero">
            <img src="/mhx_logo.png" alt="MHX" className="h-8 w-auto" />
          </a>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} MHX. All rights reserved.
          </p>

          {/* Back to Top */}
          <a
            href="#hero"
            className="text-gray-500 hover:text-accent transition-colors duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
