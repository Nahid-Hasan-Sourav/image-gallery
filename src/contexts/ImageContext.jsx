import { createContext, useEffect, useState } from 'react';
import data from '../assets/data/imagedata.json'

export const ImageDataContext=createContext();


const ImageContext = ({children}) => {
    const [imageData,setImageData]=useState(data);
    const [selectCheckedData, setSelectCheckedData] = useState([]);
    const [isChecked, setIsChecked] = useState(0);

  

    const selectImageChecked = (id) => {
 
    if (selectCheckedData.includes(id)) {
        
        // If the ID is already stored, remove it
        setSelectCheckedData(selectCheckedData.filter((imageId) => imageId !== id));
      } else {
        // If the ID is not stored, add it
        setSelectCheckedData([...selectCheckedData, id]);
      }
     
     
    };

   
    const deleteImage = () => {    
        const updatedImageData = imageData.filter((image) => !selectCheckedData.includes(image.id));
        setImageData(updatedImageData);
        setIsChecked(isChecked + 1);
        if(selectCheckedData.length > 0){
            setSelectCheckedData([]);
        
        }
      }
      
      useEffect(() => {
        if (isChecked > 0) {
          setSelectCheckedData([]);
        
        }
      }, [isChecked]);


    const allData = {
        imageData,
        setImageData,
        selectCheckedData,
        selectImageChecked,
        deleteImage,
        isChecked,
        setIsChecked
        
    }
    
    return (
        <ImageDataContext.Provider value={allData}>
            {children}
        </ImageDataContext.Provider>
    );
};

export default ImageContext;