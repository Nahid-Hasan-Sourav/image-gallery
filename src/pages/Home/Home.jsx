import ImageGallery from '../../components/ImageGallery';
import data from '../../assets/data/imagedata.json';
const Home = () => {
    
      
    return (
      <>
        <div className="container mx-auto w-[1000px] mt-[40px]">
          <div className="p-[10px] flex flex-row justify-between items-center py-[15px] border-b-[1px] border-gray-300">
            <p className="">
                <span className="me-[3px] ">
                    <input type="checkbox" id="scales" name="scales" />
                </span>
                    3 Files Selected
            </p>
            <p className="text-red-500 cursor-pointer">Delete Files</p>
          </div>
          <div className='grid grid-rows-3 grid-cols-5 gap-4 pt-[20px]'>
           
             {
                data.map((imagedata,index)=>{
                    return index === 0 ? (
                      <div className="col-span-2 row-span-2 border-2 rounded-md relative">
                        <span className="top-[10px] left-[10px] absolute ">
                          <input type="checkbox" id="scales" name="scales" className='cursor-pointer'/>
                        </span>
                        <ImageGallery key={index} imagedata={imagedata} />
                      </div>
                    ) : (
                      <div className="border-2 rounded-md relative ">
                         <span className="top-[10px] left-[10px] absolute cursor-pointer">
                          <input type="checkbox" id="scales" name="scales" className='cursor-pointer' />
                        </span>
                        <ImageGallery key={index} imagedata={imagedata} />
                      </div>
                    );
                })
            }
            
          </div>
        </div>
      </>
    );
};

export default Home;