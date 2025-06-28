import React from "react";

function Modal({ isOpen, close, children }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute w-[80%] sm:w-[30rem] top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-4 rounded-lg z-10 text-right">
            <button
              className="text-black font-semibold hover:text-gray-700 focus:outline-none mr-2 cursor-pointer"
              onClick={close}
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
