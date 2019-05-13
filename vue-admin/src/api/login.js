import request from "@/utils/request";

export function login(username, password) {
  return new Promise((resolve, reject) => {
    if (username === "hanson" && password === "hanson") {
      setTimeout(
        () =>
          resolve({
            data: {
              token: "hanson"
            }
          }),
        1000
      );
    } else reject("用户名或密码错误");
  });
}
// TODO:bug
export function getInfo(token) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve({
          data: {
            roles: ["admin"],
            name: "hanson",
            avatar: "https://picsum.photos/id/129/120/120"
          }
        }),
      300
    );
  });
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post"
  });
}
export function getCommunityList() {
  return request({
    url: "/communitylist",
    method: "get"
  });
}
