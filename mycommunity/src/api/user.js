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

export function getInfo(token) {
  return request({
    url: "/user/find",
    method: "get",
    headers: {
      Authorization: token
    }
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
