import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
          JDR Medical Institute stands as a leader in healthcare, offering exceptional patient-centered care and innovative medical solutions. Our team of skilled professionals ensures personalized and comprehensive treatment across various specialties, from advanced diagnostics to cutting-edge therapies.
          </p>
          <br />
          <p>
          Our state-of-the-art facilities, equipped with the latest technology, enable precise and efficient medical interventions. We actively contribute to medical research and clinical trials, advancing the field of healthcare.At JDR Medical Institute, we prioritize trust and collaboration with patients, fostering open communication and involving them in their treatment plans. Our commitment to excellence, integrity, and continuous improvement sets us apart as a leading healthcare institution.
          </p>
          <p>Coding is fun!</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
