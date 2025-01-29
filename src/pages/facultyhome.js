import React, { useState, useEffect } from "react";
import InfoCard from "../components/Cards/InfoCard";
import PageTitle from "../components/Typography/PageTitle";
import { MdOutlinePendingActions } from "react-icons/md";
import { PiGitPullRequestDuotone } from "react-icons/pi";
import { TbPlaceholder } from "react-icons/tb";
import { GoVerified } from "react-icons/go";
import RoundIcon from "../components/RoundIcon";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Pagination,
} from "@windmill/react-ui";

const Data = [
  {
    sno: 1,
    eventname: "Industrial Visit to TCS Bangalore",
    allocatedbudget: 15000,
    utilizedbudget: 14000,
    status: "completed",
    date: "Fri Feb 28 2025 10:30:00 IST+0530",
  },
  {
    sno: 2,
    eventname: "Industrial Visit to Infosys Hyderabad",
    allocatedbudget: 20000,
    utilizedbudget: 19000,
    status: "completed",
    date: "Tue Mar 05 2025 14:00:00 IST+0530",
  },
  {
    sno: 3,
    eventname: "Industrial Visit to Wipro Pune",
    allocatedbudget: 18000,
    utilizedbudget: 17000,
    status: "completed",
    date: "Wed Mar 15 2025 09:15:00 IST+0530",
  },
  {
    sno: 4,
    eventname: "Industrial Visit to HCL Noida",
    allocatedbudget: 12000,
    utilizedbudget: 11500,
    status: "completed",
    date: "Mon Mar 18 2025 13:45:00 IST+0530",
  },
  {
    sno: 5,
    eventname: "Industrial Visit to Google Hyderabad",
    allocatedbudget: 30000,
    utilizedbudget: 28000,
    status: "pending",
    date: "Thu Apr 01 2025 11:30:00 IST+0530",
  },
  {
    sno: 6,
    eventname: "Industrial Visit to Amazon Chennai",
    allocatedbudget: 25000,
    utilizedbudget: 20000,
    status: "upcoming",
    date: "Tue Apr 10 2025 10:00:00 IST+0530",
  },
  {
    sno: 7,
    eventname: "Industrial Visit to Zoho Chennai",
    allocatedbudget: 10000,
    utilizedbudget: 0,
    status: "upcoming",
    date: "Sat Apr 20 2025 16:00:00 IST+0530",
  },
];

function FacultyDashboard() {
  const [totalapprovedreq, setTotalApprovedReq] = useState(0);
  const [recentvsits, setRecentVisits] = useState([]);
  const [totalvisits, setTotalVisits] = useState(0);
  const [pageTable1, setPageTable1] = useState(1);
  const [pending, setPendingReq] = useState(0);
  const resultsPerPage = 7;
  const totalResults = Data.length; // Use Data's length for pagination

  function onPageChangeTable1(p) {
    setPageTable1(p);
  }

  useEffect(() => {
    setRecentVisits(
      Data.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage)
    );
  }, [pageTable1]);
  

  useEffect(() => {
    fetchTotalApprovedReq();
    fetchTotalVisitConducted();
    fetchTotalPendingReq();
  }, []);

  const fetchTotalApprovedReq = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8080/protected/get-individual-req/${localStorage.getItem(
          "facultyID"
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setTotalApprovedReq(data.total_approved_request);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTotalVisitConducted = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8080/protected/get-individual-visit/${localStorage.getItem(
          "facultyID"
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setTotalVisits(data.total_visit_conducted);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTotalPendingReq = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8080/protected/get-individual-pending/${localStorage.getItem(
          "facultyID"
        )}",`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setPendingReq(data.total_pending_request);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchrecentvisits();
  },[]);

  const fetchrecentvisits = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/protected/get-individual-recentreq",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            faculty_id: localStorage.getItem("facultyID"),
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRecentVisits(data);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* Cards */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Approved Request" value={totalapprovedreq}>
          <RoundIcon
            icon={PiGitPullRequestDuotone}
            iconColorClass="text-orange-500"
            bgColorClass="bg-orange-100"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Total visits Conducted" value={totalvisits}>
          <RoundIcon
            icon={TbPlaceholder}
            iconColorClass="text-green-500"
            bgColorClass="bg-green-100"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Approved Request" value={totalapprovedreq}>
          <RoundIcon
            icon={GoVerified}
            iconColorClass="text-blue-500"
            bgColorClass="bg-blue-100"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Pending Request" value={pending}>
          <RoundIcon
            icon={MdOutlinePendingActions}
            iconColorClass="text-teal-500"
            bgColorClass="bg-teal-100"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <PageTitle>Recent Industrial Visits</PageTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>S No</TableCell>
              <TableCell>Industry Name</TableCell>
              <TableCell>Industry Type</TableCell>
              <TableCell>Allocated Budget</TableCell>
              <TableCell>Utilized Budget</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {recentvsits.flat().map((user, index) => (
              <TableRow key={index+1}>
                <TableCell>
                  <span className="text-sm">{index+1}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.industry_name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.industry_type}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.allocated_budget}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.utilized_amount}</span>
                </TableCell>
                <TableCell>
                  {" "}
                  <Badge
                    type={
                      user.participation_status === "Participated"
                        ? "success"
                        : user.participation_status === "Not Participated"
                        ? "danger"
                        : user.participation_status === "Award Winner"
                        ? "success"
                        : "neutral"
                    }
                  >
                    {user.participation_status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {user.start_date}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable1}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  );
}

export default FacultyDashboard;
