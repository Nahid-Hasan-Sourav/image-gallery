
const ImageGallery = ({ imagedata }) => {
    console.log(imagedata);
    return (
        <>
          
             <img src={imagedata.src} className='w-full'/>
        
        </>
    );
};

export default ImageGallery;