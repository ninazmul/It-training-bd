import React, { useEffect, useState } from "react";
import { styles } from "../styles/styles";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div>
      <div
        className={`w-[95%] 800px:w-[92%] m-auto py-2 text-black dark:text-white px-3`}
      >
        <div>
          <h1 className={`${styles.title} !text-start pt-2`}>
            Platform Terms and Condition
          </h1>
          <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
            <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
              At IT Training BD, we are dedicated to creating an inclusive and
              accessible learning environment. Enrollment is open to all
              individuals who fulfill the prerequisites for their chosen course.
              To confirm your registration, please ensure that full payment of
              the course fees is completed. Once payment is received, your spot
              in the course will be secured.
            </p>
            <br />
            <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
              We strive to accommodate our students’ needs while maintaining
              fairness. If you need to cancel your enrollment, you may request a
              refund up to 7 days before the course start date. Refunds will be
              processed promptly after the cancellation request is received.
              Cancellations made within 7 days of the course start date are not
              eligible for a refund. We encourage you to review course details
              carefully and contact us with any questions before enrolling to
              ensure the course meets your expectations.
            </p>
            <br />
            <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
              For any concerns or special circumstances, please contact our
              support team. We are committed to providing assistance and
              addressing any issues to ensure a smooth and positive learning
              experience for all our students.
            </p>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Policy;
