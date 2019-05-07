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
