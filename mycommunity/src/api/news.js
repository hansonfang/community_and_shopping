import request from "@/utils/request";

export function getNewsList({ pageNum, pageSize }) {
  return request({
    url: "/headline/all",
    method: "get",
    params: {
      pageNum: pageNum || 1,
      pageSize: pageSize || 6
    }
  });
}
export function getNewsDetail(id) {
  return request({
    url: "/headline/get/" + id,
    method: "get"
  });
}
export function getHotNews() {
  return request({
    url: "/headline/hot",
    method: "get"
  });
}
