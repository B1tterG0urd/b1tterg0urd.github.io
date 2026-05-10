const otherResourcesList = document.getElementById("otherResourcesList");

const genOtherResourcesList = () => {
  const resources = [
    {
      displayName: "Helldive.Live",
      url: "https://helldive.live",
      description: "展示实时详细玩家配装数据的项目",
    },
    {
      displayName: "Democracy Hub",
      url: "https://democracy-hub.net",
      description: "配装、数据和理论构筑资源站",
    },
    {
      displayName: "Helldivers Hub",
      url: "https://helldivers-hub.com",
      description: "管理和分享配装的社区中心",
    },
    {
      displayName: "Helldivers Wiki",
      url: "https://helldivers.wiki.gg",
      description:
        "涵盖绝地潜兵和绝地潜兵2的综合性在线数据库",
    },
    {
      displayName: "hd2random.com",
      url: "https://hd2random.com",
      description: "另一个可自定义、无广告的配装随机工具",
    },
    {
      displayName: "Democracy ++",
      url: "https://adamlassiter.github.io/democracy-plusplus/",
      description: "受预算闪电战和特殊行动启发的配装挑战",
    },
  ];

  for (let i = 0; i < resources.length; i++) {
    const { url, displayName, description } = resources[i];
    const resItem = `
    <li class="text-white"><a target="_blank" href="${url}">${displayName}</a><span class="text-white"> - ${description}</span></li>
  `;
    otherResourcesList.innerHTML += resItem;
  }
};

genOtherResourcesList();
