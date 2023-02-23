import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import rownok from "../../assets/rownok.png";
import { TbPhoto } from "react-icons/tb";
import { RiFileGifFill } from "react-icons/ri";
import { FiSmile } from "react-icons/fi";
const PostCreate = () => {
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className="w-[900px] items-start  bg-white border border-gray-200 shadow-md px-4 py-4 rounded-xl">
      <img className="w-10" src={rownok} alt="user image" />
      <div className="flex gap-5 items-center">
        <textarea
          className="px-2 py-2 outline-none font-medium"
          placeholder="What's on your mind"
          name=""
          id=""
          cols="100"
          rows="5"
        ></textarea>
      </div>
      <div className="flex  items-center justify-between mt-5">
        <div className="flex gap-5">
          <TbPhoto className="text-3xl cursor-pointer" onClick={openModal} />

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <div class="flex items-center justify-center w-full">
                        <label
                          for="dropzone-file"
                          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
                        >
                          <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              aria-hidden="true"
                              class="w-10 h-10 mb-3 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <p class="mb-2 text-sm text-black ">
                              <span class="font-semibold">Click to upload</span>{" "}
                              or drag and drop
                            </p>
                            <p class="text-xs text-black ">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            class="hidden"
                          />
                        </label>
                      </div>
                      <div className="flex justify-end mt-5">
                        <button
                          className="btn btn-primary capitalize rounded-full"
                          onClick={closeModal}
                        >
                          Upload
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
          <RiFileGifFill className="text-3xl cursor-pointer" />
          <FiSmile className="text-3xl cursor-pointer" />
        </div>
        <button className="btn btn-sm btn-primary capitalize rounded-full">
          Create Post
        </button>
      </div>
    </div>
  );
};

export default PostCreate;
