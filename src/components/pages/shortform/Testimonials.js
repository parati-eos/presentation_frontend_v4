import React, { useState, useEffect } from "react";
import close from "../../Asset/close.png";

const Testimonials = ({ formData, handleChange }) => {
  const [testimonials, setTestimonials] = useState(
    formData.testimonials || [
      { name: "", company: "", designation: "", testimonial: "" },
      { name: "", company: "", designation: "", testimonial: "" },
    ]
  );
  const [isFillingStarted, setIsFillingStarted] = useState(false);

  // Update the testimonials state with stored data if available
  useEffect(() => {
    if (formData.testimonials) {
      setTestimonials(formData.testimonials);
    }
  }, [formData.testimonials]);

  const handleTestimonialChange = (index, field, value) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index][field] = value;
    setTestimonials(updatedTestimonials);
    handleChange({
      target: {
        name: "testimonials",
        value: updatedTestimonials,
      },
    });
    setIsFillingStarted(true); // Set to true once any field is filled
  };

  const addTestimonialRow = () => {
    if (testimonials.length < 4) {
      setTestimonials([
        ...testimonials,
        { name: "", company: "", designation: "", testimonial: "" },
      ]);
    }
  };

  const removeTestimonialRow = (index) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials.splice(index, 1);
    setTestimonials(updatedTestimonials);
    handleChange({
      target: {
        name: "testimonials",
        value: updatedTestimonials,
      },
    });
  };

  const handleSubmit = () => {
    // Check if at least two testimonials are filled
    const filledTestimonials = testimonials.filter(
      (testimonial) => testimonial.name.trim() && testimonial.testimonial.trim()
    );

    if (isFillingStarted && filledTestimonials.length < 2) {
      console.log(
        "Please fill in at least two testimonials before submitting."
      );
      return; // Don't proceed if filling started but not enough testimonials
    }

    // Proceed with submitting data to DB or other actions
    console.log("Testimonials submitted with valid data:", testimonials);
  };

  // Conditionally add testimonial rows if less than two testimonials are present
  useEffect(() => {
    if (testimonials.length < 2) {
      addTestimonialRow();
    }
  }, [testimonials]);

  return (
    <>
      <div className="textInputQuestions">
        <label>
          Do you have any testimonials or success stories from these clients?
          List at least 2 of them.{" "}
        </label>
        <br />
        {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-row">
              <label>Testimonial {` ${index + 1}`}</label>
              <input
                type="text"
                placeholder={`Name `}
                value={testimonial.name}
                onChange={(e) =>
                  handleTestimonialChange(index, "name", e.target.value)
                }
                required={isFillingStarted} // Make it required if filling started
              />
              <input
                type="text"
                placeholder={`Company `}
                value={testimonial.company}
                onChange={(e) =>
                  handleTestimonialChange(index, "company", e.target.value)
                }
                // required={isFillingStarted} // Make it required if filling started
              />
              <input
                type="text"
                placeholder={`Designation `}
                value={testimonial.designation}
                onChange={(e) =>
                  handleTestimonialChange(index, "designation", e.target.value)
                }
                // required={isFillingStarted} // Make it required if filling started
              />
              {testimonials.length > 2 && (
                <div
                className="close-button"
                type="button"
                onClick={() => removeTestimonialRow(index)}
                style={{ width: "20px", height: "20px" }} // Adjust width and height as needed
              >
                <img src={close} alt="close" style={{ width: "100%", height: "100%", padding:"30%"}} />
              </div>
              
              )}
              <textarea
                placeholder={`Testimonial `}
                value={testimonial.testimonial}
                onChange={(e) =>
                  handleTestimonialChange(index, "testimonial", e.target.value)
                }
                required={isFillingStarted} // Make it required if filling started
              ></textarea>
              <br />
            </div>
        ))}
        {testimonials.length < 4 && (
          <>
            <br />
            <button
              className="add-row-button"
              type="button"
              onClick={addTestimonialRow}
            >
              Add Testimonial
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Testimonials;