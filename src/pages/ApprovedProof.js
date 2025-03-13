import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Button,
  Pagination,
  Input,
} from "@windmill/react-ui";
import { FaDownload } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import { Label } from "@windmill/react-ui";
import PageTitle from "../components/Typography/PageTitle";
import { Link, useHistory } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";

function FacultyRequestTable() {
  const [facultyRequests, setFacultyRequests] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [rowDataToView, setRowDataToView] = useState(null);
  const history = useHistory(); // Initialize useHistory hook

  useEffect(() => {
    setFilteredData(
      facultyRequests.filter(
        (request) =>
          (request.faculty_name &&
            request.faculty_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (request.faculty_id &&
            request.faculty_id
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (request.industry_name &&
            request.industry_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
              (request.req_id &&
                request.req_id
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())) ||
          (request.department &&
            request.department
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))||
              (request.participation_status &&
                request.participation_status
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm, facultyRequests]);

  function openViewModal(rowData) {
    setRowDataToView(rowData);
    setIsViewModalOpen(true);
  }

  function closeViewModal() {
    setIsViewModalOpen(false);
  }

  const handleAddnew = () => {
    history.push("/app/report-submission");
  };

  const requesturlforadmin =
    "http://localhost:8080/protected/get-report-details";
  const requesturlforfaculty =
    "http://localhost:8080/protected/get-myreport-details";

  const fetchRequestDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      let response;

      if (role === "1") {
        // Admin request
        response = await fetch(requesturlforadmin, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else if (role === "2") {
        // Faculty request
        const faculty_id = localStorage.getItem("facultyID"); // Assuming `faculty_id` is stored in localStorage
        response = await fetch(requesturlforfaculty, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ faculty_id }),
        });
      }

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if(data.length === 0) {
         setFacultyRequests([]);
        }
        else{
          setFacultyRequests(data);
        }
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequestDetails();
  }, []);

  const handleRequestApproval = async (req_id, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/protected/update-report-details",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            req_id: req_id,
            comments: "NA",
            approval_status: status,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Request approved successfully", data);
        setIsViewModalOpen(false);
      } else {
        console.log("Failed to approve request", data);
      }
    } catch (error) {
      setIsViewModalOpen(false);
      console.log(error);
    }
  };

  const role = localStorage.getItem("role");
  return (
    <>
      <PageTitle>Approve Reports</PageTitle>

      <TableContainer className="mb-8">
        <div className="m-4 flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
         {role==="2" && (
          <div className="flex flex-row">
            <Button onClick={handleAddnew}>
              <CiCirclePlus size={24} className="mr-2 font-bold" />
              Add New
            </Button>
          </div>
         )}
        </div>
        <hr className="border-t-1 w-full" />

        <Table>
          <TableHeader>
            <tr>
              <TableCell>S No</TableCell>
              <TableCell>Request ID</TableCell>
              <TableCell>Faculty ID</TableCell>
              <TableCell>Faculty Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Industry Name</TableCell>
              <TableCell>Industry Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Document Proof</TableCell>
              <TableCell>Geo Tag</TableCell>
              <TableCell>Utilized Amount</TableCell>
              <TableCell>Participation Status</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Report Status</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {filteredData.map((request, index) => (
              <TableRow key={index + 1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{request.req_id}</TableCell>
                <TableCell>{request.faculty_id}</TableCell>
                <TableCell>{request.faculty_name}</TableCell>
                <TableCell>{request.department}</TableCell>
                <TableCell>{request.industry_name}</TableCell>
                <TableCell>{request.industry_type}</TableCell>
                <TableCell>{request.start_date}</TableCell>
                <TableCell>{request.end_date}</TableCell>
                <TableCell>{request.document_proof}</TableCell>
                <TableCell>{request.geo_tag}</TableCell>
                <TableCell>{request.utilized_amount}</TableCell>
                <TableCell>{request.participation_status}</TableCell>
                <TableCell>{request.comments}</TableCell>
                <TableCell>
                  {request.approval_status === "1" ? (
                    <Badge type="success">Approved</Badge>
                  ) : request.approval_status === "2" ? (
                    <Badge type="danger">Rejected</Badge>
                  ) : (
                    <Badge type="warning">Pending</Badge>
                  )}
                </TableCell>

                <TableCell>
                  <Button
                    layout="link"
                    size="icon"
                    aria-label="View"
                    onClick={() => openViewModal(request)}
                  >
                    <IoMdEye className="w-5 h-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TableFooter>
          <Pagination
            totalResults={facultyRequests.length}
            resultsPerPage={8}
            onChange={() => {}}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

      {/* View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={closeViewModal}>
        <ModalHeader>View Request Details</ModalHeader>
        <ModalBody>
          {/* Display request details */}
          <div className="flex flex-row">
            <p className="text-sm font-medium">Request ID: </p>
            <p className="ml-2">{rowDataToView?.req_id}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Faculty ID: </p>
            <p className="ml-2">{rowDataToView?.faculty_id}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Faculty Name: </p>
            <p className="ml-2">{rowDataToView?.faculty_name}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Department: </p>
            <p className="ml-2">{rowDataToView?.department}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Industry Name: </p>
            <p className="ml-2">{rowDataToView?.industry_name}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Industry Type: </p>
            <p className="ml-2">{rowDataToView?.industry_type}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Start Date: </p>
            <p className="ml-2">{rowDataToView?.start_date}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">End Date: </p>
            <p className="ml-2">{rowDataToView?.end_date}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm mr-2 font-medium">Document: </p>
            <a
              href={`http://localhost:8080/report-file-sender/${rowDataToView?.document_proof}`}
              target="_blank"
              className="text-blue-500 underline"
            >
              Click to View
            </a>
          </div>
          <div className="flex flex-row">
            <p className="text-sm mr-2 font-medium">Geo Tag: </p>
            <a
              href={`http://localhost:8080/report-img-sender/${rowDataToView?.geo_tag}`}
              target="_blank"
              className="text-blue-500 underline"
            >
              Click to View
            </a>
          </div>
        </ModalBody>
        <ModalFooter>
          {role === "1" && (
            <>
              <Button
                layout="link"
                className="bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={() => handleRequestApproval(rowDataToView.req_id, "1")}
              >
                <p className="text-white">Approve</p>
              </Button>
              <Button
                layout="link"
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => handleRequestApproval(rowDataToView.req_id, "2")}
              >
                <p className="text-white">Reject</p>
              </Button>
            </>
          )}
          <Button
            layout="link"
            className="bg-gray-600 text-white hover:bg-gray-700"
            onClick={() => setIsViewModalOpen(false)}
          >
            <p className="text-white">Close</p>
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default FacultyRequestTable;
