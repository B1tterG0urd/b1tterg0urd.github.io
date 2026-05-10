const bbGameOverModal = document.getElementById('bbGameOverModal');
const bbGameOverModalBody = document.getElementById('bbGameOverModalBody');

const genBBGameOverModal = async () => {
  const budgetBlitzSaveData = localStorage.getItem('budgetBlitzSaveData');
  if (!budgetBlitzSaveData) return;

  const savedGames = JSON.parse(budgetBlitzSaveData).savedGames;
  const currentGame = await savedGames.filter((sg) => {
    return sg.currentGame === true;
  })[0];
  const {
    credits,
    creditsPerMission,
    failedMissions,
    successfulMissions,
    purchasedItems,
    dateStarted,
    dateEnded,
    difficulty,
  } = currentGame;

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

  for (let j = 0; j < creditsPerMission.length; j++) {
    const missionInfo = creditsPerMission[j];
    averageMissionTime += missionInfo.timeRemaining;
    superSamplesCollected += missionInfo.superSamplesCollected;
    highValueItemsCollected += missionInfo.highValueItemsCollected;
    starsEarned += missionInfo.starsEarned;
    totalCreditsEarned += missionInfo.totalCredits;
    numOfDeaths += missionInfo.numOfDeaths;
  }

  superSamplesCollected += highValueItemsCollected * 2;
  averageMissionTime = averageMissionTime / 15;

  let creditsSubtractedForMissionsFailed = 200 * failedMissions;

  // max credits from stars = 720
  // min credits from super samples 740 ???
  // max credits from reinforcements remaining = 300
  // easy = 0
  // medium = 250
  // hard = 500

  bbGameOverModalBody.innerHTML += `<h5 class="text-white">明细：</h5>`;
  bbGameOverModalBody.innerHTML += `<p class="mb-0 text-white">难度： ${difficulty}</p>`;
  bbGameOverModalBody.innerHTML += `<p class="mb-0 text-white">Start Time: ${dateStarted}</p>`;
  bbGameOverModalBody.innerHTML += `<p class="mb-0 text-white">End Time: ${dateEnded}</p>`;
  bbGameOverModalBody.innerHTML += `<p class="mb-0 text-white">获得星数： ${starsEarned}/72</p>`;
  bbGameOverModalBody.innerHTML += `<p class="mb-0 text-white">收集的超级样本： ${superSamplesCollected}</p>`;
  bbGameOverModalBody.innerHTML += `<p class="mb-0 text-white">死亡次数： ${numOfDeaths}</p>`;
  bbGameOverModalBody.innerHTML += `<p class="mb-0 text-white">收集的高价值物品： ${highValueItemsCollected}</p>`;
  bbGameOverModalBody.innerHTML += `<p class="mb-0 text-white">平均剩余时间： ${averageMissionTime.toFixed(
    0,
  )}%</p>`;
  bbGameOverModalBody.innerHTML += `<p class="mb-0 text-white">Ending Credits: ${credits}</p>`;
  bbGameOverModalBody.innerHTML += `<p class="mb-0 text-white">Missions Failed: ${failedMissions}</p>`;
  bbGameOverModalBody.innerHTML += `<p class="mb-0 text-white"><br /></p>`;
  bbGameOverModalBody.innerHTML += `<h5 class="text-white">得分：</h5>`;
  bbGameOverModalBody.innerHTML += `<p class="mb-0 text-white">Total Credits Earned: ${totalCreditsEarned}</p>`;
  bbGameOverModalBody.innerHTML += `<p class="mb-0 text-white">Difficulty (${difficulty}): ${difficultyModifier}</p>`;
  bbGameOverModalBody.innerHTML += `<p class="mb-0 text-white">Missions Failed Penalty: (${creditsSubtractedForMissionsFailed})</p>`;
  bbGameOverModalBody.innerHTML += `<p class="mb-0 text-white"><br /></p>`;
  bbGameOverModalBody.innerHTML += `<p class="mb-0 text-white">Total 得分： ${
    totalCreditsEarned + difficultyModifier - creditsSubtractedForMissionsFailed
  }</p>`;

  const modal = new bootstrap.Modal(bbGameOverModal);
  modal.show();
};

// if the game over modal ever closes, reset the content
bbGameOverModal.addEventListener('hidden.bs.modal', () => {
  bbGameOverModalBody.innerHTML = '';
});
