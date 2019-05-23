import request from "@/utils/request";

export function getIndex() {
  return request({
    url: "/portal/index",
    method: "get"
  });
}

export function getTopNews() {
  return request({
    url: "/headline/top5",
    method: "get"
  });
}

export function getAnnouncement(name) {
  return request({
    url: `portal/notice/${name}/latest`,
    method: "get"
  });
}
