import { styles } from "@/app/styles/styles";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReviewsCard from "../Reviews/ReviewsCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

type Props = {};

const Reviews = (props: Props) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});

  // Check if data is loaded and extract the reviews along with user data
  const reviews =
    data?.courses?.flatMap((course: { reviews: any[] }) =>
      course.reviews.map((review) => ({
        ...review,
        user: review.user,
      }))
    ) || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // State to track hover status

  // Define the number of reviews to show based on screen size
  const getReviewsPerView = () => {
    if (window.innerWidth < 768) return 1; // Small screens
    if (window.innerWidth < 1024) return 2; // Medium screens
    return 3; // Large screens
  };

  const reviewsPerView = getReviewsPerView();

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  // Cloning the reviews array for infinite scrolling
  const clonedReviews = [...reviews, ...reviews, ...reviews];

  // Autoplay functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval); // Clear the interval on component unmount
    }
  }, [nextSlide, isHovered]);

  return (
    <div
      className="w-[90%] 800px:w-[85%] m-auto"
      onMouseEnter={() => setIsHovered(true)} // Pause on hover
      onMouseLeave={() => setIsHovered(false)} // Resume on leave
    >
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../../public/lms.png")}
            alt="business"
            width={700}
            height={700}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are{" "}
            <span className="text-[#ffd900]">Our Strength</span>
            <br />
            See What They Say About Us
          </h3>
          <p className={`${styles.label} text-gray-600 mt-4`}>
            Our students’ success reflects our commitment to excellence.
            Discover how our programs have empowered them to achieve their goals
            and transform their lives.
          </p>
        </div>
      </div>
      <br />
      <br />
      <div className="relative mb-12">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${
                  (currentIndex + 1) * (100 / reviewsPerView)
                }%)`, // Adjusting the index for smooth scrolling
              }}
            >
              {clonedReviews.map(
                (
                  review: { user: { avatar: { url: any }; name: any } },
                  index: number
                ) => (
                  <div
                    className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-2" // Added padding for better spacing
                    key={index}
                  >
                    <ReviewsCard
                      item={{
                        ...review,
                        avatar: review.user?.avatar?.url,
                        name: review.user.name,
                      }}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}
        <button
          onClick={prevSlide}
          className="absolute text-black dark:text-white left-4 top-1/2 transform -translate-y-1/2 glass-effect"
        >
          <IoIosArrowBack />
        </button>
        <button
          onClick={nextSlide}
          className="absolute text-black dark:text-white right-4 top-1/2 transform -translate-y-1/2 glass-effect"
        >
          <IoIosArrowForward />
        </button>
      </div>

      {/* Styles for Glass Effect */}
      <style jsx>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.1); /* Semi-transparent white */
          border: 1px solid rgba(255, 255, 255, 0.3); /* Light border for depth */
          border-radius: 50%; /* Circular buttons */
          padding: 10px; /* Add some padding */
          backdrop-filter: blur(10px); /* Blur effect */
          transition: background 0.3s, transform 0.3s; /* Smooth transition */
        }
      `}</style>
    </div>
  );
};

export default Reviews;
