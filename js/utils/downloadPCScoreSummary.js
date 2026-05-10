const generateTextFileContent = async () => {
  const savedGames = JSON.parse(
    localStorage.getItem("penitentCrusadeSaveData")
  ).savedGames;
  const currentGame = savedGames.filter((sg) => sg.currentGame === true);

  if (currentGame.length !== 1) {
    console.log("SAVED GAME DATA CORRUPTED", savedGames);
    return;
  }

  const {
    acquiredItems,
    difficulty,
    specialist,
    missionsFailed,
    missionTimes,
  } = currentGame[0];

  let specName = "默认";
  if (specialist !== null) {
    specName = SPECIALISTS[specialist].displayName;
  }
  let diffText = "";
  let difficultyModifier = 0;
  let score = 0;
  let totalTimeRemaining = 0;
  if (missionTimes && missionTimes.length) {
    for (let i = 0; i < missionTimes.length; i++) {
      totalTimeRemaining += missionTimes[i];
    }
  }
  if (difficulty === "super") {
    diffText = "Super ";
    difficultyModifier = 250;
  }
  if (difficulty === "solo") {
    diffText = "Solo/Duo ";
  }
  if (difficulty === "quick") {
    diffText = "Quick ";
  }

  score = difficultyModifier + totalTimeRemaining + missionsFailed * -50;

  let text = "";
  text += `${diffText}苦修远征 分数摘要\n=======================================\n\n`;
  text += `总任务剩余时间：${totalTimeRemaining}\n`;
  text += `难度修正：${difficultyModifier}\n`;
  text += `失败的任务：${missionsFailed}\n`;
  text += `最终分数：${score}\n\n`;
  text += `专家：${specName}\n\n`;
  const categories = {
    stratagems: [],
    primaries: [],
    boosters: [],
    secondaries: [],
    throwables: [],
    armorPassives: [],
  };

  for (const item of acquiredItems) {
    if (item.type === "Stratagem") {
      categories.stratagems.push(item);
    } else if (item.category === "primary") {
      categories.primaries.push(item);
    } else if (item.category === "booster") {
      categories.boosters.push(item);
    } else if (item.category === "secondary") {
      categories.secondaries.push(item);
    } else if (item.category === "throwable") {
      categories.throwables.push(item);
    } else if (item.category === "armor") {
      categories.armorPassives.push(item);
    }
  }

  for (const category in categories) {
    const title = category.charAt(0).toUpperCase() + category.slice(1);
    text += `${title}:\n`;
    if (categories[category].length > 0) {
      for (const item of categories[category]) {
        text += `  - ${item.displayName}\n`;
      }
    } else {
      text += `  - 无\n`;
    }
    text += `\n`; // extra spacing between categories
  }

  return { text, fileName: currentGame[0].dataName };
};

const downloadPCScoreSummary = async () => {
  const { text, fileName } = await generateTextFileContent();

  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName + ".txt";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
