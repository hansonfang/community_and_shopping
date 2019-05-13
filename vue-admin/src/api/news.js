import request from "@/utils/request";

export function getAllNews(comID) {
  return request({
    url: "/news/getAll/" + comID,
    method: "get"
  });
}
export function getNewsDetails(newsID) {
  return request({
    url: "/news/getNewsDetail/" + newsID,
    method: "get"
  });
}
export function deleteNews(newsID) {
  return request({
    url: "/news/delete",
    method: "delete",
    data: { newsID }
  });
}
export function uploadHeadlineImage(formData) {
  return request({
    url: "/news/image/headline",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data: formData
  });
}
export function uploadSectionImage(formData) {
  return request({
    url: "/news/image/section",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data: formData
  });
}
export function updateContent(meta, sections) {
  return request({
    url: "/news/update",
    method: "post",
    data: { meta, sections }
  });
}
export function addSection(newsID) {
  return request({
    url: "/news/addsection",
    method: "put",
    data: { newsID }
  });
}
export function createNews(comID) {
  return request({
    url: "/news/createNews",
    method: "put",
    data: { comID }
  });
}
