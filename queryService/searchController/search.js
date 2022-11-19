const fs = require("fs");

var fetchData = () => {
  let notesData = fs.readFileSync("./data/address.json");
  let notes = JSON.parse(notesData);
  return notes;
};

const findName = (name) => {
  const dataObject = fetchData();
  const result = dataObject.Students.filter((student) => {
    return student.Name.toLowerCase() === name;
  });
  return result;
};

const findMajor = (major) => {
  const dataObject = fetchData();
  const result = dataObject.Students.filter((student) => {
    return student.Major.toLowerCase() === major;
  });
  return result;
};

const findState = (state) => {
  const dataObject = fetchData();
  const result = dataObject.Students.filter((student) => {
    return student.address.state.toLowerCase() === state;
  });
  return result;
};

const findCity = (city) => {
  const dataObject = fetchData();
  const result = dataObject.Students.filter((student) => {
    return student.address.city.toLowerCase() === city;
  });
  return result;
};

const findZip = (zip) => {
  const dataObject = fetchData();
  const result = dataObject.Students.filter((student) => {
    return student.address.zip.toLowerCase() === zip;
  });
  return result;
};

module.exports = {
  findName,
  findMajor,
  findState,
  findCity,
  findZip,
};
