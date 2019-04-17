import vue from "vue";

import Snackbar from "@/components/Snackbar.vue";

const SnackbarConstructor = vue.extend(Snackbar);
let snackbarInstance = null;
let timer = null;
function show(opt) {
  if (!opt.text) opt.text = "";
  if (!opt.color) opt.color = "success";
  if (!opt.duration) opt.duration = 2000;

  if (!snackbarInstance) {
    snackbarInstance = new SnackbarConstructor();
    snackbarInstance.vm = snackbarInstance.$mount();
    document.body.appendChild(snackbarInstance.vm.$el);
  }
  snackbarInstance.snackbarText = opt.text;
  snackbarInstance.snackbarColor = opt.color;
  snackbarInstance.snackbar = true;
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  return new Promise(resolve => {
    timer = setTimeout(() => {
      snackbarInstance.snackbar = false;
      clearTimeout(timer);
      timer = null;
      resolve();
    }, Number(opt.duration));
  });
}
function registerSnackbar() {
  vue.prototype.$snackbar = show;
}
export default registerSnackbar;
