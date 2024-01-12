// import WheelComponent from 'react-wheel-of-prizes';

import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Form from './Form';
import WheelComponent from './WheelComponent';
import Modal from './Modal';
import Swal from 'sweetalert2';
import './styles.scss';

// Shuffle function to randomly reorder the array
const shuffleArray = (arr) => {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
};

const getRandomItems = (array, numItems) => {
	// Copy the original array to avoid modifying it directly
	const newArray = [...array];

	// Shuffle the copied array
	const shuffledArray = shuffleArray(newArray);

	// Return the first numItems elements
	return shuffledArray.slice(0, numItems);
};

// Example usage
const colorOptions = [
	'#FFFE34',
	'#F9BC02',
	'#FB9902',
	'#FD5308',
	'#FE2712',
	'#A7194B',
	'#8601B0',
	'#3E01A4',
	'#0247FE',
	'#0392CE',
	'#66B132',
	'#D0E92B',
	'#009933',
];

// const segColors = ['#EE4040', '#F0CF50', '#815CD1', '#3DA5E0', '#34A24F'];
const segColors = getRandomItems(colorOptions, 5);
const segments = ['1', '2', '3', '4', '5'];

// react-wheel-of-prizes
const GiftApp = () => {
	const [data, setData] = useState([]);
	const [gender, setGender] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [winner, setWinner] = useState(null);

	useEffect(() => {
		if (winner && data.length) {
			const winnerIndex = segments.indexOf(winner);
			// alert(data[winnerIndex]);
			Swal.fire({
				title: 'Congratulations !',
				text: "You've got " + data[winnerIndex],
				icon: 'success',
			});
			setWinner(null); // reset
		}
	}, [data, winner]);

	// Get data from local storage
	useEffect(() => {
		if (gender) {
			const storageData = localStorage.getItem(`data_${gender}`);
			if (storageData) {
				setData(JSON.parse(storageData));
			}
		}
	}, [gender]);

	const openModal = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
		// setGender(null);
	}, []);

	useEffect(() => {
		if (gender) {
			openModal();
		} else {
			closeModal();
		}
	}, [closeModal, gender, openModal]);

	const onFinished = (winner) => {
		// const winnerIndex = segments.indexOf(winner);
		// if (data[winnerIndex]) {
		// 	alert(data[winnerIndex]);
		// }
		setWinner(winner);
	};

	const handleSetGender = (value) => {
		setGender(value);
	};

	const handleSetFormData = useCallback(
		(res) => {
			let newData = [];

			Object.keys(res).forEach((key) => {
				newData.push(res[key]);
			});
			setData(newData);

			if (gender) {
				localStorage.setItem(`data_${gender}`, JSON.stringify(newData));
			}
			closeModal();
		},
		[gender, closeModal]
	);

	return (
		<div>
			<h1 className='text-center font-bold text-xl md:text-[2.5rem] py-3 mb-10 text-white bg-green-600'>
				Lucky Money 2024
			</h1>
			<div className='content px-2'>
				<div className='flex items-center justify-center mx-auto my-4 flex-wrap max-w-[600px]'>
					<p className='w-full text-center mb-5 font-medium text-lg md:text-[2rem]'>You are</p>
					<button
						className={classNames('btn-gender mr-20', {
							active: gender === 'male',
						})}
						onClick={() => handleSetGender('male')}>
						<img src='/images/gift/icon-man.svg' alt='man' className='w-full' />
					</button>
					<button
						className={classNames('btn-gender ml-20', {
							active: gender === 'female',
						})}
						onClick={() => handleSetGender('female')}>
						<img src='/images/gift/icon-woman.svg' alt='woman' className='w-full max-h-[60px]' />
					</button>
				</div>

				{data.length > 0 ? (
					<WheelComponent
						segments={segments}
						segColors={segColors}
						onFinished={(winner) => onFinished(winner)}
						primaryColor='black'
						contrastColor='white'
						buttonText='Spin'
						isOnlyOnce={false}
						upDuration={500}
						downDuration={600}
						size={isMobile ? 280 : 200}
						fontFamily='Arial'
						height={600}
					/>
				) : null}
			</div>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<Form setFormValue={handleSetFormData} formData={data} />
			</Modal>
		</div>
	);
};

export default GiftApp;
