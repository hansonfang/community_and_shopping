import request from "@/utils/request";

export function login(str) {
  return request({
    url: "/user/login",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: str
  });
}
export function uploadAvatar(formData) {
  return request({
    url: "/file/uploads",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: formData
  });
}
export function getInfo(token) {
  return request({
    url: "/user/find",
    method: "get",
    headers: {
      Authorization: token
    }
  });
}
export function getCommunityList() {
  return request({
    url: "community/listall",
    method: "get"
  });
}
export function logout() {
  return request({
    url: "/logout",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}
