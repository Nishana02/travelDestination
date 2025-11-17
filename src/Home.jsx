import React, { useEffect, useState } from "react";
import {deleteDetails,editDetails,getPlaceDetails,placeDetails} from "./services/allApi";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import { MdOutlineFlightTakeoff } from "react-icons/md";


const Home = () => {
  const [inputPlace, setInputPlace] = useState("");
  const [inputCountry, setInputCountry] = useState("");
  const [inputBudget, setInputBudget] = useState("");
  const [inputImage, setInputImage] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  const [placeData, setPlaceData] = useState([]);
  const [editData,setEditData]=useState({})
  const [editId,setEditId]=useState(null)

  useEffect(() => {
    loadDetails();
  }, []);

  const addClick = async () => {
    let reqBody = {
      name: inputPlace,
      country: inputCountry,
      budget: inputBudget,
      image: inputImage,
      status: inputStatus
    };
    
    let apiResponse = await placeDetails(reqBody);
    console.log(apiResponse);
    
    if (apiResponse.status === 201) {
      alert("Successfully Added");
      loadDetails();
    } else {
      alert("Something went wrong. Error occurred");
    }
  };

  const loadDetails = async () => {
    let apiResponse = await getPlaceDetails();
    console.log(apiResponse);
    if (apiResponse.status === 200) {
      setPlaceData(apiResponse.data);
    } else {
      alert("Something went wrong can't access data");
    }
  };

  const onDeleteClick = async (id) => {
    let apiResponse = await deleteDetails(id);
    console.log(apiResponse);
    if (apiResponse.status === 200) {
      alert("Successfully deleted");
      loadDetails();
    }
  };

  const oneditBtnClick=(places)=>{
    setInputPlace(places.name)
    setInputCountry(places.country)
    setInputBudget(places.budget)
    setInputImage(places.image)
    setInputStatus(places.status)
    setEditId(places.id)
  }
   
  const editClick=async()=>{
    let reqBody={
      name: inputPlace,
      country: inputCountry,
      budget: inputBudget,
      image: inputImage,
      status: inputStatus
    };
    let apiResponse=await editDetails(editId,reqBody)
    console.log(apiResponse)
    if(apiResponse.status==200){
        alert("Successfully Edited")
        loadDetails()
        setInputPlace("");
      setInputCountry("");
      setInputBudget("");
      setInputImage("");
      setInputStatus("");
      setEditId(null)
    }else{
      alert("error occured during edit")
    }
  }
  return (
    <>
      <div className="text-center mt-3">
        <h1 style={{ color: "#87CEEB", fontWeight: "bold" }}>
           Find Your Next Adventure   <MdOutlineFlightTakeoff /> 
        </h1>
        <p style={{ fontSize: "18px", color: "#E0E0E0" }}>
          Life is short, and the world is wide
        </p>
      </div>

      <hr
        style={{
          borderColor: "#87CEEB",
          opacity: "0.3",
          width: "80%",
          margin: "30px auto",
        }}
      />

      <div className="row justify-content-center mt-4">
        <div className="col-md-6 col-lg-4">
          <div
            style={{
              backgroundColor: "#000000",
              border: "2px solid #87CEEB",
              borderRadius: "12px",
              padding: "30px",
              boxShadow: "0px 0px 25px rgba(135, 206, 235, 0.4)",
              color: "#87CEEB",
            }}
          >
            <h3 className="text-center mb-3">Add a New Destination</h3>

            <div className="mb-2">
              <label className="form-label">Destination Name</label>
              <input
                className="form-control"
                value={inputPlace}
                onChange={(e) => setInputPlace(e.target.value)}
                style={{
                  backgroundColor: "#111111",
                  color: "#87CEEB",
                  border: "1px solid #4682B4",
                }}
                placeholder="e.g., Paris, France"
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Country</label>
              <input
                className="form-control"
                value={inputCountry}
                onChange={(e) => setInputCountry(e.target.value)}
                style={{
                  backgroundColor: "#111111",
                  color: "#87CEEB",
                  border: "1px solid #4682B4",
                }}
                placeholder="e.g., France"
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Budget</label>
              <input
                className="form-control"
                value={inputBudget}
                onChange={(e) => setInputBudget(e.target.value)}
                style={{
                  backgroundColor: "#111111",
                  color: "#87CEEB",
                  border: "1px solid #4682B4",
                }}
                placeholder="e.g., $1000"
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Image URL</label>
              <input
                className="form-control"
                value={inputImage}
                onChange={(e) => setInputImage(e.target.value)}
                style={{
                  backgroundColor: "#111111",
                  color: "#87CEEB",
                  border: "1px solid #4682B4",
                }}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <input
                className="form-control"
                value={inputStatus}
                onChange={(e) => setInputStatus(e.target.value)}
                style={{
                  backgroundColor: "#111111",
                  color: "#87CEEB",
                  border: "1px solid #4682B4",
                }}
                placeholder="eg: visited"
              />
            </div>

            {
              editId?<button
              onClick={editClick}
              className="btn btn-warning w-100 mt-3"
              style={{
                
                color: "#000000",
                fontWeight: "bold",
                border: "none",
              }}
            >
              Edit Details
            </button>:<button
              onClick={addClick}
              className="btn w-100 mt-3"
              style={{
                backgroundColor: "#87CEEB",
                color: "#000000",
                fontWeight: "bold",
                border: "none",
              }}
            >
              Add Destination
            </button>
            }

            
          </div>
        </div>
      </div>

      
      <Container  style={{marginTop:"130px"}}>
        <Row>
          {placeData.length > 0 ? (
            placeData.map((eachPlace, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card
                  style={{
                    backgroundColor: "#1E1E1E",
                    border: "1px solid #87CEEB",
                    color: "white",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={eachPlace.image}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body>
                    <Card.Title style={{ color: "#87CEEB" }}>
                      {eachPlace.name}
                    </Card.Title>
                    <Card.Text>
                      <strong>Country:</strong> {eachPlace.country}
                      <br />
                      <strong>Budget:</strong> {eachPlace.budget}
                      <br />
                      <strong>Status:</strong> {eachPlace.status}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button variant="warning" size="sm" onClick={()=>oneditBtnClick(eachPlace)}>
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDeleteClick(eachPlace.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div className="text-center w-100">
              <h3 style={{ color: "#87CEEB" }}>No destinations added yet</h3>
            </div>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Home;