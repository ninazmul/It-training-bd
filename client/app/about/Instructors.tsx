import React from "react";
import { styles } from "../styles/styles";
import img1 from "../../public/Instructors/ehsan.jpeg";
import img2 from "../../public/Instructors/forhad.jpeg";
import img3 from "../../public/Instructors/foysal.jpeg";
import img4 from "../../public/Instructors/sumiha.jpeg";
import Image from "next/image";

// Sample data for instructors
const instructors = [
  {
    id: 1,
    name: "Ehsanul Alam Sabbir",
    image: img1,
    bio: "Sr. SQA Engineer | Speaker | Mentor | Tester | Fintech | Digital Payment | e-Wallet | Crypto Wallet | Ride sharing | Mobile financial services",
  },
  {
    id: 2,
    name: "Forhad Hossain",
    image: img2,
    bio: "SQA Engineer | Software Automation & Manual Testing | Load Testing | API Testing | WordPress plugin Testing | Database Testing | Odoo Functional Consultant.",
  },
  {
    id: 3,
    name: "Md Abdur Rahman Foysal",
    image: img3,
    bio: "Software Developer Engineer Test Level-2 @Augmedix",
  },
  {
    id: 4,
    name: "Syeda Sumiha Jahan",
    image: img4,
    bio: "Software QA Engineer | Manual Testing | API Testing | Performance Testing | Database Testing | Web & Mobile App Testing | Web Automation | Jira | Testrail",
  },
];

export default function Instructors() {
  return (
    <div className="text-black dark:text-white mb-6">
      <h1 className={`${styles.title} text-[30px] md:text-[45px]`}>
        Meet Our Instructors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[95%] md:w-[85%] m-auto">
        {instructors.map((instructor) => (
          <div key={instructor.id} className="border p-4 rounded-lg shadow-lg">
            <Image
              src={instructor.image}
              alt={`Image of ${instructor.name}`}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center">
              {instructor.name}
            </h3>
            <p className="text-gray-600 text-center mb-2">{instructor.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
