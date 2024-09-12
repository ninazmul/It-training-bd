import React from "react";
import { styles } from "../styles/styles";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="text-black dark:text-white">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        What is <span className="text-gradient">IT Training BD?</span>
      </h1>
      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <p className="text-[18px] font-Poppins">
          At IT Training BD, we provide a diverse array of technical courses
          designed to empower individuals at all stages of their careers. Our
          curriculum spans critical areas such as Software Quality Assurance and
          Testing, Data Science, Cybersecurity, Web Development, and more.
          Whether you're just starting out or looking to enhance your expertise,
          our courses are tailored to meet the evolving demands of the tech
          industry.
          <br />
          <br />
          Our commitment to excellence extends beyond traditional classroom
          instruction. We offer hands-on learning experiences and real-world
          applications to ensure that our students are not only knowledgeable
          but also job-ready. With over 5000 successful job placements, IT
          Training BD stands as a trusted partner in launching careers and
          fostering professional growth.
          <br />
          <br />
          Join us to gain the skills and knowledge needed to thrive in today's
          competitive tech landscape. At IT Training BD, we are dedicated to
          helping you achieve your career aspirations and unlock new
          opportunities in the ever-evolving world of technology.
        </p>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
