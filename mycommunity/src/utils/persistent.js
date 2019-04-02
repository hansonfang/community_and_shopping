function setObject(key, object) {
  window.localStorage.setItem(key.toString(), JSON.stringify(object));
}

function getObject(key) {
  return JSON.parse(window.localStorage.getItem(key.toString()));
}
function removeObject(key) {
  window.localStorage.removeItem(key.toString());
}
export { setObject, getObject, removeObject };
