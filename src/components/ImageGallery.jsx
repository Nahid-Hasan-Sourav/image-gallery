

const ImageGallery = ({ imagedata }) => {
    // console.log(imagedata);
   
    return (
        <>
          
             <img src={imagedata.src} className='w-full hover:bg-gray-400'/>
        
        </>
    );
};

export default ImageGallery;