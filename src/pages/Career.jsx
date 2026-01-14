import React, { useEffect, useState } from "react";
import { applyJob, getAllJobs } from "../services/allAPI";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Toast,
  Card,
} from "flowbite-react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Career = () => {
  const [showJobs, setShowJobs] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [applyData, setApplyData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    resume: "",
    jobId: "",
    jobTitle: "",
  });

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
  }, []);
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

  const onApplyClick= async()=>{
    try {
       let headers={
        "Content-Type":"multipart/form-data"
      }
      let reqBody= new FormData()
      for(let key in applyData){
        reqBody.append(key,applyData[key])
      }
      let apiresponse= await applyJob(reqBody,headers)

      if(apiresponse.status==201){
        toast.success("Job Applied")
      }else{
       
        toast.error(apiresponse.response.data.message)
      }
      
    } catch (error) {
     console.log(error)
    }
  }

  return (
    <div>
      <Header />
      <div className="p-10">
        <h1 className="text-center text-black font-bold">All Jobs</h1>

        {jobData.length > 0 ? (
          <div className="flex flex-wrap gap-4 justify-center mt-5">
            {jobData.map((eachjob, index) => (
              <Card key={eachjob._id} className="max-w-sm">
                <button
                  className="bg-amber-400 p-5"
                  onClick={() => {
                    setApplyData({...applyData,jobId:eachjob.jobId,jobTitle:eachjob.jobRole})
                    setOpenModal(true)
                  }}
                >
                  Apply now
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
      </div>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="my-50"
        style={{ width: "1200px" }}
      >
        <ModalHeader>Apply Job</ModalHeader>
        <ModalBody className="bg bg-gray-400 text-black">
          <div className="space-y-6  text-black flex flex-col">
            <input
              type="text"
              placeholder="Full name"
              className="bg-amber-50 p-3 rounded-full"
              onChange={(e) =>
                setApplyData({ ...applyData, fullName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone number"
              className="bg-amber-50 p-3 rounded-full"
              onChange={(e) =>
                setApplyData({ ...applyData, phoneNumber: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="email"
              className="bg-amber-50 p-3 rounded-full"
              onChange={(e) =>
                setApplyData({ ...applyData, email: e.target.value })
              }
            />
            <input
              type="file"
              placeholder="Resume"
              className="bg-amber-50 p-3 rounded-full"
              onChange={(e)=>setApplyData({...applyData,resume:e.target.files[0]})}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onApplyClick} className="bg-amber-500">
            Apply Job
          </Button>
          <Button className="bg-green-500" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </ModalFooter>
      </Modal>
      <Footer />
    </div>
  );
};

export default Career;
