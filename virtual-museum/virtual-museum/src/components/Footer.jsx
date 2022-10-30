import React from 'react'

const Footer = () => {
  return (
    <>
      <div className="container p-12 px-0 flex items-center justify-center md:justify-start text-2xl font-medium tracking-widest leading-tight text-gray-900 uppercase antialiased">
        {"  "}
      </div>
      <footer data-scroll-section className="p-5 mt-5 bg-white rounded-t-xl shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a className="hover:underline">UTE</a>. Trong quá trình thử nghiệm và phát triển.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                  <a href="#" className="h-5 mx-5 flex flex-col fx-underline">Dự án</a>
              </li>
              <li>
                  <a href="#" className="h-5 mx-5 flex flex-col fx-underline">Github</a>
              </li>
              <li>
                  <a href="#" className="h-5 mx-5 flex flex-col fx-underline">Giấy phép</a>
              </li>
              <li>
                  <a href="#" className="h-5 mx-5 flex flex-col fx-underline">Liên hệ</a>
              </li>
          </ul>
      </footer>
    </>
  )
}

export default Footer
