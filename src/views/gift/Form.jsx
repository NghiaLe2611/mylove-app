import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
	present1: yup.string().required('Không được trống'),
	present2: yup.string().required('Không được trống'),
	present3: yup.string().required('Không được trống'),
	present4: yup.string().required('Không được trống'),
	present5: yup.string().required('Không được trống'),
});

const Form = ({setFormValue}) => {
	const {
		handleSubmit,
		control,
		register,
		formState: {errors},
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = (data) => {
		setFormValue(data);
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
					<input
						autoComplete='off'
						{...register('present1')}
						type='text'
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
