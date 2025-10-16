import React, { useState, useEffect } from 'react';
import Header from './header/Header';
import Mydate from './date/Mydate';
import PencilLoader from "./ui/PencilLoader.jsx" 
import { FaUserGraduate, FaUniversity, FaUser, FaFileImage ,FaChevronRight ,FaChevronLeft, FaLock , FaHandPointDown } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { FcDepartment } from "react-icons/fc";
import { SiLevelsdotfyi } from "react-icons/si";
import { MdMarkEmailRead , MdEmail  } from "react-icons/md";

// ------------------ PassportUploader Component  ------------------
const PassportUploader = ({ profile, isProfileSaved }) => {
    return (
        // Mobile: Stack image above info (flex-col). Tablet+: Image left of info (md:flex-row).
        <div className="flex flex-col items-center md:flex-row md:items-start gap-4 relative">
            
            {/* Passport Preview (Content omitted for brevity) */}
            {profile.passportImage ? (
                <img
                    src={profile.passportImage}
                    alt="Passport"
                    className="h-32 w-32 sm:h-52 sm:w-52 rounded-full object-cover border-4 border-green-500"
                />
            ) : (
                <div className="skeleton h-32 w-32 sm:h-52 sm:w-52 rounded-full flex items-center justify-center text-gray-500 border-4 border-yellow-400">
                    <p className="font-bold text-[15px] flex flex-row gap-2">
                        <FaFileImage className="text-2xl" /> 
                    </p>
                </div>
            )}

            {/* Profile Info (Wider on mobile, full width inside its container) */}
            <div className="flex flex-col gap-3 w-full">
                {isProfileSaved ? (
                    <>
                        {/* Name display fix: Tightly grouped name fields */}
                        <div className="bg-green-700 flex flex-row flex-wrap justify-start gap-1 text-sm sm:text-lg lg:text-xl text-white px-3 py-2 rounded-md font-semibold items-center">
                            <FaUser className='text-xl sm:text-2xl flex-shrink-0' /> 
                            {/* Label */}
                            <span className="flex-shrink-0">Fullname:</span> 
                            {/* Grouping the name fields horizontally */}
                            <span className="flex flex-row flex-wrap gap-x-2 flex-shrink-0">
                                <span>{profile.surname}</span>
                                <span>{profile.middleName}</span>
                                <span>{profile.lastName}</span>
                            </span>
                        </div>
                        <div className="bg-green-700 flex flex-row gap-2 text-base sm:text-xl text-white px-3 py-2 rounded-md font-semibold">
                            <span><FaUniversity className='text-2xl' /></span>Faculty: {profile.faculty}
                        </div>
                        <div className="bg-green-700 flex flex-row gap-2 text-white text-base sm:text-xl px-3 py-2 rounded-md font-semibold">
                            <span><FcDepartment className='text-2xl' /></span>Department: {profile.department}
                        </div>
                        <div className="bg-green-700 flex flex-row gap-2 text-base sm:text-xl text-white px-3 py-2 rounded-md font-semibold">
                            <span><SiLevelsdotfyi className='text-2xl' /></span>Level: {profile.level}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="skeleton h-8 w-full rounded-md"></div>
                        <div className="skeleton h-8 w-full rounded-md"></div>
                        <div className="skeleton h-8 w-full rounded-md"></div>
                        <div className="skeleton h-8 w-full rounded-md"></div>
                    </>
                )}
            </div>
        </div>
    );
};

