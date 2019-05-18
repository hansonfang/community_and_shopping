import request from "@/utils/request";

export function getCategory() {
  return request({
    url: "/shop/getCategory/",
    method: "get"
  });
}
export function getGoodsList(id) {
  return request({
    url: "/shop/getGoodsList/" + id,
    method: "get"
  });
}
export function getGoodsDetail(id) {
  return request({
    url: "/shop/getGoodsDetail/" + id,
    method: "get"
  });
}
export function getCarousels(id) {
  return request({
    url: "/shop/getCarousels/" + id,
    method: "get"
  });
}
export function deleteGoods(id) {
  return request({
    url: "/shop/deleteGoods",
    method: "delete",
    data: { id }
  });
}
export function addSkuID(id) {
  return request({
    url: "/shop/addSkuID",
    method: "post",
    data: { id }
  });
}
export function updateSku(productSku) {
  return request({
    url: "/shop/updateSku",
    method: "post",
    data: productSku
  });
}
export function updateGoods(data) {
  return request({
    url: "/shop/updateGoods",
    method: "post",
    data
  });
}
export function updateKeyword(id, keyword) {
  return request({
    url: "/shop/updateKeyword",
    method: "post",
    data: { id, keyword }
  });
}
export function createGoods() {
  return request({
    url: "/shop/createGoods",
    method: "put"
  });
}
export function deleteSku(skuid) {
  return request({
    url: "/shop/deleteSku",
    method: "delete",
    data: { skuid }
  });
}
export function deleteComment(commentID) {
  return request({
    url: "/shop/deleteComment",
    method: "delete",
    data: { commentID }
  });
}
export function uploadMainImage(formData) {
  return request({
    url: "/shop/uploadMainImage",
    headers: { "Content-Type": "multipart/form-data" },
    method: "post",
    data: formData
  });
}
export function uploadSubImage(formData) {
  return request({
    url: "/shop/uploadSubImage",
    headers: { "Content-Type": "multipart/form-data" },
    method: "post",
    data: formData
  });
}
export function editSubImage(formData) {
  return request({
    url: "/shop/editSubImage",
    headers: { "Content-Type": "multipart/form-data" },
    method: "post",
    data: formData
  });
}
export function uploadCarouselImage(formData) {
  return request({
    url: "/shop/uploadCarouselImage",
    headers: { "Content-Type": "multipart/form-data" },
    method: "post",
    data: formData
  });
}
export function updateSubImage(goodsID, subImages) {
  return request({
    url: "/shop/updateSubImage",
    method: "post",
    data: { goodsID, subImages }
  });
}
