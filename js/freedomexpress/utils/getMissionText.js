const getMissionText = (num) => {
  if (num === 1) {
    return "行动: 1,  任务: 1";
  }
  if (num === 2) {
    return "行动: 1,  任务: 2";
  }
  if (num === 3) {
    return "行动: 1,  任务: 3";
  }
  if (num === 4) {
    return "行动: 2,  任务: 1";
  }
  if (num === 5) {
    return "行动: 2,  任务: 2";
  }
  if (num === 6) {
    return "行动: 2,  任务: 3";
  }
  if (num === 7) {
    return "行动: 3,  任务: 1";
  }
  if (num === 8) {
    return "行动: 3,  任务: 2";
  }
  if (num === 9) {
    return "行动: 3,  任务: 3";
  }
  if (num >= 10) {
    return "挑战完成";
  }
};
