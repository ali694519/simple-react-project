function Footer() {
  return (
    <footer className="bg-slate-100">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center">
          © 2024 MyApp. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4">About</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4">Licensing</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
