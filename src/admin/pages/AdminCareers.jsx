import React, { useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Toast,
  Card,
} from "flowbite-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { toast } from "react-toastify";
import { addJob, getAllJobs } from "../../services/allAPI";
import { deleteJob } from "../../services/allAPI";
import { useContext } from "react";
import { getAllApplications } from "../../services/allAPI";
import { authContext } from "../../context/authContext";
import { baseURL } from "../../services/baseURL";

const AdminCareers = () => {
  const [showJobs, setShowJobs] = useState(true);
  const [showApplications, setShowApplications] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [ApplicationsData, setApplicationData] = useState([]);
  let { token } = useContext(authContext);

  const [jobInputData, setjobInputData] = useState({
    jobId: "",
    jobRole: "",
    jobDec: "",
    publishedDate: "",
    lastDate: "",
    salary: "",
    experience: "",
  });
  useEffect(() => {
    getJobData();
    getAllApplicationsdata();
  }, []);

  const onAddJobClick = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiresponse = await addJob(jobInputData, header);

      if (apiresponse.status == 201) {
        toast.success("Succesfully added");
      } else {
        toast.error(apiresponse.response.data.message);
      }
      setOpenModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getJobData = async () => {
    try {
      let apiresponse = await getAllJobs();
      console.log(apiresponse);
      if (apiresponse.status == 200) {
        setJobData(apiresponse.data);
      } else {
        toast.error(apiresponse.response.data.message);
      }
    } catch (error) {
      console.log(object);
      toast.error("Something went wrong in the server");
    }
  };

  const onDeleteClick = async (id) => {
    try {
      let token = localStorage.getItem("token");

      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiresponse = await deleteJob(id, header);

      if (apiresponse.status === 200) {
        toast.success("Job deleted successfully");
        getJobData(); // refresh list
      } else {
        toast.error(apiresponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete job");
    }
  };

  const getAllApplicationsdata = async () => {
    try {
      const header = {
        Authorization: `Bearer ${token}`,
      };

      const apiresponse = await getAllApplications(header);

      console.log("this application data", apiresponse.data.allApplications);

      setApplicationData(apiresponse.data.allApplications);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[3fr_9fr]">
        <AdminSidebar />
        <div className="text-center ">
          <div
            className="mt-16 flex items-center justify-center gap-2"
            style={{ height: "25%" }}
          >
            <button
              className="btn h-10 bg-gray-500 border rounded p-1 text-white cursor-pointer"
              onClick={() => {
                setShowJobs(true);
                setShowApplications(false);
              }}
            >
              View jobs
            </button>
            <button
              className="btn bg-gray-500 border h-10 rounded p-1 text-white cursor-pointer"
              onClick={() => {
                setShowJobs(false);
                setShowApplications(true);
              }}
            >
              Application
            </button>
          </div>
          <div>
            {showJobs && (
              <div>
                <h1 className="text-center text-black font-bold">All Jobs</h1>

                {jobData.length > 0 ? (
                  <div className="flex flex-wrap gap-4 justify-center mt-5">
                    {jobData.map((eachjob, index) => (
                      <Card key={eachjob._id} className="max-w-sm">
                        <button
                          className="bg-black text-yellow-200 w-25 cursor-pointer"
                          onClick={() => onDeleteClick(eachjob._id)}
                        >
                          delete job
                        </button>

                        <h1>
                          <b>Job ID:</b> {eachjob.jobId}
                        </h1>
                        <h1>
                          <b>Role:</b> {eachjob.jobRole}
                        </h1>
                        <h1>
                          <b>Description:</b> {eachjob.jobDec}
                        </h1>
                        <h1>
                          <b>Published:</b> {eachjob.publishedDate}
                        </h1>
                        <h1>
                          <b>Last Date:</b> {eachjob.lastDate}
                        </h1>
                        <h1>
                          <b>Salary:</b> {eachjob.salary}
                        </h1>
                        <h1>
                          <b>Experience:</b> {eachjob.experience}
                        </h1>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <h1>No jobs added</h1>
                )}
                <button
                  className="btn bg-green-500 border h-10 rounded-full p-1 text-white cursor-pointer mt-5"
                  onClick={() => setOpenModal(true)}
                >
                  Add Job
                </button>
              </div>
            )}
            {showApplications && (
              <div>
                Show applicatiosn
                {ApplicationsData?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table
                      striped
                      className="bg-light h-75 border-dark border-2"
                    >
                      <TableHead className="border">
                        <TableRow>
                           <TableHeadCell>Job Id</TableHeadCell>
                        <TableHeadCell>Job title</TableHeadCell>
                        <TableHeadCell>Name</TableHeadCell>
                        <TableHeadCell>email</TableHeadCell>
                        <TableHeadCell>Phone</TableHeadCell>
                        <TableHeadCell>Phone</TableHeadCell>
                        </TableRow>
                       
                      </TableHead>
                      <TableBody className="divide-y bg-transparent">
                        {ApplicationsData.map((eachAppl, index) => (
                          <React.Fragment key={index + 1}>
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {eachAppl.jobId}
                              </TableCell>
                              <TableCell>{eachAppl.jobTitle}</TableCell>
                              <TableCell>{eachAppl.fullName}</TableCell>
                              <TableCell>{eachAppl.email}</TableCell>
                              <TableCell>{eachAppl.phoneNumber}</TableCell>
                              <TableCell>
                                <a
                                  href={`${baseURL}/uploads/${eachAppl.resume}`}
                                  className="cursor-pointer"
                                >
                                  Download Resume
                                </a>
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <h1>No Appliaction recevied</h1>
                )}
              </div>
            )}

            <Modal
              show={openModal}
              onClose={() => setOpenModal(false)}
              className="mx-auto mt-10"
              style={{ width: "1000px" }}
            >
              <ModalHeader>Add Job</ModalHeader>
              <ModalBody className="flex justify-center">
                <div
                  className="grid grid-cols-2 h-75 gap-2 justify-between"
                  style={{ width: "500px" }}
                >
                  <input
                    type="text"
                    className="bg-gray-200 p-3"
                    placeholder="Job ID"
                    onChange={(e) =>
                      setjobInputData({
                        ...jobInputData,
                        jobId: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="bg-gray-200 p-3"
                    placeholder="Job Role"
                    onChange={(e) =>
                      setjobInputData({
                        ...jobInputData,
                        jobRole: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="bg-gray-200 p-3"
                    placeholder="Job Description"
                    onChange={(e) =>
                      setjobInputData({
                        ...jobInputData,
                        jobDec: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="bg-gray-200 p-3"
                    placeholder="Published Date"
                    onChange={(e) =>
                      setjobInputData({
                        ...jobInputData,
                        publishedDate: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="bg-gray-200 p-3"
                    placeholder="Last Date"
                    onChange={(e) =>
                      setjobInputData({
                        ...jobInputData,
                        lastDate: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="bg-gray-200 p-3"
                    placeholder="Salary"
                    onChange={(e) =>
                      setjobInputData({
                        ...jobInputData,
                        salary: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="bg-gray-200 p-3"
                    placeholder="Experience"
                    onChange={(e) =>
                      setjobInputData({
                        ...jobInputData,
                        experience: e.target.value,
                      })
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter className="d-flex justify-center mt-10">
                <Button className="bg-amber-400 p-3" onClick={onAddJobClick}>
                  accept
                </Button>
                <Button
                  className="bg-green-600 p-3"
                  onClick={() => setOpenModal(false)}
                >
                  close
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCareers;
