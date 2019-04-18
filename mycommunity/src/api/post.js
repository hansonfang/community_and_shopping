/* 
【社区热论】模块API

*/
import request from "@/utils/request";

export function createPost(obj) {
  return request({
    url: "/news/create",
    method: "post",
    data: {
      telephone: obj.telephone,
      address: obj.address,
      description: obj.detail,
      hopeTime: obj.timestamp
    }
  });
}
