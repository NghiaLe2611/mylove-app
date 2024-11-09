import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const MasonryGallery = ({ children }) => {
    return (
        <ResponsiveMasonry columnsCountBreakPoints={{ 375: 2, 768: 3, 1600: 4 }}>
            <Masonry gutter="0.5rem">
                {children}
            </Masonry>
        </ResponsiveMasonry>
    );
};

export default MasonryGallery;

{/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div className="grid gap-4">
        <img className="w-full rounded-xl shadow" src="https://cruip-tutorials.vercel.app/masonry/masonry-01.jpg" width="232" height="290" alt="Image 01" />
        <img className="w-full rounded-xl shadow" src="https://cruip-tutorials.vercel.app/masonry/masonry-02.jpg" width="232" height="290" alt="Image 02" />
        <img className="w-full rounded-xl shadow" src="https://cruip-tutorials.vercel.app/masonry/masonry-03.jpg" width="232" height="174" alt="Image 03" />

    </div>
    <div className="grid gap-4">
        <img className="w-full rounded-xl shadow" src="https://cruip-tutorials.vercel.app/masonry/masonry-04.jpg" width="232" height="155" alt="Image 04" />
        <img className="w-full rounded-xl shadow" src="https://cruip-tutorials.vercel.app/masonry/masonry-05.jpg" width="232" height="349" alt="Image 05" />
        <img className="w-full rounded-xl shadow" src="https://cruip-tutorials.vercel.app/masonry/masonry-06.jpg" width="232" height="250" alt="Image 06" />

    </div>
    <div className="grid gap-4">
        <img className="w-full rounded-xl shadow" src="https://cruip-tutorials.vercel.app/masonry/masonry-07.jpg" width="232" height="349" alt="Image 07" />
        <img className="w-full rounded-xl shadow" src="https://cruip-tutorials.vercel.app/masonry/masonry-08.jpg" width="232" height="155" alt="Image 08" />
        <img className="w-full rounded-xl shadow" src="https://cruip-tutorials.vercel.app/masonry/masonry-09.jpg" width="232" height="250" alt="Image 09" />

    </div>
    <div className="grid gap-4">
        <img className="w-full rounded-xl shadow" src="https://cruip-tutorials.vercel.app/masonry/masonry-10.jpg" width="232" height="290" alt="Image 10" />
        <img className="w-full rounded-xl shadow" src="https://cruip-tutorials.vercel.app/masonry/masonry-11.jpg" width="232" height="155" alt="Image 11" />
        <img className="w-full rounded-xl shadow" src="https://cruip-tutorials.vercel.app/masonry/masonry-12.jpg" width="232" height="309" alt="Image 12" />
    </div>
</div> */}