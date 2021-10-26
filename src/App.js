import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Spinner from "react-spinkit";
import axios from "axios";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    if (event.target.value.length < 3) {
      dispatch({ type: "SET_CURRENT_SEARCH", payload: "" });
      setData([]);
    }

    if (event.target.value.length > 3) {
      setLoading(true);
      let fetchUrl =
        "https://api.github.com/search/repositories?q=" + event.target.value;

      dispatch({ type: "SET_CURRENT_SEARCH", payload: event.target.value });

      // axios to fetch the information from the endpoint
      axios
        .get(fetchUrl)
        .then(function (response) {
          setData(response.data.items);
          setLoading(false);
        })
        .catch(function (error) {
          // handle error
          setLoading(false);
          console.log(error);
        });
    }
  };

  return (
    <div className="App">
      <Container>
        <CusInput
          type="text"
          onChange={(event) => handleChange(event)}
          placeholder="Search Git Repo"
        />

        <ResponseContainer>
          {loading ? (
            <Spinner name="ball-beat" />
          ) : (
            data.map((ele) => (
              <ResponseItemCard
                key={ele.id}
                onClick={() => window.open(ele.html_url)}
              >
                <ResponseItemImage src={ele.owner.avatar_url} />
                <ResponseItemInfo>
                  <InfoItem>
                    <Label className="labelName">Name :</Label>
                    <Span> {ele.full_name}</Span>
                  </InfoItem>
                  <InfoItem>
                    <Label>Stargazers count :</Label>{" "}
                    <Span>{ele.stargazers_count}</Span>
                  </InfoItem>
                  <InfoItem>
                    <Label>Watchers count :</Label>{" "}
                    <Span>{ele.watchers_count}</Span>
                  </InfoItem>
                </ResponseItemInfo>
              </ResponseItemCard>
            ))
          )}
        </ResponseContainer>
      </Container>
    </div>
  );
}
const Container = styled.div`
  // padding: 40px;

  justify-self: center;
  align-self: center;
  width: 90%;
  height: 80%;
  display: grid;
  grid-template-rows: 80px auto;
`;
const CusInput = styled.input`
  border: none;
  box-shadow: 1px 5px 8px 8px #9090909c;
  border-radius: 1px;
  width: 50%;
  height: 40px;
  padding: 5px 10px;
  justify-self: center;

  transition: 0.3s;
  :focus {
    outline: none;
    transform: scale(1.01);
  }
`;

const ResponseContainer = styled.div`
  width: 100%;
  height: 450px;
  // border: 1px solid red;
  justify-self: center;
  display: grid;
  // padding: 15px;
  overflow-x: hidden;
  overflow-y: scroll;

  @media (max-width: 950px) {
    width: auto;
  }
`;

const ResponseItemCard = styled.div`
  width: 50%;
  justify-self: center;
  height: 80px;
  // border: 1px solid green;
  display: flex;
  margin-bottom: 15px;
  border-radius: 2px;
  background-color: white;
  box-shadow: 1px 5px 8px 5px #9090909c;
  cursor: pointer;

  @media (max-width: 650px) {
    height: 150px;
  }
  @media (max-width: 950px) {
    width: 80%;
  }
`;
const ResponseItemImage = styled.img`
  // border: 1px solid red;
  height: 100%;
  width: 100px;
`;

const ResponseItemInfo = styled.div`
  padding-left: 20px;
  align-self: center;
  display: grid;
  font-family: "Montserrat", sans-serif;
`;

const Label = styled.label`
  font-weight: bolder;

  float: left;
`;
const InfoItem = styled.div`
  padding: 2px;
`;

const Span = styled.span`
  float: left;
  padding-left: 10px;
  word-break: break-all;
  @media (max-width: 950px) {
    font-size: 14px;
  }
`;
export default App;
