import {
  showToast,
  getNetworkType,
  getStorageSync,
  request as wxRequest
} from "remax/wechat";

/**
 * 封封微信的的request
 */
export function request(
  url: string,
  method: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" = "GET",
  data = {}
) {
    console.log('util.ts')
  return new Promise(function(resolve, reject) {
    getNetworkType({
      success(res) {
        if (res.networkType == "none") {
          wxShowToast("您的网络不给力...");
        }
      }
    });
    let header: {
      "content-type": string;
      "X-API-UserAgent": string;
      Authorization?: string;
    } = {
      "content-type": "application/json",
      "X-API-UserAgent": "Platform/Wechat"
    };
    let token = getStorageSync("token") || "";
    if (token) {
      header["Authorization"] = "Bearer " + token;
    }
    wxRequest({
      url: url,
      data: data,
      method: method,
      header: header,
      success: function(res) {
        resolve(res.data);
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}

export function wxShowToast(
  title: string,
  type: string = "none",
  duration: number = -1
) {
  let image = "",
    icon: "success" | "loading" | "none" | undefined = undefined;
  switch (type) {
    case "error":
      image = "/images/icon_error.png";
      break;
    case "success":
      image = "/images/icon_success.png";
      break;
    case "warning":
      image = "/images/icon_warning.png";
      break;
    case "none":
      icon = "none";
      break;
  }
  duration < 0 ? (duration = 500) : duration;
  showToast({
    title,
    icon,
    image,
    duration,
    mask: true
  });
}
