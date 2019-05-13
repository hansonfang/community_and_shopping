import request from "@/utils/request";

export function submit(form, type) {
  return request({
    url: "/announcements/create",
    method: "post",
    data: {
      notice: form.name,
      description: form.desc,
      communityID: form.communityID
    }
  });
}
export function submitProperty(form, type) {
  return request({
    url: "/announcements/property/create",
    method: "post",
    data: {
      notice: form.name,
      description: form.desc
    }
  });
}

export function getCommunityAnnouncements(comID) {
  return request({
    url: `/announcements/community/${comID}`,
    method: "get"
  });
}

export function getPropertyAnnouncements() {
  return request({
    url: "/announcements/property",
    method: "get"
  });
}
export function deleteAnnouncements(comID) {
  return request({
    url: `/announcements/delete`,
    method: "delete",
    data: { id: comID }
  });
}
export function deletePropertyAnnouncements(comID) {
  return request({
    url: `/announcements/property/delete`,
    method: "delete",
    data: { id: comID }
  });
}
export function update({ id, notice, description }) {
  return request({
    url: `/announcements/update`,
    method: "post",
    data: { id, notice, description }
  });
}
export function updateProperty({ id, notice, description }) {
  return request({
    url: `/announcements/property/update`,
    method: "post",
    data: { id, notice, description }
  });
}
