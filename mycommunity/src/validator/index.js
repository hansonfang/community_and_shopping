import VeeValidate from "vee-validate";
// import zh_CN from "vee-validate/dist/locale/zh_CN"
const Validator = VeeValidate.Validator;

const dictionary = {
  zh_CN: {
    messages: {
      required: () => "必须填写",
      max_value: (f, v) => `数字不能大于${v}`,
      max: (f, v) => `不能超过${v}个字符`,
      specialChar: () => "不能包含特殊字符",
      idcard: () => "输入标准身份证号",
      email: () => "邮箱不合法",
      phone: () => "手机号格式不正确"
    }
  }
};
const specialChar = {
  validate: value => {
    return !new RegExp(
      "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%]"
    ).test(value);
  }
};
const idcard = {
  validate: value => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
};
const phone = {
  validate: value => /^1[34578]\d{9}$/.test(value)
};

Validator.extend("specialChar", specialChar);
Validator.extend("idcard", idcard);
Validator.extend("phone", phone);
Validator.localize("zh_CN", dictionary.zh_CN);

export default VeeValidate;
