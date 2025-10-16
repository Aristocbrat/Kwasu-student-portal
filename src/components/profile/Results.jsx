import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import Mydate from '../date/Mydate';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { IoBookSharp } from "react-icons/io5";
import PencilLoader from "../ui/PencilLoader.jsx"

/**
* Component to display the overall CGPA and academic classification based on a 5.0 system.
*/
const ClassificationSummary = ({ cgpa }) => {
    let classification = "Awaiting Final Result";
    let message = "Keep up the excellent work! We're processing your final cumulative result.";
    let textColor = "text-gray-600";
    let statusColor = "bg-gray-100 text-gray-800";

    if (cgpa <= 0) {
        return null;
    }

    if (cgpa >= 4.50) {
        classification = "First Class Honours";
        message = "Exceptional performance! You have achieved the highest academic distinction. Well done!";
        textColor = "text-green-800";
        statusColor = "bg-green-100 text-green-700 font-bold";
    } else if (cgpa >= 3.50) {
        classification = "Second Class Honours (Upper Division)";
        message = "Outstanding effort! You've achieved a great result. Aiming higher next time could secure a First Class.";
        textColor = "text-green-700";
        statusColor = "bg-green-100 text-green-600 font-semibold";
    } else if (cgpa >= 2.50) {
        classification = "Second Class Honours (Lower Division)";
        message = "Solid work! This is a commendable result. Focus on boosting your grades in key courses for future improvement.";
        textColor = "text-yellow-800";
        statusColor = "bg-yellow-100 text-yellow-700";
    } else if (cgpa >= 1.50) {
        classification = "Third Class Honours";
        message = "A pass is secured, but there's significant room for improvement. Consult your advisor to develop a study plan.";
        textColor = "text-orange-800";
        statusColor = "bg-orange-100 text-orange-700";
    } else if (cgpa > 0) {
        classification = "Pass / Potential Withdrawal";
        message = "Your results are concerning. Please contact student affairs immediately to discuss your academic standing.";
        textColor = "text-red-800";
        statusColor = "bg-red-100 text-red-700";
    }

    return (
        <div className="mt-6 xxs:mt-6 xs:mt-7 sm:mt-8 w-full max-w-xs xxs:max-w-full xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg p-3 xxs:p-4 xs:p-4 sm:p-5 bg-white rounded-lg shadow-xl border-l-4 border-green-600">
            <h3 className="text-base xxs:text-lg xs:text-lg sm:text-xl md:text-xl font-bold mb-2 xxs:mb-3 text-gray-800">
                Overall Academic Standing
            </h3>

            <div className="flex flex-col xxs:flex-row items-start xxs:items-center justify-between border-b pb-2 mb-2 gap-2 xxs:gap-0">
                <span className="text-sm xxs:text-base xs:text-base sm:text-lg font-medium text-gray-600">
                    Current CGPA (5.0 Scale):
                </span>
                <span className={`text-xl xxs:text-2xl xs:text-2xl font-black ${textColor}`}>
                    {cgpa.toFixed(2)}
                </span>
            </div>

            <div className="mt-2">
                <p className="text-xs xxs:text-sm xs:text-sm sm:text-md font-semibold text-gray-700 mb-2">
                    Predicted Classification:
                </p>
                <span className={`inline-block px-2 xxs:px-3 py-1 rounded-full text-xs xxs:text-sm ${statusColor}`}>
                    {classification}
                </span>
            </div>

            <p className={`mt-3 text-xs xxs:text-sm xs:text-sm italic ${textColor}`}>
                {message}
            </p>
        </div>
    );
};

