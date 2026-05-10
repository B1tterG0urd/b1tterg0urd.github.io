const downloadFEScoreSummary = async () => {
  const { content, dataName } = await generateTXTContent();

  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${dataName}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const generateTXTContent = async () => {
  const freedomExpressSaveData = localStorage.getItem("freedomExpressSaveData");
  if (!freedomExpressSaveData) return;

  const savedGames = JSON.parse(freedomExpressSaveData).savedGames;
  const currentGame = await savedGames.filter((sg) => {
    return sg.currentGame === true;
  })[0];
  const { pointsPerMission, points, dataName } = currentGame;

  let averageMissionTime = 0;
  let totalMissionTimeRemaining = 0;
  let highValueItemsCollected = 0;
  let numberOfDeaths = 0;
  let warpPacks = 0;
  let jumpPacks = 0;
  let supplyPacks = 0;
  let frvs = 0;

  for (let j = 0; j < pointsPerMission.length; j++) {
    const missionInfo = pointsPerMission[j];
    const { numOfDeaths, timeRemaining, hviCollected, randomStrat } =
      missionInfo;
    averageMissionTime += timeRemaining;
    totalMissionTimeRemaining += timeRemaining;
    if (hviCollected === true) {
      highValueItemsCollected += 1;
    }
    numberOfDeaths += numOfDeaths;
    if (randomStrat.displayName === "Warp Pack") {
      warpPacks += 1;
    }
    if (randomStrat.displayName === "Jump Pack") {
      jumpPacks += 1;
    }
    if (randomStrat.displayName === "Supply Pack") {
      supplyPacks += 1;
    }
    if (randomStrat.displayName === "Fast Recon Vehicle") {
      frvs += 1;
    }
  }

  let content = `自由快线 分数摘要\n================================\n\n`;
  content += `数据名称：${dataName}\n\n`;
  content += `明细\n`;
  content += `死亡次数：${numberOfDeaths}\n`;
  content += `收集的高价值物品：${highValueItemsCollected}\n`;
  content += `平均剩余时间：${averageMissionTime.toFixed(0)}\n`;
  content += `Warp Packs: ${warpPacks}\n`;
  content += `Jump Packs: ${jumpPacks}\n`;
  content += `Supply Packs: ${supplyPacks}\n`;
  content += `FRVs: ${frvs}\n\n`;
  content += `分数\n`;
  content += `剩余时间分数：${totalMissionTimeRemaining}\n`;
  content += `高价值物品分数：${highValueItemsCollected * 10}\n`;
  content += `死亡扣除：${numberOfDeaths}\n`;
  content += `TOTAL 分数: ${points}\n`;

  return { content, dataName };
};
