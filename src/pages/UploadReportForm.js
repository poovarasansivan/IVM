import React, { useState } from "react";
import { Input, Label, Button, Select } from "@windmill/react-ui";
import {
  FaUser,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaFilePdf,
} from "react-icons/fa";
import PageTitle from "../components/Typography/PageTitle";
import { useHistory } from "react-router-dom";

function Forms() {
  const [formData, setFormData] = useState({
    faculty_id: "",
    faculty_name: "",
    department: "",
    industry_name: "",
    industry_type: "",
    start_date: "",
    end_date: "",
    document_proof: null, // File input
    geo_tag: null, // File input
    utilized_amount: 0,
    participation_status: "",
  });
  const history = useHistory();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file inputs
    const handleFileChange = async (e) => {
      const { name, files } = e.target;
      const file = files[0];
      const token = localStorage.getItem("token");
      if (file) {
        const formData = new FormData();
        formData.append("UploadFiles", file);
        try {
          const uploadResponse = await fetch(
            "http://localhost:8080/protected/report-file-handler",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );

          if (!uploadResponse.ok) {
            throw new Error("Failed to upload file");
          }

          const uploadData = await uploadResponse.json();

          const { filename } = uploadData;
          console.log(filename);
          setFormData((prevData) => ({
            ...prevData,
            [name]: filename,
          }));
        } catch (error) {
          console.log(error);
        }
      }
    };

  const handleImgFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const token = localStorage.getItem("token");
    if (file) {
      const formData = new FormData();
      formData.append("UploadImg", file);
      try {
        const uploadResponse = await fetch(
          "http://localhost:8080/protected/report-img-handler",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file");
        }

        const uploadData = await uploadResponse.json();

        const { filename } = uploadData;
        console.log(filename);
        setFormData((prevData) => ({
          ...prevData,
          [name]: filename,
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(formData);
    try {
      const response = await fetch(
        "http://localhost:8080/protected/addnew-report",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            faculty_id: formData.faculty_id,
            faculty_name: formData.faculty_name,
            department: formData.department,
            industry_name: formData.industry_name,
            industry_type: formData.industry_type,
            start_date: formData.start_date,
            end_date: formData.end_date,
            document_proof: formData.UploadFiles,
            geo_tag: formData.UploadImg,
            utilized_amount: parseInt(formData.utilized_amount, 10),
            participation_status: formData.participation_status,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to store form data");
      }
      history.push("/app/approve-report");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    history.push("/app/approve-report");
  };

  return (
    <>
      <PageTitle>Create a New Industrial Visit Report</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        {/* Faculty ID */}
        <Label>
          <span>Faculty ID</span>
          <Input
            className="block w-full mt-1"
            placeholder="CS023"
            name="faculty_id"
            value={formData.faculty_id}
            onChange={handleChange}
          />
        </Label>

        {/* Faculty Name */}
        <Label className="mt-4">
          <span>Faculty Name</span>
          <Input
            className="block w-full mt-1"
            placeholder="Pavithra Sri S"
            name="faculty_name"
            value={formData.faculty_name}
            onChange={handleChange}
          />
        </Label>

        {/* Department */}
        <Label className="mt-4">
          <span>Department</span>
          <Input
            className="block w-full mt-1"
            placeholder="Computer Science And Engineering"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </Label>

        {/* Industry Name */}
        <Label className="mt-4">
          <span>Industry Name</span>
          <Input
            className="block w-full mt-1"
            placeholder="TCS"
            name="industry_name"
            value={formData.industry_name}
            onChange={handleChange}
          />
        </Label>

        {/* Industry Type */}
        <Label className="mt-4">
          <span>Industry Type</span>
          <Input
            className="block w-full mt-1"
            placeholder="Software"
            name="industry_type"
            value={formData.industry_type}
            onChange={handleChange}
          />
        </Label>

        {/* Start Date */}
        <Label className="mt-4">
          <span>Start Date</span>
          <Input
            className="block w-full mt-1"
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
          />
        </Label>

        {/* End Date */}
        <Label className="mt-4">
          <span>End Date</span>
          <Input
            className="block w-full mt-1"
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
          />
        </Label>

        {/* Utilized Amount */}
        <Label className="mt-4">
          <span>Utilized Amount</span>
          <Input
            className="block w-full mt-1"
            type="number"
            name="utilized_amount"
            placeholder="0"
            value={formData.utilized_amount}
            onChange={handleChange}
          />
        </Label>

        {/* Participation Status */}
        <Label className="mt-4">
          <span>Participation Status</span>
          <Select
            className="block w-full mt-1"
            name="participation_status"
            value={formData.participation_status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="Participated">Participated</option>
            <option value="Award Winner">Award Winner</option>
            <option value="Not Participated">Not Participated</option>

          </Select>
        </Label>

        {/* Document Name */}
        <Label className="mt-4">
          <span>Document Name</span>
          <Input
            className="block w-full mt-1"
            type="file"
            name="UploadFiles"
            onChange={handleFileChange}
          />
        </Label>

        {/* GeoTag */}
        <Label className="mt-4">
          <span>GeoTag</span>
          <Input
            className="block w-full mt-1"
            type="file"
            name="UploadImg"
            onChange={handleImgFileChange}
          />
        </Label>

        {/* Buttons */}
        <div className="flex mt-4">
          <Button onClick={handleSubmit}>Submit</Button>
          <Button className="ml-4" layout="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}

export default Forms;
