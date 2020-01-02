import React, { useState, useEffect } from "react";
import aiStyle from "./ai.module.css";
import { useReachBottom, usePullDownRefresh } from "remax";
import { navigateTo } from "remax/wechat";
import {
  View,
  Image,
  Text,
  Picker,
  Input,
  Button,
  showLoading,
  hideLoading,
  stopPullDownRefresh
} from "remax/wechat";
import image_ai_bg_2x from "@/images/ai_bg@2x.png";
import image_unfold from "@/images/unfold@2x.png";
import { request, wxShowToast } from "@/utils/util";
import { getUrlParam } from "@/utils/aivideo";
import api from "../../config/api";

const matchTips = "请选择赛事";
const nameTips = "请输入您的姓名";
const cardTips = "请输入您的参赛编号";

function getEvents(setMatchList: (matchList: []) => void): void {
  showLoading({
    title: "加载中..."
  });
  request(api.MatchList).then(res => {
    setMatchList((res as { data: [] }).data);
    hideLoading();
    stopPullDownRefresh();
  });
}

function onSearch(
  matchIndex: number = -1,
  name: string = "",
  card: string = "",
  matchList: Array<any>
) {
  if (matchIndex < 0 && name !== "陈小强") {
    wxShowToast(matchTips, "none", 1000);
  } else if (name.length == 0) {
    wxShowToast(nameTips, "none", 1000);
  } else if (card.length == 0) {
    wxShowToast(cardTips, "none", 1000);
  } else {
    let matchId: string | number;
    if (name == "陈小强" && matchList.length > 7) {
      matchId = 11;
    } else {
      matchId = matchList[matchIndex]["match_id"];
    }
    wx.showLoading({
      title: "加载中..."
    });
    const url = `${api.MatchPlayer}?match_id=${matchId}&player_card=${card}&player_name=${name}`;
    request(url).then(response => {
      const res = response as { error: number; msg: string; data: any };
      if (!res || res.error !== 0) {
        wxShowToast(res.msg);
      } else {
        const params = getUrlParam({ ...res.data, marathonID: matchId });
        wx.hideLoading();
        navigateTo({
          url: `../ai/aivideo/aivideo?${params}`
        });
      }
    });
  }
}

export default () => {
  const [matchList, setMatchList] = useState([]);
  const [matchIndex, setMatchIndex] = useState(-1);
  const [name, setName] = useState("陈小强");
  const [card, setCard] = useState("a12851");
  useEffect(() => {
    getEvents(setMatchList);
  }, []);
  useReachBottom(() => {
    getEvents(setMatchList);
  });
  usePullDownRefresh(() => {
    getEvents(setMatchList);
  });

  return (
    <View className={aiStyle.container}>
      <View className={aiStyle.header}>
        <Image src={image_ai_bg_2x}></Image>
      </View>

      <View className={aiStyle.content}>
        <Text className={aiStyle.title}>获取您的AI定制视频</Text>
        <Picker
          onChange={e => setMatchIndex(e.detail.value)}
          range={matchList}
          rangeKey="match_name"
          value={matchIndex}
        >
          <View className={aiStyle.formSelect}>
            <Image className={aiStyle.unfold} src={image_unfold}></Image>
            <View
              className={
                matchIndex < 0
                  ? aiStyle.formInputTips
                  : aiStyle.formInputSelected
              }
            >
              {matchIndex < 0 ? matchTips : matchList[matchIndex]["match_name"]}
            </View>
          </View>
        </Picker>
        <Input
          onInput={e => setName(e.detail.value)}
          className={aiStyle.formInput}
          placeholder={nameTips}
          placeholderClassName={aiStyle.formInputTips}
        ></Input>
        <Input
          onInput={e => setCard(e.detail.value)}
          className={aiStyle.formInput}
          placeholder={cardTips}
          placeholderClassName={aiStyle.formInputTips}
        ></Input>
        <Button
          className={aiStyle.searchTap}
          hoverClass={aiStyle.searchTapHover}
          onClick={() => onSearch(matchIndex, name, card, matchList)}
        >
          查询
        </Button>
      </View>
    </View>
  );
};
