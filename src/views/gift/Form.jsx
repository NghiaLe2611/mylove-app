import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
	present1: yup.string().required('Input is required'),
	present2: yup.string().required('Input is required'),
	present3: yup.string().required('Input is required'),
	present4: yup.string().required('Input is required'),
	present5: yup.string().required('Input is required'),
});

const Form = ({ setFormValue, formData }) => {
	const {
		handleSubmit,
		control,
		reset,
		register,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			present1: '',
			present2: '',
			present3: '',
			present4: '',
			present5: '',
		},
	});

	useEffect(() => {
		reset({
			present1: formData ? formData[0] : '',
			present2: formData ? formData[1] : '',
			present3: formData ? formData[2] : '',
			present4: formData ? formData[3] : '',
			present5: formData ? formData[4] : '',
		});
	}, [formData, reset]);

	const onSubmit = (data) => {
		setFormValue(data);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='max-w-[600px] mx-auto'>
			<div className='col-span-full mb-4'>
				<div className='mt-1 md:flex'>
					<label
						htmlFor='present-1'
						className='block text-sm md:text-base md:flex font-medium text-gray-900 w-[100px]'>
						Present 1
					</label>
					{/* <Controller
						name='present1'
						control={control}
						render={({ field }) => (
							<input
								className={`custom-input ${errors && errors.present1 ? 'border-red-500' : ''}`}
								{...field}
								type='text'
								placeholder='Enter present 1'
							/>
						)}
					/> */}
					<input
						autoComplete='off'
						{...register('present1')}
						type='text'
						placeholder='Enter present 1'
						className={`custom-input ${errors && errors.present1 ? 'border-red-500' : ''}`}
					/>
					<p className='text-red-600 text-sm'>{errors.present1?.message}</p>
				</div>
			</div>
			<div className='col-span-full mb-4'>
				<div className='mt-1 md:flex'>
					<label
						htmlFor='present-2'
						className='block text-sm md:text-base md:flex font-medium text-gray-900 w-[100px]'>
						Present 2
					</label>
					<input
						autoComplete='off'
						{...register('present2')}
						type='text'
						placeholder='Enter present 2'
						className={`custom-input ${errors && errors.present2 ? 'border-red-500' : ''}`}
					/>
					<p className='text-red-600 text-sm'>{errors.present2?.message}</p>
				</div>
			</div>
			<div className='col-span-full mb-4'>
				<div className='mt-1 md:flex'>
					<label
						htmlFor='present-3'
						className='block text-sm md:text-base md:flex font-medium text-gray-900 w-[100px]'>
						Present 2
					</label>
					<input
						autoComplete='off'
						{...register('present3')}
						type='text'
						placeholder='Enter present 3'
						className={`custom-input ${errors && errors.present3 ? 'border-red-500' : ''}`}
					/>
					<p className='text-red-600 text-sm'>{errors.present3?.message}</p>
				</div>
			</div>
			<div className='col-span-full mb-4'>
				<div className='mt-1 md:flex'>
					<label
						htmlFor='present-4'
						className='block text-sm md:text-base md:flex font-medium text-gray-900 w-[100px]'>
						Present 4
					</label>
					<input
						autoComplete='off'
						{...register('present4')}
						type='text'
						placeholder='Enter present 4'
						className={`custom-input ${errors && errors.present4 ? 'border-red-500' : ''}`}
					/>
					<p className='text-red-600 text-sm'>{errors.present4?.message}</p>
				</div>
			</div>
			<div className='col-span-full mb-4'>
				<div className='mt-1 md:flex'>
					<label
						htmlFor='present-5'
						className='block text-sm md:text-base md:flex font-medium text-gray-900 w-[100px]'>
						Present 5
					</label>
					<input
						autoComplete='off'
						{...register('present5')}
						type='text'
						placeholder='Enter present 5'
						className={`custom-input ${errors && errors.present5 ? 'border-red-500' : ''}`}
					/>
					<p className='text-red-600 text-sm'>{errors.present5?.message}</p>
				</div>
			</div>

			<div className='mt-6 flex items-center justify-center gap-x-6'>
				<button
					type='submit'
					className='rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
					Save
				</button>
			</div>
		</form>
	);
};

export default Form;
