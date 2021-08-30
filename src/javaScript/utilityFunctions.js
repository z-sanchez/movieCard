function truncateText(text, maxLength, showAmount) {
  if (text.length > maxLength) {
    text = text.slice(0, showAmount);
    text += "...";
  }
  return text;
}

function findDirector(job) {
  if (job.job === "Director") return job.name;
}

function writeNames(array) {
  if (array.length === 0) return "";
  let copyArray = array.map((x) => x);
  let name = null;

  name = copyArray[0];
  if (0 < array.length - 1) name += ", ";
  copyArray.splice(0, 1);

  return name + writeNames(copyArray);
}

export { truncateText, findDirector, writeNames };
