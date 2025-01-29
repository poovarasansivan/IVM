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

function Addnewusers() {
  const [formData, setFormData] = useState({
    facultyid: "",
    facultyname: "",
    department: "",
    email: "",
    experience: "",
    role: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "http://localhost:8080/protected/addnew-user",
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
            email: formData.email,
            experience: parseInt(formData.experience, 10),
            role: formData.role,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to store form data");
      }
      history.push("/app/manage-users");
    } catch (error) {
      console.error("Error storing form data:", error);
    }
  };

  const handleCancel = () => {
    history.push("/app/manage-users");
  };

  return (
    <>
      <PageTitle>Create a New User</PageTitle>
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
        <Label className="mt-4">
          <span>Email</span>
          <Input
            className="block w-full mt-1"
            placeholder="abc@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Label>
        <Label className="mt-4">
          <span>Experience</span>
          <Input
            className="block w-full mt-1"
            type="number"
            placeholder="10"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />
        </Label>
        {/* Transport Needed */}

        <Label className="mt-4">
          <span>Role</span>
          <Select
            className="block w-full mt-1"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="1">Admin</option>
            <option value="2">User</option>
          </Select>
        </Label>

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

export default Addnewusers;
