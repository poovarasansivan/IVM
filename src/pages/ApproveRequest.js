import React, { useState, useEffect, useRef } from "react";
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
import { IoMdEye } from "react-icons/io";
import { EditIcon, TrashIcon } from "../icons";
import PageTitle from "../components/Typography/PageTitle";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import { Label } from "@windmill/react-ui";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useHistory } from "react-router-dom";

function FacultyRequestTable() {
  const [facultyRequests, setFacultyRequests] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [rowDataToEdit, setRowDataToEdit] = useState(null);
  const [editedData, setEditedData] = useState({});
  const history = useHistory();

  const role = localStorage.getItem("role");
  const resultsPerPage = 8;
  const totalResults = facultyRequests.length;

  const [page, setPage] = useState(1);

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
          (request.industry_type &&
            request.industry_type
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (request.req_status &&
            request.req_status.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm, facultyRequests]);

  function openEditModal(rowData) {
    setRowDataToEdit(rowData);
    setIsEditModalOpen(true);
  }

  function openViewModal(rowData) {
    setRowDataToEdit(rowData);
    setIsViewModalOpen(true);
  }

  function closeEditModal() {
    setIsEditModalOpen(false);
  }

  function openDeleteModal(rowData) {
    setRowDataToEdit(rowData);
    setIsDeleteModalOpen(true);
  }
  const handleAddnew = () => {
    history.push("/app/forms");
  };
  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  function handleUpdate() {
    const updatedRequests = facultyRequests.map((request) =>
      request.req_id === rowDataToEdit.req_id
        ? { ...request, ...editedData }
        : request
    );
    setFacultyRequests(updatedRequests);
    closeEditModal();
  }

  function handleDelete() {
    const updatedRequests = facultyRequests.filter(
      (request) => request.req_id !== rowDataToEdit.req_id
    );
    setFacultyRequests(updatedRequests);
    closeDeleteModal();
  }

  function handlePageChange(p) {
    setPage(p);
  }

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  const requesturlforadmin = "http://localhost:8080/protected/get-request-details";
  const requesturlforfaculty = "http://localhost:8080/protected/get-myrequest-details";

  const fetchRequestDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role"); // Assuming `role` is stored in localStorage
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
        setFacultyRequests(data);
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
        "http://localhost:8080/protected/update-request-details",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            req_id: req_id,
            comments: "NA",
            req_status: status,
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

  return (
    <>
      <PageTitle>Faculty Industrial Visit </PageTitle>

      <TableContainer className="mb-8">
        <div className="m-4 flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          <div className="flex flex-row">
            <Button onClick={handleAddnew}>
              <CiCirclePlus size={24} className="mr-2 font-bold" />
              Add New
            </Button>
          </div>
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
              <TableCell>Request Form</TableCell>
              <TableCell>Industry Name</TableCell>
              <TableCell>Industry Type</TableCell>
              <TableCell>No. of Days</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Budget Requested</TableCell>
              <TableCell>Allocated Budget</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {filteredData
              .slice((page - 1) * resultsPerPage, page * resultsPerPage)
              .map((request, index) => (
                <TableRow key={index + 1}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{request.req_id}</TableCell>
                  <TableCell>{request.faculty_id}</TableCell>
                  <TableCell>{request.faculty_name}</TableCell>
                  <TableCell>{request.department}</TableCell>
                  <TableCell>{request.request_form}</TableCell>
                  <TableCell>{request.industry_name}</TableCell>
                  <TableCell>{request.industry_type}</TableCell>
                  <TableCell>{request.no_of_days}</TableCell>
                  <TableCell>{request.start_date}</TableCell>
                  <TableCell>{request.end_date}</TableCell>
                  <TableCell>{request.budget_requested}</TableCell>
                  <TableCell>{request.allocated_budget}</TableCell>
                  <TableCell>{request.comments}</TableCell>
                  <TableCell>
                    {request.req_status === "1" ? (
                      <Badge type="success">Approved</Badge>
                    ) : request.req_status === "2" ? (
                      <Badge type="danger">Rejected</Badge>
                    ) : (
                      <Badge type="warning">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="View"
                        onClick={() => openViewModal(request)}
                      >
                        <IoMdEye className="w-5 h-5" />
                      </Button>
                      {role === "1" && (
                        <>
                          <Button
                            layout="link"
                            size="icon"
                            aria-label="Edit"
                            onClick={() => openEditModal(request)}
                          >
                            <EditIcon className="w-5 h-5" />
                          </Button>
                          <Button
                            layout="link"
                            size="icon"
                            aria-label="Delete"
                            onClick={() => openDeleteModal(request)}
                          >
                            <TrashIcon className="w-5 h-5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={handlePageChange}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <ModalHeader>Edit Request</ModalHeader>
        <ModalBody>
          {/* Form Fields for Edit */}
          <Label>Comments</Label>
          <Input
            type="text"
            name="comments"
            value={editedData.comments || rowDataToEdit?.comments}
            onChange={(e) =>
              setEditedData({ ...editedData, comments: e.target.value })
            }
          />
          <Label>Allocated Budget</Label>
          <Input
            type="number"
            name="allocated_budget"
            value={
              editedData.allocated_budget || rowDataToEdit?.allocated_budget
            }
            onChange={(e) =>
              setEditedData({ ...editedData, allocated_budget: e.target.value })
            }
          />
        </ModalBody>
        <ModalFooter>
          <Button layout="link" onClick={closeEditModal}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Update</Button>
        </ModalFooter>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalBody>Are you sure you want to delete this request?</ModalBody>
        <ModalFooter>
          <Button layout="link" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button onClick={handleDelete}>Delete</Button>
        </ModalFooter>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        <ModalHeader>View Request Details</ModalHeader>
        <ModalBody>
          {/* Display request details */}
          <div className="flex flex-row">
            <p className="text-sm font-medium">Faculty ID: </p>
            <p className="ml-2">{rowDataToEdit?.faculty_id}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Faculty Name: </p>
            <p className="ml-2">{rowDataToEdit?.faculty_name}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Industry Name: </p>
            <p className="ml-2">{rowDataToEdit?.industry_name}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Industry Type: </p>
            <p className="ml-2">{rowDataToEdit?.industry_type}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Start Date: </p>
            <p className="ml-2">{rowDataToEdit?.start_date}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">End Date: </p>
            <p className="ml-2">{rowDataToEdit?.end_date}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium">Budget Requested: </p>
            <p className="ml-2">{rowDataToEdit?.budget_requested}</p>
          </div>
          <div className="flex flex-row">
            <p className="text-sm font-medium mr-2">Request Form: </p>
            <a
              href={`http://localhost:8080/request-file-sender/${rowDataToEdit?.request_form}`}
              target="_blank"
              className="text-blue-500 underline"
            >
              Click to view
            </a>
          </div>
        </ModalBody>
        <ModalFooter>
          {role === "1" && (
            <>
              <Button
                layout="link"
                className="bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={() => handleRequestApproval(rowDataToEdit.req_id, "1")}
              >
                <p className="text-white">Approve</p>
              </Button>
              <Button
                layout="link"
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => handleRequestApproval(rowDataToEdit.req_id, "2")}
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
