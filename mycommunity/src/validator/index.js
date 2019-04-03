import VeeValidate from "vee-validate";

const Validator = VeeValidate.Validator;
const isNickname = {
  getMessage(field) {
    // 添加到默认的英文错误消息里面
    // Returns a message.
    return field + "不能包含特殊字符";
  },
  validate: value => {
    return !new RegExp(
      "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%]"
    ).test(value);
  }
};

Validator.extend("nickname", isNickname);
export default VeeValidate;
