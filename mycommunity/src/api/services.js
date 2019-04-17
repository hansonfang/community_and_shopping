/*
 *用户服务：报修，送水，找书记API
 */
import request from "@/utils/request";

export function repair(obj) {
  return request({
    url: "/portal/book/repair",
    method: "post",
    data: {
      telephone: obj.telephone,
      address: obj.address,
      description: obj.detail,
      hopeTime: obj.timestamp
    }
  });
}

export function getRepair({ pageNum, pageSize }) {
  return request({
    url: "/portal/get/repair",
    method: "get",
    params: { pageNum, pageSize }
  });
}

export function getWaterBrands() {
  return request({
    url: "/portal/water/brands",
    method: "get"
  });
}
export function orderWater(obj) {
  return request({
    url: "/portal/book/water",
    method: "post",
    data: {}
  });
}