// ------------------ Home Component ------------------
const Home = () => {
    const [surname, setSurName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [faculty, setFaculty] = useState('');
    const [department, setDepartment] = useState('');
    const [level, setLevel] = useState('');
    const [passportImage, setPassportImage] = useState('');
    
    // ✅ FIX: Use separate states for collapsible groups
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [isEmailOpen, setIsEmailOpen] = useState(false);

    // Loader state
    const [isLoading, setIsLoading] = useState(true); 
        
    useEffect(() => {
        // Load profile data
        setSurName(localStorage.getItem('surname') || '');
        setMiddleName(localStorage.getItem('middleName') || '');
        setLastName(localStorage.getItem('lastName') || '');
        setFaculty(localStorage.getItem('faculty') || '');
        setDepartment(localStorage.getItem('department') || '');
        setLevel(localStorage.getItem('level') || '');
        setPassportImage(localStorage.getItem('passportImage') || '');

        // Simulate data fetching completion
        const timer = setTimeout(() => setIsLoading(false), 2000); 
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('surname', surname);
        localStorage.setItem('middleName', middleName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('faculty', faculty);
        localStorage.setItem('department', department);
        localStorage.setItem('level', level);
        localStorage.setItem('passportImage', passportImage);
        alert('Profile updated successfully!');
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setPassportImage(base64String);
                localStorage.setItem('passportImage', base64String); // Persist image
            };
            reader.readAsDataURL(file);
        }
    };

    // ----------------------------------------------------------------------
    // RENDER LOGIC: FULL-SCREEN LOADER (Early Return)
    // ----------------------------------------------------------------------
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <PencilLoader />
            </div>
        );
    }
    // ----------------------------------------------------------------------

    // MAIN CONTENT (The loaded phase)
    return (
        <div className="bg-[#ffffff] border-green-800">
            {/* Pass profile data and loading state to Header */}
            <Header profileImage={passportImage} isContentLoading={isLoading} />

            <div className="home-body p-3 sm:p-6 lg:p-8">
                {/* *** FIX APPLIED HERE ***
                  MAIN CARD WRAPPER: stacks vertically (flex-col) for mobile and tablet (default), 
                  switches to side-by-side on desktop (`lg:flex-row`) only.
                */}
                <div className="cards flex flex-col lg:flex-row gap-5 w-full mb-3">
                    
                    {/* ------------------ Card 1: Basic Profile ------------------ */}
                    {/* Width is w-full on mobile/tablet, then shrinks on large desktop */}
                    <div className="card bg-[#eef5db] shadow-sm p-4 sm:px-5 sm:py-3 w-full lg:w-[60%]">
                        <div className="flex flex-col gap-4">
                            {/* Header */}
                            <div className="text-green-700 w-full border-b-4 border-green-700 py-3 flex justify-between items-center">
                                <p className="flex gap-2 font-bold text-xl sm:text-2xl">
                                    <FaUserGraduate /> Basic Profile
                                </p>
                                <CiMenuKebab className="text-2xl sm:text-3xl" />
                            </div>

                            {/* Passport and Profile Info */}
                            <PassportUploader
                                profile={{
                                    surname,
                                    middleName,
                                    lastName,
                                    faculty,
                                    department,
                                    level,
                                    passportImage
                                }}
                                isProfileSaved={
                                    !!surname && !!middleName && !!lastName && !!faculty && !!department && !!level
                                }
                            />

                            {/* Scrollable Section (Max height adjusted for mobile view) */}
                            <div className="w-full max-h-[60vh] md:max-h-[400px] overflow-y-auto bg-white p-3 rounded-md border-y-4 border-green-700">
                                <div className="flex flex-col gap-4 py-2">
                                    {/* School Fees */}
                                    <div className="card w-full bg-white border-green-700 border-4 py-2">
                                        <header className="p-3">
                                            <h1 className="font-bold text-xl sm:text-2xl text-green-800 underline underline-offset-4 flex gap-3  decoration-green-800">
                                                School fees <span className='mt-2 animate-bounce duration-1000'><FaHandPointDown /></span>:
                                            </h1>
                                        </header>
                                        <div className="p-3 text-green-700 flex flex-col gap-2">
                                            <div tabIndex={0} className="collapse bg-white border-green-800 border">
                                                <div className="collapse-title font-bold text-base sm:text-xl">Undergraduate fees</div>
                                                <div className="collapse-content text-sm">
                                                    Click the <span className='group'>
                                                        <a href="#" className='font-bold text-yellow-500 group-hover:underline underline-offset-8 decoration-2'>Payment plan</a></span> to proceed with the payment.
                                                </div>
                                            </div>
                                            <div tabIndex={0} className="collapse bg-white border-green-800 border">
                                                <div className="collapse-title font-bold text-base sm:text-xl">Postgraduate fees</div>
                                                <div className="collapse-content text-sm">
                                                    Click the <span className='group'><a href="#" className='font-bold text-yellow-500 group-hover:underline underline-offset-8 decoration-2'>Payment plan</a></span> to proceed with the payment.
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Password Management - Responsive Inputs */}
                                    <div className="card w-full bg-white border-green-700 border-4 py-2">
                                        <header className="p-3">
                                            <h1 className="font-bold text-xl sm:text-2xl text-green-800 flex gap-3 underline underline-offset-4 decoration-green-800">
                                                Password management <span className='mt-2 animate-bounce duration-1000'><FaHandPointDown /></span>:
                                            </h1>
                                        </header>
                                        <div className="p-3 text-green-700 flex flex-col gap-2">
                                            {/* Old Password */}
                                            <div className={`collapse bg-white border-green-800 border ${isPasswordOpen ? 'collapse-open' : 'collapse-close'}`}
                                            tabIndex={0}
                                            onClick={() => setIsPasswordOpen(!isPasswordOpen)}
                                            >
                                                <div className="collapse-title font-bold">Old password</div>
                                                <div className="collapse-content text-sm relative">
                                                    <input
                                                    type="password"
                                                    placeholder='Old passowrd '  
                                                    onClick={(e) => e.stopPropagation()}
                                                    className='w-full bg-inherit px-4 py-2 border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-12' />
                                                    <span className="absolute right-2 top-2 text-green-600 text-2xl"><FaLock /></span>
                                                </div>
                                            </div>
                                            {/* New Password */}
                                            <div className={`collapse bg-white border-green-800 border ${isPasswordOpen ? 'collapse-open' : 'collapse-close'}`}
                                            tabIndex={0}
                                            onClick={() => setIsPasswordOpen(!isPasswordOpen)}
                                            >
                                                <div className="collapse-title font-bold">New Password</div>
                                                <div className="collapse-content text-sm relative">
                                                    <input
                                                    type="password"
                                                    placeholder='New passowrd' 
                                                    onClick={(e) => e.stopPropagation()}
                                                    className='w-full bg-inherit px-4 py-2 border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-12' />
                                                    <span className="absolute right-2 top-2 text-green-600 text-2xl"><FaLock /></span>
                                                </div>
                                            </div>
                                            {/* Confirm Password */}
                                            <div className={`collapse bg-white border-green-800 border ${isPasswordOpen ? 'collapse-open' : 'collapse-close'}`}
                                            tabIndex={0}
                                            onClick={() => setIsPasswordOpen(!isPasswordOpen)}
                                            >
                                                <div className="collapse-title font-bold">Confirm Password</div>
                                                <div className="collapse-content text-sm relative">
                                                    <input
                                                    type="password"
                                                    placeholder='Confirm New passowrd' 
                                                    onClick={(e) => e.stopPropagation()}
                                                    className='w-full bg-inherit text-bold px-4 py-2 border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-12' />
                                                    <span className="absolute right-2 top-2 text-green-600 text-2xl"><FaLock /></span>
                                                </div>
                                            </div>
                                            <button className='btn bg-green-600 text-white border-none w-36 hover:bg-yellow-400 duration-1000 mt-2'> Update</button>
                                        </div>
                                    </div>
                                    
                                    {/* Email management - Responsive Inputs */}
                                    <div className="card w-full bg-white border-green-700 border-4 py-2">
                                        <header className="p-3">
                                            <h1 className="font-bold text-xl sm:text-2xl text-green-800 flex gap-3 underline underline-offset-4 decoration-green-800">
                                                Email management <span className='mt-2 animate-bounce duration-1000'><FaHandPointDown /></span>:
                                            </h1>
                                        </header>
                                        <div className="p-3 text-green-700 flex flex-col gap-2">
                                            {/* Old Email */}
                                            <div className={`collapse bg-white border-green-800 border ${isEmailOpen ? 'collapse-open' : 'collapse-close'}`}
                                            tabIndex={0}
                                            onClick={() => setIsEmailOpen(!isEmailOpen)}>
                                                <div className="collapse-title font-bold">Old Email</div>
                                                <div className="collapse-content text-sm relative">
                                                    <input
                                                    type="Email"
                                                    placeholder='Old Email '  
                                                    onClick={(e) => e.stopPropagation()}
                                                    className='w-full bg-inherit px-4 py-2 border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-12' />                
                                                    <span className="absolute right-2 top-2 text-green-600 text-2xl"><MdEmail /></span>
                                                </div>
                                            </div>
                                            {/* New Email */}
                                            <div className={`collapse bg-white border-green-800 border ${isEmailOpen ? 'collapse-open' : 'collapse-close'}`}
                                            tabIndex={0}
                                            onClick={() => setIsEmailOpen(!isEmailOpen)} >
                                                <div className="collapse-title font-bold">New Email</div>
                                                <div className="collapse-content text-sm relative">
                                                    <input
                                                    type="Email"
                                                    placeholder='New Email' 
                                                    onClick={(e) => e.stopPropagation()}
                                                    className='w-full bg-inherit px-4 py-2 border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-12' />
                                                    <span className="absolute right-2 top-2 text-green-600 text-2xl"><MdEmail /></span>
                                                </div>
                                            </div>
                                            {/* Confirm Email */}
                                            <div className={`collapse bg-white border-green-800 border ${isEmailOpen ? 'collapse-open' : 'collapse-close'}`}
                                            tabIndex={0}
                                            onClick={() => setIsEmailOpen(!isEmailOpen)}
                                            >
                                                <div className="collapse-title font-bold">Confirm Email</div>
                                                <div className="collapse-content text-sm relative">
                                                    <input
                                                    type="Email"
                                                    placeholder='Confirm New Email' 
                                                    onClick={(e) => e.stopPropagation()}
                                                    className='w-full bg-inherit text-bold px-4 py-2 border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-12' />
                                                    <span className="absolute right-2 top-2 text-green-600 text-2xl"><MdMarkEmailRead /></span>
                                                </div>
                                            </div>
                                            <button className='btn bg-green-600 text-white border-none w-36 hover:bg-yellow-400 duration-1000 mt-2'> Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 

                    {/* ------------------ Card 2: Profile Update Form ------------------ */}
                    {/* Width is w-full on mobile/tablet, then shrinks on large desktop */}
                    <div className="card bg-green-800 w-full lg:w-[40%] max-w-xl shadow-sm text-white shadow-green-800 mx-auto mt-5 lg:mt-0">
                        <div className="card-body px-6 py-4 font-bold">
                            {/* Header */}
                            <header className="mb-4 text-center">
                            <h2 className="text-yellow-400 text-2xl sm:text-4xl flex font-bold justify-center items-center"> 
                                {/* Assuming /logo.png is available */}
                                <span className='hidden sm:inline'><img src="/logo.png" alt="kwasu logo" className="w-[105px] h-auto object-cover" /></span>
                                <span className='mt-0 sm:mt-4 underline decoration-slice underline-offset-4'>Update Your Profile</span>
                            </h2>
                            <p className="text-sm sm:text-md text-white font-bold">
                                Fill in your details to update your student profile.
                            </p>
                            </header>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                                {/* Name Inputs */}
                                <input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurName(e.target.value)} className="input input-bordered w-full bg-white text-green-800 font-semibold text-sm sm:text-base" required />
                                <input type="text" placeholder="Middle Name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} className="input input-bordered w-full bg-white text-green-800 font-semibold text-sm sm:text-base" required />
                                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input input-bordered w-full bg-white text-green-800 font-semibold text-sm sm:text-base" required />

                                {/* Dropdowns */}
                                <select value={faculty} onChange={(e) => setFaculty(e.target.value)} className="select select-bordered w-full bg-white text-green-800 font-semibold text-sm sm:text-base" required>
                                    <option value="" disabled hidden>Choose Faculty</option>
                                    <option value="Agriculture & Veterinary Sciences">Agriculture & Veterinary Sciences</option>
                                    <option value="Administration">Administration</option>
                                    <option value="Arts">Arts</option>
                                    <option value="Education">Education</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Pure and Applied Sciences">Pure and Applied Sciences</option>
                                    <option value="Social Sciences">Social Sciences</option>
                                    <option value="Law">Law</option>
                                    <option value="Environmental Sciences">Environmental Sciences</option>
                                    <option value="ICT">Information and Communication Technology</option>
                                    <option value="Management Sciences">Management Sciences</option>
                                </select>

                                {/* Department Dropdown (Conditional rendering remains) */}
                                <select value={department} onChange={(e) => setDepartment(e.target.value)} className="select select-bordered w-full bg-white text-green-800 font-semibold text-sm sm:text-base" required>
                                    <option value="" disabled hidden>Choose Department</option>
                                    {faculty === "Pure and Applied Sciences" && (<><option value="Biology">Biology</option><option value="Chemistry">Chemistry</option><option value="Physics">Physics</option><option value="Mathematics">Mathematics</option><option value="Microbiology">Microbiology</option><option value="Biochemistry">Biochemistry</option><option value="Geology">Geology</option><option value="Statistics">Statistics</option><option value="Zoology">Zoology</option> </>)}
                                    {faculty === "Engineering" && (<><option value="Mechanical Engineering">Mechanical Engineering</option><option value="Electrical Engineering">Electrical and Electronic Engineering</option><option value="Civil Engineering">Civil Engineering</option><option value="Agricultural Engineering">Agricultural Engineering</option></>)}
                                    {faculty === "Arts" && (<><option value="History">History</option><option value="Philosophy">Philosophy</option><option value="Languages">Languages</option><option value="Pfa">Performing Arts</option><option value="Christian Studies">Christian Studies</option><option value="Islamic Studies">Islamic Studies</option><option value="Arabic Language & Literature">Arabic Language & Literature</option></>)}
                                    {faculty === "Social Sciences" && (<><option value="Economics">Economics</option><option value="Political Science">Political Science</option><option value="Psychology">Psychology</option><option value="Business Administration">Business Administration</option><option value="Public Administration">Public Administration</option><option value="Sociology">Sociology</option></>)}
                                    {faculty === "Law" && (<><option value="Public Law">Public Law</option><option value="Private Law">Private Law</option><option value="International Law">International Law</option><option value="Cooperate Law">Cooperate Law</option><option value="Criminal Law">Criminal Law</option></>)}
                                    {faculty === "Agriculture & Veterinary Sciences" && (<><option value="Agriculture & Veterinary Sciences">Agriculture & Veterinary Sciences</option></>)}
                                </select>

                                {/* Level */}
                                <select value={level} onChange={(e) => setLevel(e.target.value)} className="select select-bordered w-full bg-white text-green-800 font-semibold text-sm sm:text-base" required>
                                    <option value="" disabled hidden>Choose level </option>
                                    <option value="100">100</option>
                                    <option value="200">200</option>
                                    <option value="300">300</option>
                                    <option value="400">400</option>
                                    <option value="500">500</option>
                                </select>

                                {/* Passport Upload */}
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="input input-bordered w-full bg-white p-2 text-green-800 font-semibold text-sm sm:text-base" />
                                {passportImage && (
                                <img src={passportImage} alt="Passport" className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover border-4 border-yellow-400 mx-auto mt-2" />
                                )}

                                {/* Submit Button */}
                                <button type="submit" className="btn btn-success hover:bg-yellow-400 duration-1000 text-white font-bold mt-4 text-base sm:text-lg">
                                    Save Profile </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* previous and next button (Responsive text size) */}
                <div className='p-4 flex gap-5 items-center justify-center'>
                    <a href="/">
                        <button className="btn group bg-green-700 border-none text-white font-bold duration-300 hover:text-yellow-300 text-sm sm:text-base">
                            <span className='group-hover:-translate-x-2 duration-300 text-xl'><FaChevronLeft /></span> 
                            Previous page
                        </button>
                    </a>
                    <a href="/Spdata">
                        <button className="btn group bg-green-700 border-none text-white font-bold duration-300 hover:text-yellow-300 text-sm sm:text-base">
                            Next page
                        <span className='group-hover:translate-x-2 duration-300 text-xl'><FaChevronRight/></span> </button>
                    </a>
                </div>
                
                <div className="text-green-700 border-t-4 border-green-600">
                    <Mydate/>
                </div>
            </div>
        </div>
    );
};

export default Home;