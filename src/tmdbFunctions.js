const APIkey = "7073e3669d6605fe5e80538c0c2c0429",
  baseURL = "https://api.themoviedb.org/3/";

let configData = null,
  baseImageURL = null;

let getConfig = function () {
  let url = "".concat(baseURL, "configuration?api_key=", APIkey);
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      baseImageURL = data.images.secure_base_url;
      configData = data.images;
    })
    .catch((err) => {
      console.log("FAILED TO FETCH CONFIG DATA");
    });
};

export { getConfig };
export { APIkey, baseURL, configData, baseImageURL };
