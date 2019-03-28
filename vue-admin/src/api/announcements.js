import request from "@/utils/request";

export function submit(form) {
  let _url = "";
  if (form.from === 1) {
    //提交物业信息
    _url = "/property";
  } else if (form.from === 2) {
    //提交物业信息
    _url = "/community";
  }
  return request({
    url: _url,
    method: "post",
    data: form
  });
}
