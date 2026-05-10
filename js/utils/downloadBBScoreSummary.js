const downloadBBScoreTXT = async () => {
  const { content, dataName } = await generateTXTContent();

  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${dataName}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const generateTXTContent = async () => {
  const budgetBlitzSaveData = localStorage.getItem('budgetBlitzSaveData');
  if (!budgetBlitzSaveData) return;

  const savedGames = JSON.parse(budgetBlitzSaveData).savedGames;
  const currentGame = savedGames.find((sg) => sg.currentGame === true);
  const { creditsPerMission, failedMissions, dataName, dateStarted, dateEnded, difficulty } =
    currentGame;

  let averageMissionTime = 0;
  let superSamplesCollected = 0;
  let highValueItemsCollected = 0;
  let starsEarned = 0;
  let totalCreditsEarned = 0;
  let numOfDeaths = 0;
  let difficultyModifier = 0;
  if (difficulty === 'Medium') {
    difficultyModifier = 250;
  }
  if (difficulty === 'Hard') {
    difficultyModifier = 500;
  }
  const creditsSubtractedForMissionsFailed = 200 * failedMissions;

  for (const mission of creditsPerMission) {
    averageMissionTime += mission.timeRemaining;
    superSamplesCollected += mission.superSamplesCollected;
    highValueItemsCollected += mission.highValueItemsCollected;
    starsEarned += mission.starsEarned;
    totalCreditsEarned += mission.totalCredits;
    numOfDeaths += mission.numOfDeaths;
  }

  superSamplesCollected += highValueItemsCollected * 2;
  averageMissionTime = averageMissionTime / creditsPerMission.length;
  totalScore = totalCreditsEarned + difficultyModifier - creditsSubtractedForMissionsFailed;

  let content = `预算闪电战 分数摘要 - ${difficulty}\n==========================\n\n`;
  content += `数据名称：${dataName}\n`;
  content += `开始日期：${dateStarted}\n`;
  content += `结束日期：${dateEnded}\n`;
  content += `收集的超级样本：${superSamplesCollected}\n`;
  content += `收集的高价值物品：${highValueItemsCollected}\n`;
  content += `获得星数：${starsEarned}\n`;
  content += `获得的总积分：${totalCreditsEarned}\n`;
  content += `平均任务剩余时间：${averageMissionTime.toFixed(0)}%\n`;
  content += `Difficulty (${difficulty}): ${difficultyModifier}\n`;
  content += `死亡次数：${numOfDeaths}\n`;
  content += `扣除积分（任务失败）：${creditsSubtractedForMissionsFailed}\n`;
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
