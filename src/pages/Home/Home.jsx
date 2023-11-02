import ImageGallery from "../../components/ImageGallery";

// import data from '../../assets/data/imagedata.json';
import { useContext } from "react";
import { ImageDataContext } from "../../contexts/ImageContext";
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


// const handleDrop = (e, id) => {
//   e.preventDefault();
//   const draggedImageId = e.dataTransfer.getData('imageId');
//   if (draggedImageId && draggedImageId !== id) {
//       const updatedImageData = [...imageData];
//       const draggedImage = updatedImageData.find((image) => image.id === parseInt(draggedImageId));
//       const dropTargetImage = updatedImageData.find((image) => image.id === id);
//       const draggedIndex = updatedImageData.indexOf(draggedImage);
//       const dropTargetIndex = updatedImageData.indexOf(dropTargetImage);

//       // Swap the entire order of images
//       updatedImageData.splice(draggedIndex, 1);
//       updatedImageData.splice(dropTargetIndex, 0, draggedImage);

//       // Update the state to reflect the new order
//       setImageData(updatedImageData);
//   }
// };
// const handleDrop = (e, id) => {
//   e.preventDefault();
//   const draggedImageId = e.dataTransfer.getData('imageId');
//   if (draggedImageId && draggedImageId !== id) {
//     const updatedImageData = [...imageData];
//     const draggedImage = updatedImageData.find((image) => image.id === parseInt(draggedImageId));
//     const dropTargetImage = updatedImageData.find((image) => image.id === id);
//     const draggedIndex = updatedImageData.indexOf(draggedImage);
//     const dropTargetIndex = updatedImageData.indexOf(dropTargetImage);

//     if (draggedIndex < dropTargetIndex) {
//       // Dragged from left to right, swap from left to right
//       for (let i = draggedIndex; i < dropTargetIndex; i++) {
//         const temp = updatedImageData[i];
//         updatedImageData[i] = updatedImageData[i + 1];
//         updatedImageData[i + 1] = temp;
//       }
//     } else {
//       // Dragged from right to left, swap from right to left
//       for (let i = draggedIndex; i > dropTargetIndex; i--) {
//         const temp = updatedImageData[i];
//         updatedImageData[i] = updatedImageData[i - 1];
//         updatedImageData[i - 1] = temp;
//       }
//     }

//     // Update the state to reflect the new order
//     setImageData(updatedImageData);
//     console.log("After drag : ",imageData);
//   }
// };
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
    <>
      <div className="container mx-auto w-[1000px] mt-[40px]">
        <div
          className={`p-[10px] flex flex-row justify-between items-center py-[15px] ${
            selectCheckedData.length > 0 ? "border-b-[1px]" : ""
          } border-gray-300`}
        >
          {selectCheckedData.length > 0 ? (
            <>
              <p className="">
                <span className="me-[3px] ">
                  <input type="checkbox" id="scales" name="scales" />
                </span>
          
                {selectCheckedData.length > 0 && selectCheckedData == 1
                  ? `${selectCheckedData.length} File Selected`
                  : `${selectCheckedData.length} Files Selected`}
              </p>
              <p
                className="text-red-500 cursor-pointer"
                onClick={() => deleteImage()}
              >
                {selectCheckedData.length > 0 && selectCheckedData == 1
                  ? " Delete File"
                  : "Delete Files"}
              </p>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="grid grid-rows-3 grid-cols-5 gap-4 pt-[20px]">
          {imageData?.map((imagedata, index) => {
            return index === 0 ? (
              <div className="relative col-span-2 row-span-2 border-2 rounded-md cursor-pointer"
              key={imagedata.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, imagedata.id)}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, imagedata.id)}
              onDragEnd={() => console.log('Drag end')}
              >
                <span className="top-[10px] left-[10px] absolute ">
                  <input
                    type="checkbox"
                    id="scales"
                    name="scales"
                    className="cursor-pointer"
                    checked={selectCheckedData.includes(imagedata.id)}
                    onClick={() => selectImageChecked(imagedata?.id)}
                  />
                </span>
                <ImageGallery key={index} imagedata={imagedata} />
              </div>
            ) : (
              <div className="relative transition-transform duration-300 ease-in-out transform border-2 rounded-md cursor-pointer hover:scale-105"
              key={imagedata.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, imagedata.id)}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, imagedata.id)}
              onDragEnd={() => console.log('Drag end')}
              >
                <span className="top-[10px] left-[10px] absolute cursor-pointer">
                  <input
                    type="checkbox"
                    id="scales"
                    name="scales"
                    className="cursor-pointer"
                    checked={selectCheckedData.includes(imagedata.id)}
                    onClick={() => selectImageChecked(imagedata?.id)}
                  />
                </span>
                <ImageGallery key={index} imagedata={imagedata} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
