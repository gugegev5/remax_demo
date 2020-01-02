import { AppConfig } from "remax/wechat";

const config: AppConfig = {
  pages: [
    "pages/ai/ai",
    "pages/ai/aivideo/aivideo",
    "pages/index/index",
  ],
  window: {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#FFFFFF",
    "navigationBarTitleText": "马拉松",
    "navigationBarTextStyle": "black"
  },
  "networkTimeout": {
    "downloadFile": 100000000
  },
  "tabBar": {
    "color": "#000000",
    "selectedColor": "#000000",
    "backgroundColor": "#ffffff",
    "borderStyle": "white",
    "list": [
      {
        "pagePath": "pages/ai/ai",
        "text": "AI视频",
        "iconPath": "images/ai@3x.png",
        "selectedIconPath": "images/chooseai@3x.png"
      },
      {
        "pagePath": "pages/index/index",
        "text": "赛事",
        "iconPath": "images/game@3x.png",
        "selectedIconPath": "images/choosegame@3x.png"
      }
    ]
  },
  "sitemapLocation": "sitemap.json"
};

export default config;
