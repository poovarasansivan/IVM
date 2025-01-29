import React, { useState } from "react";
import { Input, Label, Button } from "@windmill/react-ui";
import {
  FaUser,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaCheckCircle,
} from "react-icons/fa";
import PageTitle from "../components/Typography/PageTitle";
import { FaRegFilePdf } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";

function Forms() {
  const [formData, setFormData] = useState({
    faculty_id: "",
    faculty_name: "",
    department: "",
    request_form: null,
    industry_name: "",
    industry_type: "",
    no_of_days: "",
    start_date: "",
    end_date: "",
    budget_requested: "",
    allocated_budget: "",
    comments: "",
  });
  const history = useHistory();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const token = localStorage.getItem("token");

    if (file) {
      const formData = new FormData();
      formData.append("UploadFiles", file);

      try {
        const uploadResponse = await fetch(
          "http://localhost:8080/protected/request-file-handler",
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
        console.error("Error uploading file:", error);
      }
    }
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(formData);
    try {
      const response = await fetch(
        "http://localhost:8080/protected/addnew-request",
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
            request_form: formData.UploadFiles,
            industry_name: formData.industry_name,
            industry_type: formData.industry_type,
            no_of_days: parseInt(formData.no_of_days, 10),
            start_date: formData.start_date,
            end_date: formData.end_date,
            budget_requested: parseInt(formData.budget_requested, 10),
            allocated_budget: parseInt(formData.allocated_budget, 10),
            comments: formData.comments,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to store form data");
      }
      history.push("/app/approve-request");
    } catch (error) {
      console.error("Error storing form data:", error);
    }
  };

  const handleCancel = (e) => {
    history.push("/app/approve-request");
  };

  return (
    <>
      <PageTitle>Create a New Industrial Visit Request</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        {/* Faculty ID */}
        <Label>
          <span>Faculty ID</span>
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <Input
              className="block w-full pl-10 mt-1"
              placeholder="CS236"
              name="faculty_id"
              value={formData.faculty_id}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <FaUser className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>

        {/* Faculty Name */}
        <Label className="mt-4">
          <span>Faculty Name</span>
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <Input
              className="block w-full pl-10 mt-1"
              placeholder="Pavithra Sri S"
              name="faculty_name"
              value={formData.faculty_name}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <FaUser className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>

        {/* Department */}
        <Label className="mt-4">
          <span>Department</span>
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <Input
              className="block w-full pl-10 mt-1"
              placeholder="Computer Science And Engineering"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <FaBuilding className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>

        {/* Request Form */}
        <Label className="mt-4">
          <span>Request Form</span>
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <Input
              className="block w-full pl-10 mt-1"
              type="file"
              name="UploadFiles"
              onChange={handleFileChange}
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <FaRegFilePdf className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>

        {/* Industry Name */}
        <Label className="mt-4">
          <span>Industry Name</span>
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <Input
              className="block w-full pl-10 mt-1"
              placeholder="TCS"
              name="industry_name"
              value={formData.industry_name}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <FaBuilding className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>

        {/* Industry Type */}
        <Label className="mt-4">
          <span>Industry Type</span>
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <Input
              className="block w-full pl-10 mt-1"
              placeholder="Software"
              name="industry_type"
              value={formData.industry_type}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <FaBuilding className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>

        {/* No. of Days */}
        <Label className="mt-4">
          <span>No. of Days</span>
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <Input
              className="block w-full pl-10 mt-1"
              type="number"
              placeholder="0"
              name="no_of_days"
              value={formData.no_of_days}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <FaCalendarAlt className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>

        {/* Start Date */}
        <Label className="mt-4">
          <span>Start Date</span>
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <Input
              className="block w-full pl-10 mt-1"
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <FaCalendarAlt className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>

        {/* End Date */}
        <Label className="mt-4">
          <span>End Date</span>
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <Input
              className="block w-full pl-10 mt-1"
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <FaCalendarAlt className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>

        {/* Budget Requested */}
        <Label className="mt-4">
          <span>Budget Requested</span>
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <Input
              className="block w-full pl-10 mt-1"
              type="number"
              placeholder="0"
              name="budget_requested"
              value={formData.budget_requested}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <FaMoneyBillAlt className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>

        {/* Allocated Budget */}
        <Label className="mt-4">
          <span>Allocated Budget</span>
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <Input
              className="block w-full pl-10 mt-1"
              placeholder="0"
              name="allocated_budget"
              value={formData.allocated_budget}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <FaMoneyBillAlt className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>

        {/* Submit Button */}
        <Button className="mt-4" onClick={handleSubmit}>
          Submit
        </Button>
        <Button className="ml-4" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </>
  );
}

export default Forms;
