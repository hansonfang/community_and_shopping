import { generateCaptcha, CaptchaMode } from "@tuzhanai/captcha";
 
const { text, data } = generateCaptcha(CaptchaMode.Medium);
console.log("验证码：%s，图片Buffer：%s", text, data);