/**
* Reusable component for a single semester results table.
*/
const CourseTable = ({ title }) => {
    const headers = [
        { label: "S/N", className: "w-8 xxs:w-10 xs:w-12" },
        { label: "Code", className: "w-16 xxs:w-20 xs:w-24" },
        { label: "Title", className: "flex-1 min-w-28 xxs:min-w-32 xs:min-w-40" },
        { label: "Unit", className: "w-10 xxs:w-12 text-xs p-1 xxs:p-2" },
        { label: "Status", className: "w-12 xxs:w-14 text-xs p-1 xxs:p-2" },
        { label: "CA", className: "w-10 xxs:w-12 text-xs p-1 xxs:p-2" },
        { label: "Exam", className: "w-10 xxs:w-12 text-xs p-1 xxs:p-2" },
        { label: "GP", className: "w-10 xxs:w-12 text-xs p-1 xxs:p-2" },
        { label: "WGP", className: "w-12 xxs:w-14 text-xs p-1 xxs:p-2" },
    ];

    const emptyRows = Array(5).fill(null);
    const emptyFieldPlaceholder = <span className="block h-3 xxs:h-4 w-full bg-gray-100 rounded-sm"></span>;

    return (
        <div className="p-2 xxs:p-2 xs:p-2 sm:p-3 w-full">
            <h2 className="text-base xxs:text-lg xs:text-lg sm:text-xl md:text-xl font-semibold mb-2 xxs:mb-3 text-green-700 border-b pb-1">
                {title}
            </h2>
            <div className="overflow-x-auto rounded-lg shadow-md border border-green-200">
                <table className="min-w-full divide-y divide-green-200">
                    <thead className="bg-green-50">
                        <tr className="text-green-800 uppercase tracking-wider text-xs xxs:text-xs xs:text-sm">
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className={`font-medium text-left ${index < 3 ? 'p-1.5 xxs:p-2 xs:p-2 sm:p-3' : 'p-1 xxs:p-2 text-center text-xs'} ${header.className} ${index < headers.length - 1 ? 'border-r border-green-200' : ''}`}
                                >
                                    {header.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 text-gray-700">
                        {emptyRows.map((_, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-green-50/50 transition duration-150">
                                {headers.map((header, colIndex) => {
                                    const cellClasses = `whitespace-nowrap ${colIndex < 3 ? 'p-1.5 xxs:p-2 xs:p-2 sm:p-3' : 'p-1 xxs:p-2 text-center text-xs xxs:text-xs xs:text-sm lg:text-sm'} ${header.className} ${colIndex < headers.length - 1 ? 'border-r border-gray-200' : ''}`;

                                    let cellContent;
                                    if (colIndex === 0) {
                                        cellContent = (rowIndex + 1).toString();
                                    } else {
                                        cellContent = emptyFieldPlaceholder;
                                    }

                                    return (
                                        <td key={colIndex} className={cellClasses}>
                                            {cellContent}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-2 xxs:mt-3 flex justify-end text-xs xxs:text-sm font-semibold">
                <span className="text-green-700 mr-2 xxs:mr-4">Total Units: </span>
                <span className="text-green-900">18</span>
            </div>
        </div>
    );
};

// Main Results Component
export default function Results() {
    const [passportImage, setPassportImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setPassportImage(localStorage.getItem('passportImage') || null);
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <PencilLoader />
            </div>
        );
    }

    const mockCGPA = 0.00;

    return (
        <div className="min-h-screen bg-gray-50 text-green-800">
            {/* Sticky Header Section */}
            <div className="sticky top-0 z-10 shadow-md">
                <Header profileImage={passportImage} isContentLoading={isLoading} />
            </div>

            <main className="p-2 xxs:p-3 xs:p-4 sm:p-4 md:p-6 lg:p-8">
                <h1 className="text-xl xxs:text-2xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 xxs:mb-5 xs:mb-5 sm:mb-6 text-green-800 flex flex-wrap items-center gap-2 xxs:gap-3 xs:gap-4 sm:gap-5">
                    My Academic Results 
                    <span className="text-lg xxs:text-xl xs:text-2xl sm:text-3xl md:text-4xl">
                        <IoBookSharp />
                    </span>
                </h1>

                {/* Two-Column Layout for the tables - Responsive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xxs:gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
                    <CourseTable title="First Semester Results" />
                    <CourseTable title="Second Semester Results" />
                </div>

                {/* Overall Summary Card */}
                {mockCGPA > 0 && <ClassificationSummary cgpa={mockCGPA} />}

                {/* Message when no results are available */}
                {mockCGPA === 0 && (
                    <div className="mt-6 xxs:mt-6 xs:mt-7 sm:mt-8 w-full max-w-xs xxs:max-w-full xs:max-w-sm sm:max-w-md p-3 xxs:p-4 xs:p-4 sm:p-5 bg-white-50 rounded-lg border-l-4 border-green-600 text-yellow-400">
                        <h3 className="text-base xxs:text-lg xs:text-lg sm:text-xl font-bold mb-1 text-yellow-500">
                            Results Pending
                        </h3>
                        <p className="text-xs xxs:text-sm xs:text-sm">
                            Overall academic standing will appear here once your course results have been uploaded and calculated.
                        </p>
                    </div>
                )}
            </main>

            {/* Previous and Next Buttons - Fully Responsive */}
            <div className="p-2 xxs:p-3 xs:p-4 sm:p-4 flex flex-col xxs:flex-row gap-3 xxs:gap-4 xs:gap-5 items-center justify-center">
                <a href="/spdata" className="w-full xxs:w-auto">
                    <button className="btn group bg-green-700 border-none text-white font-bold duration-300 hover:text-yellow-300 w-full xxs:w-auto text-xs xxs:text-sm xs:text-base py-2 xxs:py-3 px-3 xxs:px-4 xs:px-6">
                        <span className="group-hover:-translate-x-2 duration-300 text-base xxs:text-lg xs:text-xl">
                            <FaChevronLeft />
                        </span>
                        <span className="hidden xs:inline">Previous page</span>
                        <span className="xs:hidden">Previous</span>
                    </button>
                </a>
                <a href="/" className="w-full xxs:w-auto">
                    <button className="btn group bg-green-700 border-none text-white font-bold duration-300 hover:text-yellow-300 w-full xxs:w-auto text-xs xxs:text-sm xs:text-base py-2 xxs:py-3 px-3 xxs:px-4 xs:px-6">
                        <span className="hidden xs:inline">Next page</span>
                        <span className="xs:hidden">Next</span>
                        <span className="group-hover:translate-x-2 duration-300 text-base xxs:text-lg xs:text-xl">
                            <FaChevronRight />
                        </span>
                    </button>
                </a>
            </div>

            {/* Date Footer Section */}
            <div className="mt-6 xxs:mt-7 xs:mt-8">
                <Mydate />
            </div>
        </div>
    );
}