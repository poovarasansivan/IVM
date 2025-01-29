import React, { useState } from "react";
import { Input, Label, Button, Select } from "@windmill/react-ui";
import {
  FaUser,
  FaBus,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import PageTitle from "../components/Typography/PageTitle";
import { useHistory } from "react-router-dom";
import { business } from "faker/lib/locales/en";

function Forms() {
  const [formData, setFormData] = useState({
    facultyid: "",
    facultyname: "",
    department: "",
    transportneeded: "Yes",
    noofdays: "",
    totalpeople: "",
    source: "",
    destination: "",
    onboardingtime: "",
    comments:"",
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "http://localhost:8080/protected/addnew-transport",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            faculty_id: formData.facultyid,
            faculty_name: formData.facultyname,
            department: formData.department,
            transport_needed: formData.transportneeded,
            no_of_days: parseInt(formData.noofdays, 10),
            total_people: parseInt(formData.totalpeople,10),
            src: formData.source,
            dest: formData.destination,
            onboard_time: formData.onboardingtime,
            comments: formData.comments,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to store form data");
      }
      history.push("/app/transport-request");
    } catch (error) {
      console.error("Error storing form data:", error);
    }
  };

  const handleCancel = () => {
    history.push("/app/transport-request");
  };

  return (
    <>
      <PageTitle>Create a New Transport Request</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        {/* Faculty ID */}
        <Label>
          <span>Faculty ID</span>
          <Input
            className="block w-full mt-1"
            placeholder="Faculty ID"
            name="facultyid"
            value={formData.facultyid}
            onChange={handleChange}
            icon={FaUser}
          />
        </Label>

        {/* Faculty Name */}
        <Label className="mt-4">
          <span>Faculty Name</span>
          <Input
            className="block w-full mt-1"
            placeholder="Faculty Name"
            name="facultyname"
            value={formData.facultyname}
            onChange={handleChange}
            icon={FaUser}
          />
        </Label>

        {/* Department */}
        <Label className="mt-4">
          <span>Department</span>
          <Input
            className="block w-full mt-1"
            placeholder="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </Label>

        {/* Transport Needed */}

        <Label className="mt-4">
          <span>Transport Needed</span>
          <Select
            className="block w-full mt-1"
            name="transportneeded"
            value={formData.transportneeded}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Participated">Yes</option>
            <option value="Not Participated">No</option>
          </Select>
        </Label>
        {/* Number of Days */}
        <Label className="mt-4">
          <span>Number of Days</span>
          <Input
            className="block w-full mt-1"
            placeholder="Number of Days"
            name="noofdays"
            value={formData.noofdays}
            onChange={handleChange}
          />
        </Label>

        {/* Total People */}
        <Label className="mt-4">
          <span>Total People</span>
          <Input
            className="block w-full mt-1"
            placeholder="Total People"
            name="totalpeople"
            value={formData.totalpeople}
            onChange={handleChange}
            icon={FaUsers}
          />
        </Label>

        {/* Source */}
        <Label className="mt-4">
          <span>Source</span>
          <Input
            className="block w-full mt-1"
            placeholder="Source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            icon={FaMapMarkerAlt}
          />
        </Label>

        {/* Destination */}
        <Label className="mt-4">
          <span>Destination</span>
          <Input
            className="block w-full mt-1"
            placeholder="Destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            icon={FaMapMarkerAlt}
          />
        </Label>

        {/* Onboarding Time */}
        <Label className="mt-4">
          <span>Onboarding Time</span>
          <Input
            className="block w-full mt-1"
            type="datetime-local"
            name="onboardingtime"
            value={formData.onboardingtime}
            onChange={handleChange}
            icon={FaCalendarAlt}
          />
        </Label>
        <Label className="mt-4">
          <span>Transport Needed For</span>
          <Input
            className="block w-full mt-1"
            placeholder="Reason for Transport Request"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          />
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
