const Template2 = () => {
	return (
		<main className='mx-auto w-full'>
			<div className='wrapper px-4 pt-4 relative border-2 shadow-2xl border-gray-100'>
				<header className='flex justify-between h-10'>
					<svg
						className='text-orange-500'
						xmlns='http://www.w3.org/2000/svg'
						width={32}
						height={32}
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'>
						<circle cx={12} cy={12} r={1} />
						<circle cx={19} cy={12} r={1} />
						<circle cx={5} cy={12} r={1} />
					</svg>
					<div className='relative'>
						<svg
							className='absolute text-orange-500 border-white'
							viewBox='0 0 100 100'
							xmlns='http://www.w3.org/2000/svg'
							fill='currentColor'
							stroke='#fff'
							strokeWidth={3}>
							<circle cx={85} cy={15} r={15} />
						</svg>
						<img
							className='h-8 w-8 rounded-full'
							src='https://images.unsplash.com/photo-1554555819-f722cb0c01c5?ixlib=rb-	1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=80&h=80'
							alt='Profil woman'
						/>
					</div>
				</header>
				<div className='mt-3'>
					<div className='relative'>
						<span className='absolute text-gray-500 inset-y-0 left-0 pl-8 flex items-center'>
							<svg
								className='h-6 w-6'
								xmlns='http://www.w3.org/2000/svg'
								width={32}
								height={32}
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2.5'
								strokeLinecap='round'
								strokeLinejoin='round'>
								<circle cx={11} cy={11} r={8} />
								<line x1={21} y1={21} x2='16.65' y2='16.65' />
							</svg>
						</span>
						<input
							className='block w-full text-gray-600 rounded-full py-3 px-3 bg-gray-200 pl-16 text-sm font-thin pr-4 outline-none'
							type='text'
							placeholder='Pencarian...'
						/>
					</div>
					<div className='mx-auto w-4/5'>
						<img
							className='mt-8 h-32 w-full rounded-lg  mx-auto object-cover shadow-2xl'
							src='https://images.unsplash.com/photo-1550461716-dbf266b2a8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=525&q=80'
							alt='food'
						/>
						<ul className='mt-8 flex justify-between'>
							<li className='inline-block'>
								<div className='bg-pink-400 mx-auto rounded-full text-white h-10 w-10 flex justify-center items-center'>
									<svg
										className='h-5 w-5'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<path d='M3 18v-6a9 9 0 0 1 18 0v6' />
										<path d='M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z' />
									</svg>
								</div>
								<p>Semua</p>
							</li>
							<li className='inline-block'>
								<div className='border border-gray-300 mx-auto rounded-full text-gray-800 h-10 w-10 flex justify-center items-center'>
									<svg
										className='h-5 w-5'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<circle cx={12} cy={12} r={7} />
										<polyline points='12 9 12 12 13.5 13.5' />
										<path d='M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83' />
									</svg>
								</div>
								<p>Toko</p>
							</li>
							<li className='inline-block'>
								<div className='border border-gray-300 mx-auto rounded-full text-gray-800 h-10 w-10 flex justify-center items-center'>
									<svg
										className='h-5 w-5'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<rect x={2} y={3} width={20} height={14} rx={2} ry={2} />
										<line x1={8} y1={21} x2={16} y2={21} />
										<line x1={12} y1={17} x2={12} y2={21} />
									</svg>
								</div>
								<p>Kue</p>
							</li>
							<li className='inline-block'>
								<div className='border border-gray-300 mx-auto rounded-full text-gray-800 h-10 w-10 flex justify-center items-center'>
									<svg
										className='h-5 w-5'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<line x1={4} y1={9} x2={20} y2={9} />
										<line x1={4} y1={15} x2={20} y2={15} />
										<line x1={10} y1={3} x2={8} y2={21} />
										<line x1={16} y1={3} x2={14} y2={21} />
									</svg>
								</div>
								<p>Ukml</p>
							</li>
							<li className='inline-block'>
								<div className='border border-gray-300 mx-auto rounded-full text-gray-800 h-10 w-10 flex justify-center items-center'>
									<svg
										className='h-5 w-5'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<circle cx={6} cy={6} r={3} />
										<circle cx={6} cy={18} r={3} />
										<line x1={20} y1={4} x2='8.12' y2='15.88' />
										<line x1='14.47' y1='14.48' x2={20} y2={20} />
										<line x1='8.12' y1='8.12' x2={12} y2={12} />
									</svg>
								</div>
								<p>Resep</p>
							</li>
						</ul>
						<div className='flex p-2 bg-white shadow-lg rounded-lg mt-5'>
							<img
								className='h-20 w-20 rounded-lg self-center'
								src='https://images.unsplash.com/photo-1452251889946-8ff5ea7b27ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=130&h=130'
								alt='food'
							/>
							<div className='p-2 pl-3 w-full'>
								<div className='flex justify-between items-center'>
									<h3 className='font-bold inline-block'>Ice cream Cupcake</h3>
									<svg
										className='h-5 w-5 inline-block text-gray-300'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='currentColor'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
									</svg>
								</div>
								<div className='flex items-center'>
									<svg
										className='h-4 w-4 text-red-400 inline-block'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='currentColor'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
									</svg>
									<svg
										className='h-4 w-4 text-red-400 inline-block'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='currentColor'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
									</svg>
									<svg
										className='h-4 w-4 text-red-400 inline-block'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='currentColor'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
									</svg>
									<svg
										className='h-4 w-4 text-red-400 inline-block'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='currentColor'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
									</svg>
									<svg
										className='h-4 w-4 text-red-400 inline-block'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='#ccc'
										stroke='#ccc'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
									</svg>
									<span className='pl-2'>4</span>
								</div>
								<div className='text-gray-500 flex items-center justify-between'>
									<svg
										className='inline-block h-5 w-5'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<circle cx={10} cy='20.5' r={1} />
										<circle cx={18} cy='20.5' r={1} />
										<path d='M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1' />
									</svg>
									<span className='text-sm ml-2'>Agus Bakery</span>
									<span className='ml-auto text-orange-500 font-bold'>Rp25000</span>
								</div>
							</div>
						</div>
						<div className='flex p-2 bg-white shadow-lg rounded-lg mt-5'>
							<img
								className='h-20 w-20 rounded-lg self-center'
								src='https://images.unsplash.com/photo-1467453678174-768ec283a940?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=130&h=130'
								alt='food'
							/>
							<div className='p-2 pl-3 w-full'>
								<div className='flex justify-between items-center'>
									<h3 className='font-bold inline-block'>Yellow Ice cream</h3>
									<svg
										className='h-5 w-5 inline-block text-red-600'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='currentColor'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
									</svg>
								</div>
								<div className='flex items-center'>
									<svg
										className='h-4 w-4 text-red-400 inline-block'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='currentColor'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
									</svg>
									<svg
										className='h-4 w-4 text-red-400 inline-block'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='currentColor'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
									</svg>
									<svg
										className='h-4 w-4 text-red-400 inline-block'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='currentColor'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
									</svg>
									<svg
										className='h-4 w-4 text-red-400 inline-block'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='currentColor'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
									</svg>
									<svg
										className='h-4 w-4 text-red-400 inline-block'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='#ccc'
										stroke='#ccc'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
									</svg>
									<span className='pl-2'>4</span>
								</div>
								<div className='text-gray-500 flex items-center justify-between'>
									<svg
										className='inline-block h-5 w-5'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<circle cx={10} cy='20.5' r={1} />
										<circle cx={18} cy='20.5' r={1} />
										<path d='M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1' />
									</svg>
									<span className='text-sm ml-2'>Kue kami</span>
									<span className='ml-auto text-orange-500 font-bold'>Rp65000</span>
								</div>
							</div>
						</div>
						<div className='flex p-2 bg-white shadow-lg rounded-lg mt-5'>
							<img
								className='h-20 w-20 rounded-lg self-center'
								src='https://images.unsplash.com/photo-1481671703460-040cb8a2d909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=130&h=130'
								alt='food'
							/>
							<div className='p-2 pl-3 w-full'>
								<div className='flex justify-between items-center'>
									<h3 className='font-bold inline-block'>Smiling Donuts</h3>
									<svg
										className='h-5 w-5 inline-block text-red-600'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='currentColor'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
									</svg>
								</div>
								<div className='flex items-center'>
									<svg
										className='h-4 w-4 text-red-400 inline-block'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='currentColor'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
									</svg>
									<svg
										className='h-4 w-4 text-red-400 inline-block'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='currentColor'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
									</svg>
									<svg
										className='h-4 w-4 text-red-400 inline-block'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='currentColor'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
									</svg>
									<svg
										className='h-4 w-4 text-red-400 inline-block'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='currentColor'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
									</svg>
									<svg
										className='h-4 w-4 text-red-400 inline-block'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='#ccc'
										stroke='#ccc'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
									</svg>
									<span className='pl-2'>4</span>
								</div>
								<div className='text-gray-500 flex items-center justify-between'>
									<svg
										className='inline-block h-5 w-5'
										xmlns='http://www.w3.org/2000/svg'
										width={32}
										height={32}
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'>
										<circle cx={10} cy='20.5' r={1} />
										<circle cx={18} cy='20.5' r={1} />
										<path d='M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1' />
									</svg>
									<span className='text-sm ml-2'>Omaha Kue jod</span>
									<span className='ml-auto text-orange-500 font-bold'>Rp45000</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='absolute bottom-0 border-gray-100 border-2 left-0 bg-white shadow-xl rounded-full w-full h-16'>
					<ul className='flex justify-around items-center h-full'>
						<li className='text-orange-500'>
							<svg
								className='h-6 w-6'
								xmlns='http://www.w3.org/2000/svg'
								width={32}
								height={32}
								viewBox='0 0 24 24'
								fill='currentColor'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'>
								<path d='M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0' />
							</svg>
						</li>
						<li className='text-gray-400 relative'>
							<div className='absolute h-8 w-8 top-0 right-0'>
								<svg
									className='absolute text-orange-500 border-white'
									viewBox='0 0 100 100'
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									stroke='#fff'
									strokeWidth={3}>
									<circle cx={85} cy={15} r={15} />
								</svg>
							</div>
							<svg
								className='h-6 w-6'
								xmlns='http://www.w3.org/2000/svg'
								width={32}
								height={32}
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'>
								<rect x={3} y={3} width={18} height={18} rx={2} />
								<circle cx='8.5' cy='8.5' r='1.5' />
								<path d='M20.4 14.5L16 10 4 20' />
							</svg>
						</li>
						<li className='text-gray-400'>
							<svg
								className='h-6 w-6'
								xmlns='http://www.w3.org/2000/svg'
								width={32}
								height={32}
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'>
								<circle cx={10} cy='20.5' r={1} />
								<circle cx={18} cy='20.5' r={1} />
								<path d='M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1' />
							</svg>
						</li>
						<li className='text-gray-400'>
							<svg
								className='h-6 w-6'
								xmlns='http://www.w3.org/2000/svg'
								width={32}
								height={32}
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'>
								<path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
							</svg>
						</li>
					</ul>
				</div>
			</div>
		</main>
	);
};

export default Template2;
