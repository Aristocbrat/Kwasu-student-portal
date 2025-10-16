// src/components/Spdata.jsx
import React , {useState , useEffect, useRef} from 'react'
import Header from '../header/Header'
import Mydate from '../date/Mydate';
import PencilLoader from "../ui/PencilLoader.jsx" 
import { FaPrint } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FaRankingStar , FaReceipt } from "react-icons/fa6";
import { IoStatsChartOutline } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { CgData } from "react-icons/cg";

export default function Spdata() {
  const [passportImage, setPassportImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const carouselRef = useRef(null);
    
  useEffect(() => {
    setPassportImage(localStorage.getItem('passportImage') || null);
    const timer = setTimeout(() => setIsLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, []);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -carouselRef.current.offsetWidth : carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <PencilLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white text-green-600 font-bold w-full h-full py-4 px-3">
        <div className="sticky top-0 z-20">
          <Header profileImage={passportImage} isContentLoading={isLoading} />
        </div>
        
        <div className="relative mx-auto max-w-7xl"> 
          
          {/* Left Arrow - Visible on mobile/tablet, hidden on large screens */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-green-700 text-white rounded-full shadow-lg lg:hidden opacity-70 hover:opacity-100 transition duration-300 ml-1"
          >
            <FaChevronLeft className="text-xl" />
          </button>
          
          <div 
            ref={carouselRef} 
            /*
             * MAIN CONTAINER: Mobile swiping, PC wrapping (flex-wrap) and aligning to the start (justify-start).
             * GAP INCREASED TO gap-10 on LG
            */
            className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory scroll-smooth p-3 gap-8 
                       lg:flex-wrap lg:justify-start lg:overflow-visible lg:flex lg:gap-10" 
          >
            
            {/* Card 1: Print Registration form (Width increased for PC) */}
            <div className="card bg-green-700 text-white border-[#eef5dbb2] border-4 flex-shrink-0 w-full lg:w-[68%] xl:w-[580px] h-auto snap-center">
              <div className="card-body py-6 lg:py-8">
                <header className='flex justify-between items-center border-b-4 border-white pb-2 mb-2'>
                  <h2 className="card-title capitalize text-2xl"><span><FaPrint /></span> Print Registration form </h2>
                  <TiThMenu className="text-2xl" />
                </header>
                <main className='flex justify-between mx-auto w-[90%] h-auto
                  items-center border-t-4 border-b-4 border-white p-2 mb-2 text-2xl font-bold'>
                  <h2> Select Session :</h2>
                  <select className='w-[50%] bg-slate-200 h-10 rounded-lg text-green-800 font-bold text-center'>
                    <option>2023/2024</option>
                    <option>2022/2023</option>
                    <option>2021/2022</option>
                  </select>
                </main>
                  
                <div className="card-actions justify-center mt-auto">
                  <button className="btn bg-yellow-500 border-none text-xl text-white hover:bg-green-600 duration-1000 hover:text-yellow-300">Print Now</button>
                </div>
                <div className="border-t-4 w-full border-white ">
                  <Mydate />
                </div>
              </div>
            </div>
            {/* ------------------------------------------------------------------- */}

            {/* Card 2: Check your result (Width increased for PC) */}
            <div className="card bg-[#eef5db] border-4 border-green-600 flex-shrink-0 w-full lg:w-[58%] xl:w-[530px] h-auto snap-center">
              <div className="card-body py-6 lg:py-8">
                <header className='flex justify-between items-center border-b-4 border-green-600 pb-2 mb-2'>
                  <h2 className="card-title capitalize text-2xl"><span><FaRankingStar /></span>
                    Check your result </h2>
                  <TiThMenu className="text-2xl" />
                </header>
                <main className='flex justify-evenly mx-auto w-[90%] h-auto
                  items-center border-t-4 border-b-4 border-green-600 p-2 mb-2 text-xl font-bold'>
                  <h2> Session / Level :</h2>
                  <div className=" flex gap-5">
                    <select className='w-[60%] bg-inherit h-10 rounded-lg border-green-600 border-4 font-bold text-center'>
                      <option>2025/2026</option>
                      <option>2024/2025</option>
                      <option>2023/2024</option>
                      <option>2022/2023</option>
                      <option>2021/2022</option>
                      </select>

                      <select className='w-[30%] bg-inherit h-10 rounded-lg border-green-600 border-4 font-bold text-center'>
                      <option>100 </option>
                      <option>200</option>
                      <option>300</option>
                      <option>400</option>
                      <option>500</option>
                      </select>
                  </div>
                  
                </main>
                <div className="card-actions justify-center mt-auto">
                    <a href="/Results">
                    <button className="btn bg-yellow-500 border-none text-white text-xl hover:bg-green-600 hover:text-yellow-400 duration-1000">Display results</button></a>
                </div>
                <div className="border-t-4 w-full border-green-600 ">
                  <Mydate />
                </div>
              </div>
            </div>
            {/* ------------------------------------------------------------ */}
            
            {/* Card 3: List of payment receipts (Full width on lg, fixed height on md) */}
            <div className="card bg-[#eef5db] border-4 border-green-600 flex-shrink-0 w-full lg:w-full max-h-[500px] md:h-[800px] snap-center">
              <div className="card-body py-6 lg:py-8 overflow-y-auto">
                <header className='flex justify-between items-center border-b-4 border-green-600 pb-2 mb-2'>
                  <h2 className="card-title capitalize text-2xl"><span><FaReceipt /></span>
                    List of payment receipts </h2>
                  <TiThMenu className="text-2xl" />
                </header>
                <h2 className="text-3xl font-thin border-green-600 border-b-4 py-2">Click on each of these to print your reciepts </h2>
                <div className="">
                  <div className="overflow-x-auto ">
                  <div className=" border rounded">
                    <table className="table w-full">
                      <thead className="sticky top-0 bg-white z-10">
                        <tr className="text-green-600 font-bold text-[17px]">
                          <th>S/No</th>
                          <th>Academic Session</th>
                          <th>Payment Description</th>
                          <th>Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* rows remain unchanged for brevity */}
                        <tr className="hover:bg-green-600 hover:text-yellow-500 duration-1000"><th>1</th><td>2025/2026</td><td className="group"><button className="btn bg-green-600 border-none group-hover:text-yellow-400">Application form</button></td><td>200</td></tr>
                        <tr className="hover:bg-green-600 hover:text-yellow-500 duration-1000"><th>2</th><td>2025/2026</td><td className="group"><button className="btn bg-green-600 border-none group-hover:text-yellow-400">Acceptance fee</button></td><td>200</td></tr>
                        <tr className="hover:bg-green-600 hover:text-yellow-500 duration-1000"><th>3</th><td>2025/2026</td><td className="group"><button className="btn bg-green-600 border-none group-hover:text-yellow-400">Hostel Excemption fee</button></td><td>200</td></tr>
                        <tr className="hover:bg-green-600 hover:text-yellow-500 duration-1000"><th>4</th><td>2025/2026</td><td className="group"><button className="btn bg-green-600 border-none group-hover:text-yellow-400">School charges</button></td><td>200</td></tr>
                        <tr className="hover:bg-green-600 hover:text-yellow-500 duration-1000"><th>5</th><td>2025/2026</td><td className="group"><button className="btn bg-green-600 border-none group-hover:text-yellow-400">Sponsored Data</button></td><td>200</td></tr>
                        {/* ---------------- */}
                      </tbody>
                    </table>
                  </div>

                  </div>
                </div>
              </div>
            </div>
            {/* ------------------------------- */}
            
            {/* START: Combined Card 4 & 5 Swipable Group (on mobile/tablet) 
                - On 'lg' and up, this wrapper is now a flex container for side-by-side cards.
            */}
            <div className="flex-shrink-0 w-full snap-center flex flex-col gap-4 lg:w-full lg:flex-row lg:justify-start lg:gap-10">
              
              {/* Card 4: Current registration status */}
              <div className="card bg-green-700 text-white border-[#eef5dbb2] border-4 w-full lg:w-[48%] xl:w-[520px] h-[40vh] lg:h-auto overflow-y-auto lg:mb-4">
                <div className="card-body p-4 lg:p-8 flex flex-col justify-between">
                  <header className='flex justify-between items-center border-b-4 border-white pb-2 mb-2'>
                    <h2 className="card-title capitalize text-xl xs:text-2xl"><span><IoStatsChartOutline /></span>
                      Current registration status </h2>
                    <TiThMenu className="text-2xl" />
                  </header>
                  <main className='flex-grow'>
                    <div className="overflow-x-auto">
                      <table className="table">
                        <tbody className='text-[17px]'>
                          <tr>
                            <th>1</th>
                            <td>Current Session :</td>
                            <td>2025/2026 (1st Semester)</td>
                          </tr>
                          <tr>
                            <th>2</th>
                            <td>School Charges :</td>
                            <td>N (0.00)</td> 
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </main>

                  <div className="border-t-4 w-full border-white-600 mt-auto">
                    <Mydate />
                  </div>
                </div>
              </div>
              {/* ----------------------------------------------------------------- */}

              {/* Card 5: Sponsored data phone number update */}
              <div className="card bg-[#eef5db] border-green-600 border-4 w-full lg:w-[48%] xl:w-[580px] h-[40vh] lg:h-auto overflow-y-auto">
                <div className="card-body p-4 lg:p-8 flex flex-col justify-between">
                  <header className='flex justify-between items-center border-b-4 border-green-600 pb-2 mb-2'>
                    <h2 className="card-title capitalize text-xl xs:text-2xl"><span><CgData/></span>
                      sponsored data phone number update</h2>
                    <TiThMenu className="text-2xl" />
                  </header>
                  <main className='flex flex-col justify-between mx-auto w-[90%] h-auto text-[17px] flex-grow gap-2'>
                    <div className="flex justify-between items-center">
                      <p className='text-sm xs:text-[17px]'>Sponsored Data Phone No (MSISDN) :</p>
                      <input
                        type="number"
                        placeholder="Number"
                        className="w-[150px] xs:w-[250px] px-2 py-1 xs:px-4 xs:py-2 bg-white border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </main>
                  <div className='mt-auto flex justify-center'>
                    <button type="submit"
                      className='btn bg-green-600 text-white border-none w-36 hover:bg-yellow-400 hover:text-green-500 duration-1000'> Update</button>
                  </div>
                
                </div>
              </div>
            </div>
            {/* END: Combined Card 4 & 5 Swipable Group */}
            
          </div>
          
          {/* Right Arrow - Visible on mobile/tablet, hidden on large screens */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-green-700 text-white rounded-full shadow-lg lg:hidden opacity-70 hover:opacity-100 transition duration-300 mr-1"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>

        <div className='p-4 flex items-center justify-center'>
          <a href="/Home">
            <button className="btn group bg-green-700 border-none text-white font-bold duration-300 hover:text-yellow-300 w-full xxs:w-auto text-xs xxs:text-sm xs:text-base py-2 xxs:py-3 px-3 xxs:px-4 xs:px-6">
              <span className="group-hover:-translate-x-2 duration-300 text-base xxs:text-lg xs:text-xl">
                <FaChevronLeft />
              </span>
              <span className="hidden xs:inline">Previous page</span>
              <span className="xs:hidden">Previous</span>
            </button>
          </a>
        </div>
        
        <div className="text-green-700 border-t-4 border-green-600 xxs:mt-7 xs:mt-8">
          <Mydate/>
        </div>

      </div>
    </div>
  )
}