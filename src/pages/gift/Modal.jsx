import { useRef, useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
	const modalClass = isOpen ? 'fixed inset-0 flex items-center justify-center' : 'hidden';
	const modalOverlayRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			console.log(e, modalOverlayRef.current);
			if (modalOverlayRef.current && !modalOverlayRef.current.contains(e.target)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

	return (
		<div className={`${modalClass} z-50 bg-black bg-opacity-50`}>
			<div className='bg-white p-4 rounded-lg w-[90%] max-w-[500px] relative' ref={modalOverlayRef}>
				<h2 className='text-center font-bold text-lg text-black mb-5'>Add present</h2>
				<button onClick={onClose} className='text-[25px] absolute top-1 right-2 m-2 text-gray-600'>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;
