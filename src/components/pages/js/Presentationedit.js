import React, { useState, useEffect, useRef } from "react";
import "../css/presentationcheck.css";
import ApplicationNavbar from "../../shared/js/ApplicationNavbar.js";
import SectionForm from "../sectionForm/sectionForm.js";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import sectionMapping from "../utils/sectionMapping.js";
import { Grid } from 'react-loader-spinner'; // Assuming you're using react-loader-spinner for loading animation
import FloatingButtons from "./FloatingButtons.js";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const slides = [
  "Cover",
  "About",
  "Problem Areas",
  "Solution",
  "Market Sizing",
  "Product Overview",
  "Product Roadmap",
  "System Architecture",
  "Mobile App Screenshots",
  "Web App Screenshots",
  "Business Model",
  "Key Stakeholders",
  "Customer Persona",
  "Go-to-market Strategy",
  "Track Record",
  "Case Study",
  "Testimonials",
  "Competitive Landscape",
  "Competitive Differentiation",
  "Founding Team",
  "Financial Overview",
  "Contact Us",
];

const excludedSections = [
  "Track Record",
  "Testimonials",
  "Founding Team",
  "Financial Overview",
  "Mobile App Screenshots",
  "Web App Screenshots",
  "Case Study"
];

const Presentationedit = () => {
  const [selectedSlide, setSelectedSlide] = useState(slides[0]);
  const [slideContent, setSlideContent] = useState({});
  const [fetchError, setFetchError] = useState({});
  const slideRefs = useRef([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
//   const formId = localStorage.getItem("submissionId");
const  submissionId  = searchParams.get("submissionID")
//const formId = searchParams.get("submissionId");
  const userEmail = localStorage.getItem("userEmail");
  const generatedPresentationId = searchParams.get("generatedPresentationId");

  const [formData, setFormData] = useState({
    // Your form data fields here
  });

  const handleDownload = async () => {
    try {
      //const formId = localStorage.getItem("submissionId");
      if (!submissionId) {
        throw new Error("Form ID not found in localStorage");
      }
      
      const serverurl = process.env.REACT_APP_SERVER_URL;
      const response = await fetch(`${serverurl}/slides/url?formId=${submissionId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Result:", result);
  
      // Ensure the response is an array and contains at least 3 elements
      if (!Array.isArray(result) || result.length < 3) {
        throw new Error("Invalid response format");
      }
  
      // Extract the URL from the result
      const url = result[2];
      console.log("URL:", url);
  
      // Check if the URL is valid
      if (!url || typeof url !== "string") {
        throw new Error("Invalid URL in response");
      }
  
      // Open the URL in a new tab
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error exporting presentation:", error);
      // Show a message or popup to inform the user
      alert("Oops! It seems like the pitch deck presentation is missing. Click 'Generate Presentation' to begin your journey to success!");
    }
  };

  const handleShare = () => {
    const uniqueShareableUrl = `https://zynth.ai/share?submissionId=${submissionId}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Share Presentation",
          text: "Check out this presentation",
          url: uniqueShareableUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Share failed: ", error));
    } else if (navigator.clipboard && navigator.platform.includes("Mac")) {
      // For macOS devices where navigator.share is not available
      navigator.clipboard
        .writeText(uniqueShareableUrl)
        .then(() => alert("URL copied to clipboard"))
        .catch((error) => console.error("Copy failed: ", error));
    } else {
      // For other devices where neither navigator.share nor clipboard API is available
      alert("Sharing is not supported on this device/browser.");
    }
  };

  // Function to fetch slide content for a specific slide
  const handleFetchSlide = async (slide) => {
    try {
      const serverurl = process.env.REACT_APP_SERVER_URL;
      const response = await fetch(`${serverurl}/slides/id_by_section?formId=${submissionId}&section=${slide}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const slideId = data[0][1];
      setSlideContent((prevState) => ({
        ...prevState,
        [slide]: { id: data[0][0], slideId },
      }));
      // Clear error if previously set
      setFetchError((prevState) => ({
        ...prevState,
        [slide]: null,
      }));
    } catch (error) {
      console.error(`Error fetching slide for section ${slide}:`, error);
      // Set error state for the specific slide
      setFetchError((prevState) => ({
        ...prevState,
        [slide]: error.message || "Failed to fetch slide. Please try again later.",
      }));
    }
  };

  useEffect(() => {
    let pollingTimeout;
    if (!excludedSections.includes(selectedSlide)) {
      pollingTimeout = setTimeout(() => {
        setFetchError((prevState) => ({
          ...prevState,
          [selectedSlide]: "timeout",
        }));
      }, 72000); // 3 minutes
    }
// make
    // Fetch slide content for the selected slide initially
    handleFetchSlide(selectedSlide);

    // Set interval to periodically fetch slide content for the selected slide
    const interval = setInterval(() => {
      if (fetchError[selectedSlide] !== "timeout") {
        handleFetchSlide(selectedSlide);
      }
    }, 10000); // Adjust interval as needed (e.g., every 10 seconds)

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount or slide change
      clearTimeout(pollingTimeout); // Cleanup timeout on component unmount or slide change
    };
  }, [selectedSlide, submissionId]);

  const handleSidebarClick = (slide, index) => {
    setSelectedSlide(slide);
    slideRefs.current[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleTriggerClick = async (section) => {
    const data = {
      section: sectionMapping[section],
      userId: userEmail,
      formId:submissionId,
      generatedPresentationId,
    };

    try {
      const serverurl = process.env.REACT_APP_SERVER_URL;
      const response = await fetch(`${serverurl}/appscript/triggerAppScript`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
      // Provide user feedback
      alert(`Triggered successfully for ${section}`);
    } catch (error) {
      console.error("Error:", error);
      // Provide user feedback
      alert(`Failed to trigger for ${section}: ${error.message}`);
    }
  };

  const RenderSlideContent = (slide) => {
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Check if the slide is one of the specific sections that require the form
    const requiresForm = excludedSections.includes(slide);

    useEffect(() => {
      const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slide = entry.target.getAttribute("data-slide");
            setSelectedSlide(slide);
          }
        });
      }, observerOptions);
      slideRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
      return () => {
        slideRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      };
    }, []);

    useEffect(() => {
      if (requiresForm || slideContent[slide]?.slideId !== undefined) {
        setLoading(false);
      }
    }, [slideContent[slide], requiresForm]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (loading && !requiresForm && fetchError[slide] !== "timeout") {
          setFetchError((prevState) => ({
            ...prevState,
            [slide]: "timeout",
          }));
        }
      }, 72000);

      return () => clearTimeout(timeout); // Clear timeout on component unmount or slide change
    }, [loading, requiresForm, slide, fetchError]);

    if (fetchError[slide] === "timeout" && !requiresForm) {
      return (
        <>
          <IconButton
            onClick={() => handleTriggerClick(slide)}
            color="primary"
            aria-label="add"
            sx={{ fontSize: 40 }}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
          <h3>{slide}</h3>
        </>
      );
    } else if (loading && !requiresForm) {
      return (
        <div className="presentationcheck-loadingIcon">
          <Grid
            visible={true}
            height={80}
            width={80}
            color="#E6A500"
            ariaLabel="grid-loading"
            radius={12.5}
            wrapperStyle={{}}
            wrapperClass="grid-wrapper"
          />
        </div>
      );
    } else if (slideContent[slide]?.slideId === undefined) {
      if (!requiresForm) {
        return (
          <div className="w-[40%] flex flex-col justify-center items-center">
            <div className="h-max w-max flex justify-center items-center border border-blue-600 rounded-[50%]">
              <IconButton
                onClick={() => handleTriggerClick(slide)}
                color="inherit"
                aria-label="add"
                sx={{ fontSize: 40, color: "white" }}
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            </div>
            <h3>{slide}</h3>
          </div>
        );
      } else {
        return (
          <div>
            {!showForm && (
              <div className="w-[30vw] flex flex-col justify-center items-center ">
                <div className="h-max w-max flex justify-center items-center border border-blue-600 rounded-[50%]">
                  <IconButton
                    onClick={() => setShowForm(true)}
                    color="inherit"
                    aria-label="add"
                    sx={{ fontSize: 40, color: "white" }}
                  >
                    <AddIcon fontSize="inherit" />
                  </IconButton>
                </div>
                <h3>{slide}</h3>
              </div>
            )}
            {showForm && (
              <SectionForm Title={slide} onClose={() => setShowForm(false)} />
            )}
          </div>
        );
      }
    } else {
      return (
        <iframe
          className="slides-iframe"
          title={`Google Slides Embed ${slide}`}
          src={`https://docs.google.com/presentation/d/${slideContent[slide].id}/embed?rm=minimal&start=false&loop=false&slide=id.${slideContent[slide].slideId}`}
          style={{ width: "149.3333vh", height: "84vh"  }}
        ></iframe>
      );
    }
  };

  return (
    <div className="presentation-check-container1">
      <ApplicationNavbar />
      <div className="presentation-check-container">
        <div className="sidebar">
          {slides.map((slide, index) => (
            <React.Fragment key={index}>
              <div
                className={`sidebar-item ${selectedSlide === slide ? "active" : ""}`}
                onClick={() => handleSidebarClick(slide, index)}
              >
                {slide}
              </div>
              {index < slides.length - 1 && <div className="separator"></div>}
            </React.Fragment>
          ))}
        </div>
        <div className="content">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="content-section"
              data-slide={slide}
              ref={(el) => (slideRefs.current[index] = el)}
            >
              {RenderSlideContent(slide)}
            </div>
          ))}
        </div>
        
      </div>
      <FloatingButtons handleShare={handleShare} handleExport={handleDownload}/>
    </div>
  );
};

export default Presentationedit;