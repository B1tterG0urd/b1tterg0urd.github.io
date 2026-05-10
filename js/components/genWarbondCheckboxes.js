const warbondsChecklistContainer = document.getElementById(
  "warbondsChecklistContainer",
);
const warbondsList = [
  "超级公民版", // warbond0
  "超级商店", // warbond1
  "预购奖励", // warbond2
  "绝地潜兵动员", // warbond3
  "钢铁老兵", // warbond4
  "尖端科技", // warbond5
  "民主爆破", // warbond6
  "极地爱国者", // warbond7
  "蝰蛇突击队", // warbond8
  "自由之火", // warbond9
  "化学特工", // warbond10
  "真理执行者", // warbond11
  "都市传奇", // warbond12
  "自由之仆", // warbond13
  "边境正义", // warbond14
  "典礼大师", // warbond15
  "法律之力", // warbond16
  "对照组", // warbond17
  "杀戮地带", // warbond18
  "ODST", //warbond19
  "尘暴恶魔", //warbond20
  "蟒蛇突击队", //warbond21
  "机密军团", //warbond22
  "攻城突破者", //warbond23
  "固守师团", //warbond24
  "机甲专家", //warbond25
];

const genWarbondCheckboxes = () => {
  warbondsChecklistContainer.innerHTML = `
    <h5 class="text-white d-flex justify-content-center">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="toggleAllWarbonds" />
        <label class="form-check-label" for="toggleAllWarbonds">
          <div>战争债券选择</div>
        </label>
      </div>
    </h5>
  `;

  for (let i = 0; i < warbondsList.length; i++) {
    warbondsChecklistContainer.innerHTML += `
          <div class="form-check">
            <input
                class="form-check-input warbondCheckboxes"
                type="checkbox"
                value=""
                id="warbond${i}"
                checked
            />
            <label
                class="form-check-label"
                for="warbond${i}"
            >
                <div>
                    <b class="text-white"
                        >${warbondsList[i]}</b
                    >
                </div>
            </label>
          </div>
      `;
  }
};

genWarbondCheckboxes();
