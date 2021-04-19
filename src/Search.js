import React, { useEffect, useState } from "react";
import "./App.css";
import Complete from "./input";

function Search() {
  const [inputText, setInputText] = useState("");
  const [arr, setArr] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentObject, setCurrentObject] = useState(null);
  const [currPlanet, setCurrPlanet] = useState("");
  const [currStarships, setCurrStarships] = useState([]);

  async function fetchData(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (e) {
      console.error("error in fetchData", e);
    }
  }

  async function getSearchData(url) {
    const data = await fetchData(url);
    const formattedData = data.results.map((item) => ({ ...item}));
    return formattedData;
  }

  async function updateArr() {
    const newArr = [];
    const url = "https://swapi.dev/api/people/?search=" + inputText;
    const searchData = await getSearchData(url);

    if (searchData.length > 0) {
      searchData.forEach((item) => {
        newArr.push(item);
        return item;
      });
    }
    setArr(newArr);
  }

  function resetArr() {
    setArr([]);
  }

  document.addEventListener("click", (e) => {
    const target = e.target;
    const input = document.getElementById("input");
    if (target === input) resetCurrentObject();
  });

  function resetCurrentObject() {
    setCurrentObject("");
  }

  function optionOnSelect(option) {
    const arrItem = arr.find((item) => {
      let name;
      if (item.name == null) {
        name = item.title;
      } else {
        name = item.name;
      }
      return name === option;
    });
    setCurrentUrl(arrItem.url);
  }

  function retrieveCurrObj() {
    if (currentUrl !== "") {
      let temp = arr[0];
      let obj = {
        name: temp.name,
        gender: temp.gender,
        height: temp.height,
        mass: temp.mass,
        hair_color: temp.hair_color
      }
      setCurrentObject(obj)
    }
  }

  async function getPlanet(obj) {
    if (obj.homeworld !== "n/a") {
      const planet = await fetchData(obj.homeworld);
      setCurrPlanet(planet.name)
    } else {
      setCurrPlanet(obj.homeworld);
    }
    return currPlanet;
  }

  async function getStarships(obj) {
    let shipArr = [];
    obj.starships.forEach(async (item) => {
      const ship = await fetchData(item);
      shipArr.push(ship.name)
      return item
    });
    setCurrStarships(shipArr);
    return currStarships
  }

  useEffect(() => {
    if (inputText.length > 0) {
      updateArr();
    } else {
      if (inputText.length < 1) {
        resetArr();
      }
    }
    /* eslint-disable-next-line */
  }, [inputText]);

  useEffect(() => {
    if (currentUrl !== "") {
      let temp = arr[0];
      getPlanet(temp);
      getStarships(temp);
    }
    /* eslint-disable-next-line */
  }, [currentUrl]);

  useEffect(() => {
    if (inputText.length === 0 && arr.length > 0) {
      resetArr();
    }
    /* eslint-disable-next-line */
  }, [arr]);

  return (
    <>
      <div id="inputGroup">
        <Complete
          onChange={(text) => setInputText(text)}
          onSelect={optionOnSelect}
          arr={arr}
        />
        <button className="SearchButton" onClick={retrieveCurrObj}>
          Search
        </button>
      </div>
      {currentObject ? (
        <tbody>
          <tr><td>{currentObject.gender}</td></tr>
          <tr><td>{currentObject.height}</td></tr>
          <tr><td>{currentObject.mass}</td></tr>
          <tr><td>{currentObject.hair_color}</td></tr>
          <tr><td>{currPlanet}</td></tr>
          <tr><td>{currStarships.toString()}</td></tr>
        </tbody>
      ) : null}
    </>
  );
}

export default Search;
