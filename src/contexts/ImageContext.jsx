import { createContext, useEffect, useState } from 'react';
import data from '../assets/data/imagedata.json'

export const ImageDataContext=createContext();


const ImageContext = ({children}) => {
    const [imageData,setImageData]=useState(data);
    const [selectCheckedData, setSelectCheckedData] = useState([]);
    const [isChecked, setIsChecked] = useState();

  

    const selectImageChecked = (id) => {
 
    if (selectCheckedData.includes(id)) {
        setIsChecked(id);
        // If the ID is already stored, remove it
        setSelectCheckedData(selectCheckedData.filter((imageId) => imageId !== id));
      } else {
        // If the ID is not stored, add it
        setSelectCheckedData([...selectCheckedData, id]);
      }
     
     
    };

    const deleteImage =()=>{
        const updatedImageData = imageData.filter((image) => !selectCheckedData.includes(image.id));
        setImageData(updatedImageData);
        // setSelectCheckedData([]);
        
        console.log("length after delete ",selectCheckedData.length)
        console.log("length after delete ",selectCheckedData)


        // console.log("Delete Button")
    }
  
    console.log("This is from context selectCheckedData", selectCheckedData);
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