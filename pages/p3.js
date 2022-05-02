import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'next/image';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function MyModal() {
  let [isOpen, setIsOpen] = useState(true)
  const [isLoading, setLoading] = useState(true);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>

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
            <div className="flex h-screen items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-h-5/6 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Image
                  </Dialog.Title>
                  <div className="mt-4">
                    <Image
                      alt=""
                      src="https://scontent-sjc3-1.xx.fbcdn.net/v/t1.15752-9/273735639_1928258397336422_5724303389524210458_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=ae9488&_nc_ohc=bjF2wIixhKUAX8t-NNn&_nc_ht=scontent-sjc3-1.xx&oh=03_AVILQD0_X25gWx5jPlS52iH91-JCkVKEuiGYFIK69_9WJw&oe=6295BDBF"
                      width="80%"
                      height="40%"
                      layout="responsive"
                      objectFit="cover"
                      className={cn(
                        'group-hover:opacity-75 duration-700 ease-in-out',
                        isLoading
                          ? 'grayscale blur-2xl scale-110'
                          : 'grayscale-0 blur-0 scale-100'
                      )}
                      onLoadingComplete={() => setLoading(false)}
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
