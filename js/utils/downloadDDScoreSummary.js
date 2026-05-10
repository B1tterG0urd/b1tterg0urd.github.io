const downloadDDScoreSummary = async () => {
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
  const debtDiversSaveData = localStorage.getItem("debtDiversSaveData");
  if (!debtDiversSaveData) return;

  const savedGames = JSON.parse(debtDiversSaveData).savedGames;
  const currentGame = savedGames.find((sg) => sg.currentGame === true);
  const {
    endingCredits,
    creditsPerMission,
    failedMissions,
    successfulMissions,
    dataName,
    dateStarted,
    difficulty,
  } = currentGame;

  let par = 9;
  let totalMissionTimeRemaining = 0;
  let superSamplesCollected = 0;
  let highValueItemsCollected = 0;
  let starsEarned = 0;
  let totalCreditsEarned = 0;
  let numOfDeaths = 0;
  let numOfAccidentals = 0;
  let difficultyModifier = 0;
  let totalMissions = failedMissions + successfulMissions;
  let parScore = (par - totalMissions) * 100;
  if (difficulty === "Medium") {
    difficultyModifier = 250;
    par = 12;
  }
  if (difficulty === "Hard") {
    difficultyModifier = 500;
    par = 15;
  }

  for (let j = 0; j < creditsPerMission.length; j++) {
    const missionInfo = creditsPerMission[j];
    totalMissionTimeRemaining += missionInfo.timeRemaining;
    superSamplesCollected += missionInfo.superSamplesCollected;
    highValueItemsCollected += missionInfo.highValueItemsCollected;
    starsEarned += missionInfo.starsEarned;
    totalCreditsEarned += missionInfo.totalCredits;
    numOfDeaths += missionInfo.numOfDeaths;
    numOfAccidentals += missionInfo.numOfAccidentals;
  }

  const totalScore = parScore + totalMissionTimeRemaining - failedMissions * 50;
  superSamplesCollected += highValueItemsCollected * 2;

  let content = `债务潜水员 分数摘要 - ${difficulty}\n==========================\n\n`;
  content += `数据名称：${dataName}\n`;
  content += `开始日期：${dateStarted}\n`;
  content += `收集的超级样本：${superSamplesCollected}\n`;
  content += `收集的高价值物品：${highValueItemsCollected}\n`;
  content += `获得星数：${starsEarned}\n`;
  content += `误伤次数：${numOfAccidentals}\n`;
  content += `获得的总积分：${totalCreditsEarned}\n`;
  content += `剩余积分：${endingCredits}\n`;
  content += `失败的任务：${failedMissions}\n`;
  content += `总任务剩余时间：${totalMissionTimeRemaining}\n\n`;

  content += `标准杆修正：${parScore}\n`;
  content += `总任务剩余时间：${totalMissionTimeRemaining}\n`;
  content += `任务失败惩罚：${failedMissions * 50}\n`;
  content += `总分：${totalScore}\n\n`;

  creditsPerMission.forEach((mission, index) => {
    content += `Mission ${index + 1}:\n`;
    for (const [key, value] of Object.entries(mission)) {
      content += `  ${key}: ${value}\n`;
    }
    content += `\n`;
  });

  return { content, dataName };
};
