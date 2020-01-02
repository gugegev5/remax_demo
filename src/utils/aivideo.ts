// const paramKeys = ['background_color', 'background_bottom', 'head_img', 'player_url', 'cover_img', 'player_name', 'content', 'bottom_link', 'bottom_img', 'share_title', 'share_img', 'marathonID', 'player_card'];

export function getUrlParam(data: any) {
  let params = "";
  const keys = Object.keys(data);
  keys.forEach((key, index) => {
    const value = encodeURIComponent(data[key]);
    if (index !== 0) {
      params = `${params}&${key}=${value}`
    } else {
      params = `${key}=${value}`
    }
  });
  return params;
}

export function decodeUrlParam(query: any) {
  const keys = Object.keys(query);
  const ret: typeof query = {};
  keys.forEach((key) => {
    ret[key] = decodeURIComponent(query[key]);
  });
  return ret;
}