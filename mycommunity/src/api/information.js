import request from "@/utils/request";

function getIndex() {
  return request({
    url: "/portal/index",
    method: "get"
  });
}

export { getIndex };
