/*function getOrCreateDeviceId() {
    let d = localStorage.getItem("ominhub_device_id");
    if (!d) {
      d = "dev-" + Math.random().toString(36).substring(2);
      localStorage.setItem("ominhub_device_id", d);
    }
    return d;
  }*/

function getOrCreateDeviceId() {
  let id = localStorage.getItem("device_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("device_id", id);
  }
  return id;
}


export const Device = {
  getOrCreateDeviceId
}