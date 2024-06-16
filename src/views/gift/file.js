// Define an array of colors
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

// Shuffle function to randomly reorder the array
const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

// Shuffle the colorOptions array to get a random order
const shuffledColors = shuffleArray([...colorOptions]);

// Define the sectors array
const sectors = [
	{label: '1', name: 'Đi ăn trứng cút :))'},
	{label: '2', name: 'Đi coi phim :))'},
	{label: '3', name: 'Được cắn anh :))'},
	{label: '4', name: 'Đóng phim bồ ck con dâu :))'},
	{label: '5', name: 'Đi ăn buffet :))'},
	{label: '6', name: 'Được 1 cái ôm thật chặt, thật lâu và lãng mạn :))'},
	{label: '7', name: 'Chúc bạn may mắn lần sau :))'},
];

// Assign colors from the shuffled array to each sector object
sectors.forEach((sector, index) => {
	sector.color = shuffledColors[index];
});

// Generate random float in range min-max:
const rand = (m, M) => Math.random() * (M - m) + m;

const tot = sectors.length;
const elSpin = document.querySelector('#spin');
const ctx = document.querySelector('#wheel').getContext`2d`;
const dia = ctx.canvas.width;
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;
const arc = TAU / tot;
const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
const angVelMin = 0.002; // Below that number will be treated as a stop
let angVelMax = 0; // Random ang.vel. to accelerate to
let angVel = 0; // Current angular velocity
let ang = 0; // Angle rotation in radians
let isSpinning = false;
let isAccelerating = false;
let animFrame = null; // Engine's requestAnimationFrame
let result = null;

//* Get index of current sector */
const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

//* Draw sectors and prizes texts to canvas */
const drawSector = (sector, i) => {
	const ang = arc * i;
	ctx.save();
	// COLOR
	ctx.beginPath();
	ctx.fillStyle = sector.color;
	ctx.moveTo(rad, rad);
	ctx.arc(rad, rad, rad, ang, ang + arc);
	ctx.lineTo(rad, rad);
	ctx.fill();
	// TEXT
	ctx.translate(rad, rad);
	ctx.rotate(ang + arc / 2);
	ctx.textAlign = 'right';
	ctx.fillStyle = '#fff';
	ctx.font = 'bold 30px sans-serif';
	ctx.fillText(sector.label, rad - 10, 10);
	//
	ctx.restore();
};

//* CSS rotate CANVAS Element */
const rotate = () => {
	const sector = sectors[getIndex()];
	ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
	elSpin.textContent = !angVel ? 'SPIN' : sector.label;
	elSpin.style.background = !angVel ? '#000' : sector.color;
	result = sector.name;

	// console.log('rotate');
};

const frame = () => {
	if (!isSpinning) {
		cancelAnimationFrame(animFrame);
		return;
	}

	if (angVel >= angVelMax) isAccelerating = false;

	// Accelerate
	if (isAccelerating) {
		angVel ||= angVelMin; // Initial velocity kick
		angVel *= 3; // Accelerate
	}

	// Decelerate
	else {
		isAccelerating = false;
		angVel *= friction; // Decelerate by friction

		// SPIN END:
		if (angVel < angVelMin) {
			isSpinning = false;
			angVel = 0;
			cancelAnimationFrame(animFrame);
			alert(result);
		}
	}

	ang += angVel; // Update angle
	ang %= TAU; // Normalize angle

	// console.log('frame', ang);

	rotate(); // CSS rotate!
};

const engine = () => {
	if (!isSpinning) {
		return;
	}
	// console.log('engine');
	frame();
	animFrame = requestAnimationFrame(engine);
};

elSpin.addEventListener('click', () => {
	if (isSpinning) return;
	isSpinning = true;
	isAccelerating = true;
	angVelMax = rand(0.25, 0.4);
	engine(); // Start engine!
});

// INIT!
sectors.forEach(drawSector);
rotate(); // Initial rotation


{/* <div id="wheelOfFortune">
  <canvas id="wheel" width="300" height="300"></canvas>
  <div id="spin">SPIN asd asd asd as dasd as dasd asd asd as d</div>
</div> */}
