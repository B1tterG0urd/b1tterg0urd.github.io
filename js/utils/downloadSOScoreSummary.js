const downloadSOScoreSummary = async () => {
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
  const specialOpsSaveData = localStorage.getItem("specialOpsSaveData");
  if (!specialOpsSaveData) return;

  const data = JSON.parse(specialOpsSaveData);
  const { dataName, restarts, specialists, warbondCodes, points } = data;

  let warbondNames = [];
  let specialistsUnlocked = [];

  for (let i = 0; i < specialists.length; i++) {
    if (!specialists[i].locked) {
      specialistsUnlocked.push(specialists[i].displayName);
    }
  }

  for (let j = 0; j < warbondCodes.length; j++) {
    const index = parseInt(warbondCodes[j].replace("warbond", ""), 10);
    warbondNames.push(warbondsList[index]);
  }

  let content = `特殊行动 分数摘要\n================================\n\n`;
  content += `数据名称：${dataName}\n\n`;
  content += `获得点数：${points}\n`;
  content += `重新开始次数：${restarts}\n\n`;
  content += `已解锁专家：${specialistsUnlocked.length}\n`;
  content += `${specialistsUnlocked.join(", ")}\n\n`;
  content += `使用的战争债券：${warbondNames.length}\n`;
  content += `${warbondNames.join(", ")}\n`;

  return { content, dataName };
};
