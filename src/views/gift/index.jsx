import {useCallback, useEffect, useRef, useState} from 'react';

// Generate random float in range min-max:
const rand = (m, M) => Math.random() * (M - m) + m;

const sectors = [
	{label: '1', name: 'Đi ăn trứng cút :))'},
	{label: '2', name: 'Đi coi phim :))'},
	{label: '3', name: 'Được cắn anh :))'},
	{label: '4', name: 'Đóng phim bồ ck con dâu :))'},
	{label: '5', name: 'Đi ăn buffet :))'},
	{label: '6', name: 'Được 1 cái ôm thật chặt, thật lâu và lãng mạn :))'},
	{label: '7', name: 'Chúc bạn may mắn lần sau :))'},
];
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

// Shuffle function
const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

const shuffledColors = shuffleArray([...colorOptions]);
// Assign colors from the shuffled array to each sector object
sectors.forEach((sector, index) => {
	sector.color = shuffledColors[index];
});

const dia = 300; // Set your canvas width and height
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;
const arc = TAU / sectors.length;
const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
const angVelMin = 0.002; // Below that number will be treated as a stop

const GiftApp = () => {
	const [angVelMax, setAngVelMax] = useState(0); // Random ang.vel. to accelerate to
	const [angVel, setAngVel] = useState(0); // Current angular velocity
	const [ang, setAng] = useState(0); // Angle rotation in radians
	const [isSpinning, setIsSpinning] = useState(false);
	const [isAccelerating, setIsAccelerating] = useState(false);
	const [result, setResult] = useState(null);

	const canvasRef = useRef(null);
	const spinRef = useRef(null);
	const requestAni = useRef(null);
    const resultRef = useRef("");

	const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;

	const getIndex = useCallback(() => {
		return Math.floor(sectors.length - (ang / TAU) * sectors.length) % sectors.length;
	}, [ang]);

	const rotate = useCallback(() => {
		// const ctx = canvasRef.current.getContext`2d`;
		const elSpin = spinRef.current;
		const sector = sectors[getIndex()];

		if (ctx) {
			// console.log('rotate', ctx);
			ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
		}
		elSpin.style.background = !angVel ? '#000' : sector.color;
		setResult(!angVel ? 'SPIN' : sector.name);
	}, [ang, angVel, ctx, getIndex]);

	useEffect(() => {
		const drawSector = (sector, i) => {
			if (ctx) {
				const ang = arc * i;
				ctx.save();
				ctx.beginPath();
				ctx.fillStyle = sector.color;
				ctx.moveTo(rad, rad);
				ctx.arc(rad, rad, rad, ang, ang + arc);
				ctx.lineTo(rad, rad);
				ctx.fill();
				ctx.translate(rad, rad);
				ctx.rotate(ang + arc / 2);
				ctx.textAlign = 'right';
				ctx.fillStyle = '#fff';
				ctx.font = 'bold 30px sans-serif';
				ctx.fillText(sector.label, rad - 10, 10);
				ctx.restore();
			}
		};

		// INIT!
		sectors.forEach((sector, i) => drawSector(sector, i));
		rotate(); // Initial rotation
	}, [ctx, rotate]);

	const frame = useCallback(() => {
		// console.log('frame');
		setAng((prev) => prev + angVel);
		setAng((prev) => prev % TAU);

		if (!isSpinning) return;
		if (angVel >= angVelMax) setIsAccelerating(false);

		// Accelerate
		if (isAccelerating) {
			setAngVel((prevAngVel) => prevAngVel || angVelMin); // Initial velocity kick
			setAngVel((prevAngVel) => prevAngVel * 3); // Accelerate

			// setAngVel(angVel || angVelMin); // Initial velocity kick
			// setAngVel(angVel * 3); // Accelerate
		}
		// Decelerate
		else {
			setIsAccelerating(false);
			setAngVel((prevAngVel) => prevAngVel * friction); // Decelerate by friction

			// SPIN END:
			if (angVel < angVelMin) {
				setIsSpinning(false);
				setAngVel(0);
				cancelAnimationFrame(requestAni.current);
				alert(result); // result
			}
		}

		// setAng((prev) => prev + angVel);
		// setAng((prev) => prev % TAU);
		setAng((prevAng) => (prevAng + angVel) % TAU); // Update angle and Normalize angle

		rotate();
	}, [angVel, angVelMax, isAccelerating, isSpinning, result, rotate]);

	// const engine = useCallback(() => {
	// 	// console.log('engine');
	// 	frame();
	// 	requestAni.current = requestAnimationFrame(engine);
	// 	// requestAnimationFrame(engine);
	// }, [frame]);

	useEffect(() => {
        // console.log(111);
		const engine = () => {
            // console.log('engine');
			frame();
			requestAni.current = requestAnimationFrame(engine);
		};

		if (isSpinning) {
			engine();
		}

		return () => {
			if (requestAni.current) {
				cancelAnimationFrame(requestAni.current);
			}
		};
	}, [isSpinning, isAccelerating, angVelMax, frame]);

	// useEffect(() => {
	// 	const requestId = requestAni.current;
	// 	return () => {
	// 		// console.log(222);
	// 		requestAni.current = requestAnimationFrame(engine);
	// 		cancelAnimationFrame(requestId);
	// 	};
	// }, [engine]);

	// const drawSector = useCallback(
	// 	(sector, i) => {
	// 		// const ctx = canvasRef.current.getContext`2d`;
	// 		if (ctx) {
	// 			const ang = arc * i;
	// 			ctx.save();
	// 			ctx.beginPath();
	// 			ctx.fillStyle = sector.color;
	// 			ctx.moveTo(rad, rad);
	// 			ctx.arc(rad, rad, rad, ang, ang + arc);
	// 			ctx.lineTo(rad, rad);
	// 			ctx.fill();
	// 			ctx.translate(rad, rad);
	// 			ctx.rotate(ang + arc / 2);
	// 			ctx.textAlign = 'right';
	// 			ctx.fillStyle = '#fff';
	// 			ctx.font = 'bold 30px sans-serif';
	// 			ctx.fillText(sector.label, rad - 10, 10);
	// 			ctx.restore();
	// 		}
	// 	},
	// 	[ctx],
	// );

	const handleSpin = () => {
		if (isSpinning) return;
		// setIsSpinning(true);
		// setIsAccelerating(true);
		// setAngVelMax(rand(0.25, 0.4));
		setIsSpinning((prevIsSpinning) => {
			if (!prevIsSpinning) {
				setIsAccelerating(true);
				setAngVelMax(rand(0.25, 0.4));
				return true;
			}
			return prevIsSpinning;
		});
	};

	return (
		<div id='wheelOfFortune'>
			<canvas id='wheel' width={dia} height={dia} ref={canvasRef}></canvas>
			<div id='spin' onClick={handleSpin} ref={spinRef}>
				{isSpinning ? 'SPIN' : result}
			</div>
		</div>
	);
};

export default GiftApp;
