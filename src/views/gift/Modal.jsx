const Modal = ({isOpen, onClose, children}) => {
	const modalClass = isOpen ? 'fixed inset-0 flex items-center justify-center' : 'hidden';

	return (
		<div className={`${modalClass} z-50 bg-black bg-opacity-50`}>
			<div className='bg-white p-4 rounded-lg'>
				<button onClick={onClose} className='absolute top-0 right-0 m-4 text-gray-600'>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;
