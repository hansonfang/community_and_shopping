import request from "@/utils/request";
import requestNode from "@/utils/requestNode";
export function createAddress(obj) {
  return request({
    url: "/shipping/create",
    method: "post",
    data: {
      receiverName: obj.name,
      receiverPhone: obj.phone,
      receiverAddress: obj.address,
      receiverZip: obj.zip,
      receiverProvince: obj.province,
      receiverCity: obj.city,
      receiverDistrict: obj.district
    }
  });
}
export function updateAddress(id, obj) {
  return requestNode({
    url: "/shopping/update/" + id,
    method: "post",
    data: {
      name: obj.name,
      phone: obj.phone,
      address: obj.address,
      zip: obj.zip,
      province: obj.province,
      city: obj.city,
      district: obj.district
    }
  });
}
export function getAllAddress() {
  return request({
    url: "/shipping/listall",
    method: "get"
  });
}
export function deleteAddress(id) {
  return request({
    url: "/shipping/delete/" + id,
    method: "delete"
  });
}
export function getCarousels(id) {
  return requestNode({
    url: "/admin/shop/getCarousels/" + id,
    method: "get"
  });
}
export function getGoodsList(id, page) {
  return requestNode({
    url: `/shopping/product/list/simple/${id}/${page}`,
    method: "get"
  });
}
export function getGoodsDetail(id) {
  return requestNode({
    url: `admin/shop/getGoodsDetail/${id}`,
    method: "get"
  });
}
export function submitComment(data) {
  return request({
    url: "/evaluation/publish",
    method: "post",
    data: {
      content: data.content,
      imageUrl: null,
      skuId: data.skuId,
      type: 1
    }
  });
}
export function singleSubmit({ skuID, count, addressID }) {
  return request({
    url: `order/place/separate/${skuID}/${count}/${addressID}`,
    method: "post"
  });
}
export function addCart({ skuID, count }) {
  return request({
    url: `/cart/add/${skuID}/${count}`,
    method: "post"
  });
}
export function getCartList() {
  return request({
    url: "/cart/listall",
    method: "get"
  });
}
export function deleteGoods(skuId) {
  return request({
    url: `cart/delete/${skuId}`,
    method: "delete"
  });
}
export function getAssemble(id) {
  return request({
    url: "/order/assemble/list/" + id,
    method: "get"
  });
}
export function getOrderList() {
  return request({
    url: "/order/listorders",
    method: "get"
  });
}
export function createGroup({ productId, count, addressID }) {
  return request({
    url: `/order/assemble/create/${productId}/${count}/${addressID}`,
    method: "post"
  });
}
export function joinGroup(assembleId, skuId, count, addressID) {
  return request({
    url: `order/assemble/join/${assembleId}/${skuId}/${count}/${addressID}`,
    method: "put"
  });
}
export function orderMulti(goods, addressID) {
  return request({
    url: "order/place/multi",
    method: "post",
    data: {
      data: goods,
      shippingId: addressID
    }
  });
}
