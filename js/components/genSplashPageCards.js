const challengeCardsContainer = document.getElementById(
  "challengeCardsContainer"
);
const toolCardsContainer = document.getElementById("toolCardsContainer");

const genSplashPageCards = (type) => {
  let container = challengeCardsContainer;
  let list = [
    {
      displayName: "苦修远征",
      internalName: "penitentcrusade",
      icon: "skull-and-crossbones",
    },
    {
      displayName: "预算闪电战",
      internalName: "budgetblitz",
      icon: "dollar-circle-list",
    },
    {
      displayName: "自由快线",
      internalName: "freedomexpress",
      icon: "stopwatch",
    },
    {
      displayName: "特殊行动",
      internalName: "specialops",
      icon: "soldier",
    },
    // {
    //   displayName: "Debt Divers",
    //   internalName: "debtdivers",
    //   icon: "bank",
    // },
  ];
  if (type === "tools") {
    list = [
      {
        displayName: "随机装备",
        internalName: "randomizer",
        icon: "dice",
      },
      {
        displayName: "等级列表制作器",
        internalName: "tiermaker",
        icon: "list",
      },
      {
        displayName: "护甲实验室",
        internalName: "armorlab",
        icon: "armor",
      },
      {
        displayName: "配装生成器",
        internalName: "loadoutbuilder",
        icon: "tools",
      },
    ];
    container = toolCardsContainer;
  }

  for (let i = 0; i < list.length; i++) {
    const li = list[i];
    const card = document.createElement("a");
    card.href = `./${li.internalName}`;
    card.className = `card col-4 col-lg-2 bg-none m-1 p-2 text-center challengeCards`;
    card.innerHTML = `
    <img class="img-fluid svgIconStyles" src="../images/iconSVGs/${li.icon}.svg" />
    <div class="card-body itemNameContainer p-0 p-lg-2 align-items-center">
      <p class="card-title text-white pcItemCardText">${li.displayName}</p>
    </div>
  `;
    container.appendChild(card);
  }
};

genSplashPageCards("challenges");
genSplashPageCards("tools");
