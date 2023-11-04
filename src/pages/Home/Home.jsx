import Image from "../../components/Image";
import { useContext } from "react";
import { ImageDataContext } from "../../contexts/ImageContext";
import addImageIcon from '../../../public/images/add-image.png'
const Home = () => {
  const { imageData, selectImageChecked, deleteImage, selectCheckedData,setImageData} =
    useContext(ImageDataContext);

    const handleDragStart = (e, id) => {
      e.dataTransfer.setData('imageId', id);
      e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
      e.preventDefault();
  };



const handleDrop = (e, id) => {
  e.preventDefault();
  const draggedImageId = e.dataTransfer.getData('imageId');
  if (draggedImageId && draggedImageId !== id) {
    const updatedImageData = [...imageData];
    const draggedImage = updatedImageData.find((image) => image.id === parseInt(draggedImageId));
    const dropTargetImage = updatedImageData.find((image) => image.id === id);
    const draggedIndex = updatedImageData.indexOf(draggedImage);
    const dropTargetIndex = updatedImageData.indexOf(dropTargetImage);

    // Determine the direction of the drag and swap positions accordingly
    if (draggedIndex < dropTargetIndex) {
      // Dragged from left to right
      for (let i = draggedIndex; i < dropTargetIndex; i++) {
        updatedImageData[i] = updatedImageData[i + 1];
      }
      updatedImageData[dropTargetIndex] = draggedImage;
    } else {
      // Dragged from right to left
      for (let i = draggedIndex; i > dropTargetIndex; i--) {
        updatedImageData[i] = updatedImageData[i - 1];
      }
      updatedImageData[dropTargetIndex] = draggedImage;
    }

    // Update the state to reflect the new order
    setImageData(updatedImageData);
  }
};

 
  return (
 
    <div className="bg-blue-100 w-full h-full lg:h-screen py-8 px-4 lg:px-12 xl:px-24">
    <div className="container mx-auto max-w-screen-lg shadow-lg rounded-md bg-white">
      <div className="p-4 lg:p-6 flex flex-row justify-between items-center border-b border-gray-600">
        {selectCheckedData.length == 0 ? (
          <h1 className="text-2xl lg:text-3xl font-bold">Gallery</h1>
        ) : (
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="scales" className="text-xl" name="scales" checked />
            <p className="font-bold text-xl">
              {selectCheckedData.length > 1 ? `${selectCheckedData.length} Files Selected` : `${selectCheckedData.length} File Selected`}
            </p>
          </div>
        )}
        {selectCheckedData.length > 0 && (
          <p className="text-red-500 cursor-pointer" onClick={() => deleteImage()}>
            {selectCheckedData.length > 1 ? "Delete Files" : "Delete File"}
          </p>
        )}
      </div>
      <div className="grid grid-rows-3 grid-cols-5 gap-4 p-4 lg:p-6">
        {imageData?.map((imagedata, index) => (
          <div
            key={imagedata.id}
            className={`relative border-2 rounded-md cursor-pointer hover:scale-105 ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, imagedata.id)}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, imagedata.id)}
            onDragEnd={() => console.log("Drag end")}
          >
            <div className="absolute md:top-2 md:left-2 top-[-2px] left-[1.4px]">
              <input
                type="checkbox"
                id="scales"
                name="scales"
                className="cursor-pointer"
                checked={selectCheckedData.includes(imagedata.id)}
                onClick={() => selectImageChecked(imagedata?.id)}
              />
            </div>
            <Image key={index} imagedata={imagedata} />
          </div>
        ))}

        {/* Responsive Add Images Section */}
        <div className="col-span-5 lg:col-span-1 p-[6px]">
          <div className="border-2 border-dashed rounded-md flex flex-col justify-center items-center h-full">
            <img src={addImageIcon} className="w-8 h-8 md:w-10 md:h-10" />
            <h1 className="font-bold text-xs md:text-base lg:text-lg">Add Images</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Home;
