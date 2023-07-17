import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Cell } from '../grid/Cell'
import { XCircleIcon } from '@heroicons/react/outline'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div className="absolute right-4 top-4">
                <XCircleIcon
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => handleClose()}
                />
              </div>
              <div>
                <div className="text-center" style={{fontFamily:"Sanketi"}}>
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    ವುಳಯಾಡರ ರೀತಿ
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      ೡಟ್ಟೢ ಪ್ರಯತ್ನಂಗಡುಳ್ಳೆ ಚೊಲ್ಲಽ ಗುರುತಿಪಿಯಣುಀ. ಕೂಳೆ ಕುಡುತಿಕ್ಕರಹುಡಿ ಒರೊರೢ ವಣ್ಣಮೂ ಒರೊರೢ ಸುಳೢಹಽಕುಡಂದೢ.
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="ಸಂ" />
                      <Cell value="ಕೇ" status="correct"/>
                      <Cell value="ತಿ" />
                    </div>
                    <p className="text-sm text-gray-500">
                      ರೆಂಡಾ ಚೌಕತ್ತುಳ್ಳೆ ಅಕ್ಷರು ಸರಿಯಾಹ ರಾಂದೢ. ೡಂಡಾಕ ವ್ಯಂಜನು, ಕಾಗುಣಿತು, ಒತ್ತೢಎಲ್ಲಾಮು ಸರಿ ರಾನ್ನಽ.
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="ಅ" status="inplace" />
                      <Cell value="ಲ" />
                      <Cell value="ಮಾ"  />
                      <Cell value="ರಿ" />
                    </div>
                    <p className="text-sm text-gray-500">
                      ಮುದ್ಲಾ ಚೌಕತ್ತುಳ್ಳೆ ವಂದಿಕ್ಕರ ವ್ಯಂಜನು/ಸ್ವರು ಸರಿ, ಆನಾಕ ಒತ್ತೢಇಲ್ಲಯೋ ಕಾಗುಣಿತು ಸರಿಯಿಲ್ಲ.
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="ಅ" />
                      <Cell value="ಲ" />
                      <Cell value="ಮಾ" />
                      <Cell value="ರಿ"status="present" />
                    </div>
                    <p className="text-sm text-gray-500">
                      ನಾಲಾ ಚೌಕತ್ತುಳ್ಳೆ ಇಕ್ಕರ ವ್ಯಂಜನು ಚೊಲ್ಲುಳ್ಳೆ ವರಂದೢ, ಆನಾಕ ಇಂದ ಚೌಕತ್ತುಳ್ ಅಂಡೢ.
                    </p>

                    <div className="flex justify-center mb-1 mt-4">
                      <Cell value="ದೇ" status="absent" swaraStatus="correct"/>
                      <Cell value="ಶ್ಯ" />
                      <Cell value="ಕಾಂ" status="present" swaraStatus="correct" />
                      <Cell value="ಬೋ"  />
                      <Cell value="ಧಿ" status="inplace" swaraStatus="correct"/>
                    </div>
                    <p className="text-sm text-gray-500">
                      ಮುದ್ಲಾ ಚೌಕತ್ತುಳ್ಳೆ ಇಕ್ಕರ ವ್ಯಂಜನು ಚೊಲ್ಲಿಂದುಳ್ ವರಲ್ಲಽ. ಆನಾಕ "ೀ"ಕಾರು ಅಂದ ಉಡತ್ತುಳ್ ಸರಿಯಾಹ ರಾಂದೢ.
                      ಮೂಡಾ ಚೌಕತ್ತುಳ್ಳೆ ವಂದಿಕ್ಕರ ವ್ಯಂಜನು ಚೊಲ್ಲುಳ್ಳೆ ವೋರೆ ೡಂಗೋ ವರಂದೢ.
                      ಅಂಜಾ ಚೌಕತ್ತುಳ್ಳೆ ವಂದಿಕ್ಕರ ವ್ಯಂಜನು ಪಿನ್ನ ಸ್ವರು ಸರಿ. ಒತ್ತಕ್ಷರು ತ್ಪ್ಪೢ.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
