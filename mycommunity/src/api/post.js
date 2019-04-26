/* 
【社区热论】模块API

*/
import request from "@/utils/request";
import requestNode from "@/utils/requestNode";

export function createPost(obj) {
  return request({
    url: "/news/create",
    method: "post",
    data: {
      title: obj.title,
      newsDetail: "",
      description: obj.description,
      type: 0
    }
  });
}
export function getPostList(param) {
  return request({
    url: "/news/all",
    method: "get",
    params: {
      pageNum: param.pageNum || 1,
      pageSize: param.pageSize || 100
    }
  });
}
export function replyPost(data) {
  return request({
    url: "/news/reply/create",
    method: "post",
    data: {
      content: data.replyText,
      postId: data.postId,
      parentId: data.parentId || 0
    }
  });
}
export function createPoll(data) {
  return request({
    url: "/vote/create",
    method: "post",
    data: {
      title: data.title,
      description: data.description,
      validityTime: data.validityTime,
      choice: data.choice,
      optionList: data.optionList
    }
  });
}
export function getPostDetail(id) {
  return request({
    url: `/news/detail/${id}`,
    method: "get"
  });
}
export function getPollList() {
  return requestNode({
    url: "/vote/all",
    method: "get"
  });
}

export function getPollDetail(id) {
  return requestNode({
    url: `/vote/${id}`,
    method: "get"
  });
}
