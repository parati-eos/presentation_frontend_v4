// path: src/components/MobileScreen.js

import React, { useState } from "react";
import uploadFileToS3 from "../utils/uploadFileToS3"; // Import the function to upload files to S3

const MobileScreen = ({ handleChange }) => {
  const [mobileUploadedImageUrl, setMobileUploadedImageUrl] = useState([]);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const uploadedMobileImageUrls = [];

    if (files.length > 3) {
      alert("Maximum 3 files allowed.");
      return;
    }

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = await uploadFileToS3(file);
        uploadedMobileImageUrls.push(imageUrl);
      }

      handleChange({
        target: {
          name: "mobileScreenshots",
          value: uploadedMobileImageUrls,
        },
      });

      setMobileUploadedImageUrl(uploadedMobileImageUrls);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="textInputQuestions p-4">
      <label htmlFor="mobileScreenshots" className="block text-lg font-medium text-gray-700 mb-2">
        Please upload 3 Mobile App UI screenshots here -
      </label>
      <input
        type="file"
        id="mobileScreenshots"
        name="mobileScreenshots"
        multiple
        onChange={handleFileChange}
        accept="image/*"
        className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100"
      />
      <br />
      {mobileUploadedImageUrl.length > 0 && (
        <div className="uploadedImages grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {mobileUploadedImageUrl.map((url, index) => (
            <div key={index} className="uploadedImage">
              <img src={url} alt={`Uploaded ${index}`} className="w-full h-auto rounded-lg shadow-md" />
            </div>
          ))}
        </div>
      )}
      <br />
    </div>
  );
};

export default MobileScreen;