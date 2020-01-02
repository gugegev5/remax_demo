import React, { useState, useEffect, useMemo } from "react";
import avStyle from "./aivideo.module.css";
import { useShareAppMessage } from "remax";
import {
  View,
  Image,
  Video,
  Navigator,
  Button,
  CoverView,
  Progress,
  authorize,
  getSetting
} from "remax/wechat";
import image_download_3x from "@/images/download@3x.png";
import image_share_minipro_3x from "@/images/share_minipro@3x.png";
import { getUrlParam, decodeUrlParam } from "@/utils/aivideo";

export default (props: propsType) => {
  const query = useMemo(() => decodeUrlParam(props.location.query), [
    props.location
  ]);
  const [data, setData] = useState<urlQueryType>(query);
  const [isShowDownload, setIsShowDownload] = useState<boolean>(false);
  const [ADUrl, setADUrl] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => onLoad(data, setADUrl), [props]);
  useShareAppMessage(() => {
    const title = data.share_title;
    const imageUrl = data.share_img;
    const params = getUrlParam(data);
    const path = `/pages/ai/aivideo/aivideo?${params}`;
    return {
      title,
      imageUrl,
      path
    };
  });
  return (
    <View
      className={avStyle.container}
      style={{
        backgroundColor: data.background_color,
        backgroundImage: `url(${data.background_bottom})`
      }}
    >
      <View className={avStyle.header}>
        <Image src={data.head_img}></Image>
      </View>
      <View className={avStyle.main}>
        <Video
          id="ai_video"
          src={data.player_url as string}
          poster={data.cover_img}
          enablePlayGesture
          playBtnPosition="center"
        ></Video>
      </View>
      <View className={avStyle.footer}>
        <View className={avStyle.text}>
          {data.player_name}您好，{data.content}
        </View>
        <View className={avStyle.buttons}>
          <Button
            onClick={() => setIsShowDownload(true)}
            className={avStyle.button}
            hoverClass={avStyle.buttonhover}
          >
            <Image
              src={image_download_3x}
              className={avStyle.button_img1}
            ></Image>
            立即下载
          </Button>
          <Button
            className={avStyle.botton}
            hoverClass={avStyle.buttonhover}
            openType="share"
          >
            <Image
              src={image_share_minipro_3x}
              className={avStyle.button_img2}
            ></Image>
            分享
          </Button>
        </View>
        <View
          className={avStyle.bottom_link}
          style={{ backgroundImage: `url(${data.bottom_img})` }}
        >
          {data.bottom_link ? (
            <Navigator url={`/pages/webview/webview?url=${ADUrl}`}></Navigator>
          ) : null}
        </View>
      </View>

      {isShowDownload ? (
        <>
          <CoverView className={avStyle.mask} />
          <CoverView className={avStyle.dialog}>
            <CoverView className={avStyle.dialogHeader}>提示</CoverView>
            <CoverView className={avStyle.dialogMain}>
              <CoverView className={avStyle.dialogMainHeader}>
                下载方式:
              </CoverView>
              <CoverView className={avStyle.dialogMainContent}>
                1、ios用户需要复制链接粘贴至电脑端下载视频
              </CoverView>
              <CoverView className={avStyle.dialogMainContent}>
                2、安卓用户需要复制链接粘贴至电脑端下载视频
              </CoverView>
            </CoverView>
            <CoverView className={avStyle.dialogButtons}>
              <CoverView hover-class={avStyle.buttonhover}>
                <Button
                  aria-role="button"
                  className={avStyle.dialogCancel}
                  onClick={() => setIsShowDownload(false)}
                >
                  取消
                </Button>
              </CoverView>
              <CoverView hover-class={avStyle.buttonhover}>
                <Button
                  className={avStyle.dialogConfirm}
                  onClick={() => onCopy(data, setIsShowDownload)}
                >
                  复制链接
                </Button>
              </CoverView>
            </CoverView>
          </CoverView>
        </>
      ) : null}
    </View>
  );
};

type propsType = {
  location: {
    query: urlQueryType;
  };
};

type urlQueryType = {
  //url query
  background_bottom?: string;
  background_color?: string;
  background_main?: string;
  bottom_img?: string;
  bottom_link?: string;
  content?: string;
  cover_img?: string;
  head_img?: string;
  is_ad?: number;
  player_card?: string;
  player_name?: string;
  player_score?: string;
  player_url?: string;
  share_desc?: string;
  share_img?: string;
  share_title?: string;
  title?: string;
  //state
  marathonID?: string;
};

function onLoad(query: urlQueryType, setADUrl: (arg: string) => void) {
  const ADUrl = encodeURIComponent(
    `https://api.qiecdn.com/marathon/ad?marathonID=${query.marathonID}`
  );
  setADUrl(ADUrl);

  wx.setNavigationBarTitle({
    title: `${query.player_name}的AI定制视频`
  });
  wx.setBackgroundColor({
    backgroundColor: query.background_color
  });
  // const videoContext = wx.createVideoContext("ai_video", this);
}

function onCopy(data: urlQueryType, setIsShowDownload: (arg: boolean) => void) {
  wx.setClipboardData({
    data: data.player_url as string,
    success() {
      setIsShowDownload(false);
    }
  });
}

function onDownload(
  data: urlQueryType,
  setIsShowDownload: (arg: boolean) => void,
  setProgress: (arg: number) => void
) {
  getSetting({
    success(res) {
      console.log(res.authSetting)
      if (!res.authSetting["scope.writePhotosAlbum"]) {
        authorize({
          scope: "scope.writePhotosAlbum",

          success(re) {
            downloadAndSave(data, setIsShowDownload, setProgress);
          }
        });
      } else {
        downloadAndSave(data, setIsShowDownload, setProgress);
      }
    }
  });
}

function downloadAndSave(
  data: urlQueryType,
  setIsShowDownload: (arg: boolean) => void,
  setProgress: (arg: number) => void
) {
  const downloadTask = wx.downloadFile({
    url: data.player_url as string,
    success(res) {
      console.log(res);
      wx.saveVideoToPhotosAlbum({
        filePath: res.tempFilePath,
        success(res) {
          console.log(res.errMsg);
        },
        fail(o) {
          console.log(o);
        }
      });
      if (res.statusCode === 200) {
        wx.playVoice({
          filePath: res.tempFilePath
        });
      }
    }
  });

  downloadTask.onProgressUpdate(res => {
    console.log("下载进度", res.progress);
    setProgress(res.progress);
    console.log("已经下载的数据长度", res.totalBytesWritten);
    console.log("预期需要下载的数据总长度", res.totalBytesExpectedToWrite);
  });
}


