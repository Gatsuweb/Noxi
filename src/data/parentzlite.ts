export type PathSlug = "emotions" | "sommeil" | "ecrans" | "autonomie" | "freres-soeurs";

export type ParentPath = {
  slug: PathSlug;
  title: string;
  name: string;
  shortTitle: string;
  image: string;
  color: string;
  description: string;
  total: number;
  totalSituations: number;
  completed: number;
};

export type Situation = {
  id: string;
  pathSlug: PathSlug;
  title: string;
  label: string;
  image: string;
  text: string;
  choices: string[];
  unlocked: boolean;
  order: number;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  tone: "gold" | "pink" | "purple" | "locked";
};

export type ReadingCard = {
  id: string;
  title: string;
  category: string;
  readingTime: string;
  summary: string;
  takeaway: string;
  action: string;
};

export type DailyMission = {
  id: string;
  category: string;
  title: string;
  duration: string;
  rewardXp: number;
  rewardSeeds: number;
  description: string;
  noxiMessage: string;
};

export type ParentTitle = {
  id: string;
  title: string;
  description: string;
};

export type ParentMoment = {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
};

export type ParentSkill = {
  id: string;
  name: string;
  progress: number;
};

export type SeedReward = {
  id: string;
  name: string;
  cost: number;
  type: "streak" | "script" | "guide" | "challenge";
  description: string;
};

export type PathChapterStatus = "completed" | "current" | "locked";

export type PathChapter = {
  id: string;
  title: string;
  description: string;
  status: PathChapterStatus;
};

export type RewardItem = {
  id: string;
  name: string;
  cost: number;
  image: string;
  description: string;
};

export type ParentProgress = {
  level: number;
  xp: number;
  maxXp: number;
  streak: number;
  seeds: number;
  completedSituations: string[];
  badges: string[];
  completedMissions: string[];
  completedReadings: string[];
  parentMoments: ParentMoment[];
  unlockedSeedRewards: string[];
  streakFreezes: number;
  unlockedStickers: string[];
  unlockedSkins: string[];
  unlockedEmotions: string[];
  equippedSkin: string;
};

export const rewardImages = {
  stickerTest: "/parentZlite/rewards/stickers/Stickers-test.png",
  stickerCalme: "/parentZlite/rewards/stickers/sticker%20calme.png",
  stickerCoucher: "/parentZlite/rewards/stickers/sticker%20coucher.png",
  skinClassique: "/parentZlite/rewards/skins/Skin-test.png",
  skinLecteur: "/parentZlite/rewards/skins/skin%20lecteur.png",
  skinExplorateur: "/parentZlite/rewards/skins/skin%20explorateur.png",
  skinHero: "/parentZlite/rewards/skins/skin-hero.png",
  emotionHeureux: "/parentZlite/rewards/emotions/emotion-heureux.png",
  emotionCurieux: "/parentZlite/rewards/emotions/emotion-curieux.png",
  emotionEncourageant: "/parentZlite/rewards/emotions/emotion-encourageant.png",
};

export const paths: ParentPath[] = [
  {
    slug: "emotions",
    title: "Les émotions",
    name: "Les émotions",
    shortTitle: "Émotions",
    image: "/parentZlite/parcours/parcours-emotions.png",
    color: "pink",
    description: "Comprendre et accompagner les émotions.",
    total: 10,
    totalSituations: 10,
    completed: 3,
  },
  {
    slug: "sommeil",
    title: "Le sommeil",
    name: "Le sommeil",
    shortTitle: "Sommeil",
    image: "/parentZlite/parcours/parcours-sommeil.png",
    color: "blue",
    description: "Créer des routines plus douces.",
    total: 10,
    totalSituations: 10,
    completed: 2,
  },
  {
    slug: "ecrans",
    title: "Les écrans",
    name: "Les écrans",
    shortTitle: "Écrans",
    image: "/parentZlite/parcours/parcours-ecrans.png",
    color: "purple",
    description: "Poser des limites sans conflit inutile.",
    total: 10,
    totalSituations: 10,
    completed: 1,
  },
  {
    slug: "autonomie",
    title: "L'autonomie",
    name: "L'autonomie",
    shortTitle: "Autonomie",
    image: "/parentZlite/parcours/parcours-autonomie.png",
    color: "yellow",
    description: "Aider l'enfant à faire seul progressivement.",
    total: 10,
    totalSituations: 10,
    completed: 0,
  },
  {
    slug: "freres-soeurs",
    title: "Frères et sœurs",
    name: "Frères et sœurs",
    shortTitle: "Fratrie",
    image: "/parentZlite/parcours/parcours-freres-soeurs.png",
    color: "green",
    description: "Apaiser les disputes et encourager la coopération.",
    total: 10,
    totalSituations: 10,
    completed: 1,
  },
];

export const situations: Situation[] = [
  {
    id: "ecrans-1",
    pathSlug: "ecrans",
    title: "Demande avant l'ecole",
    label: "Situation 1",
    image: "/parentZlite/cards-situations/card-trop-ecrans.png",
    text: "Votre enfant reclame une tablette alors que le depart approche. Vous avez besoin de garder le matin fluide.",
    choices: [
      "Observons ensemble ce qui rend ce moment difficile.",
      "Je propose un repere clair et une alternative courte.",
      "Je prends une pause, puis je reformule la limite avec calme.",
    ],
    unlocked: true,
    order: 1,
  },
  {
    id: "ecrans-2",
    pathSlug: "ecrans",
    title: "Juste avant le diner",
    label: "Situation 2",
    image: "/parentZlite/cards-situations/card-trop-ecrans.png",
    text: "Votre enfant reclame une tablette juste avant le diner. Vous avez deja dit non plusieurs fois aujourd'hui.",
    choices: [
      "J'eleve la voix pour qu'il comprenne que c'est non.",
      "Je cede pour eviter la crise et le conflit.",
      "J'explique calmement et propose une alternative avant le diner.",
    ],
    unlocked: true,
    order: 2,
  },
  {
    id: "ecrans-3",
    pathSlug: "ecrans",
    title: "Pendant le week-end",
    label: "Situation 3",
    image: "/parentZlite/cards-situations/card-trop-ecrans.png",
    text: "Le week-end commence et les ecrans prennent vite beaucoup de place dans la journee.",
    choices: [
      "Je construis un petit rituel avec un temps d'ecran visible.",
      "Je retire tout sans en parler.",
      "Je laisse la journee se regler toute seule.",
    ],
    unlocked: false,
    order: 3,
  },
  {
    id: "ecrans-4",
    pathSlug: "ecrans",
    title: "En voiture",
    label: "Situation 4",
    image: "/parentZlite/cards-situations/card-trop-ecrans.png",
    text: "Le trajet est long et votre enfant demande un dessin anime apres quelques minutes.",
    choices: [
      "Je prepare deux options simples pour patienter.",
      "Je promets un ecran plus tard sans repere.",
      "Je m'agace parce que la demande revient.",
    ],
    unlocked: false,
    order: 4,
  },
  {
    id: "emotions-1",
    pathSlug: "emotions",
    title: "Colere au supermarche",
    label: "Situation 1",
    image: "/parentZlite/cards-situations/card-colere-au-supermarche.png",
    text: "Votre enfant se met en colere dans un rayon. Tout le monde semble regarder.",
    choices: [
      "Cette reaction est comprehensible, je baisse le ton.",
      "Je menace de partir sans lui.",
      "Je nomme l'emotion et je propose un petit choix.",
    ],
    unlocked: true,
    order: 1,
  },
  {
    id: "sommeil-1",
    pathSlug: "sommeil",
    title: "Refus du coucher",
    label: "Situation 1",
    image: "/parentZlite/cards-situations/card-refus-coucher.png",
    text: "Le coucher s'allonge et votre enfant rappelle plusieurs fois.",
    choices: [
      "Je garde un rituel court et previsible.",
      "Je negocie encore cinq minutes plusieurs fois.",
      "Je rappelle que chaque petit pas compte.",
    ],
    unlocked: true,
    order: 1,
  },
  {
    id: "autonomie-1",
    pathSlug: "autonomie",
    title: "L'habillage",
    label: "Situation 1",
    image: "/parentZlite/cards-situations/card-habillage.png",
    text: "Le matin, l'habillage prend du temps et tout le monde se tend.",
    choices: [
      "Je propose deux vetements et je valorise l'effort.",
      "Je fais tout moi-meme en silence.",
      "Je transforme le moment en mini-defi.",
    ],
    unlocked: true,
    order: 1,
  },
  {
    id: "freres-soeurs-1",
    pathSlug: "freres-soeurs",
    title: "Dispute frere soeur",
    label: "Situation 1",
    image: "/parentZlite/cards-situations/card-dispute-frere-soeur.png",
    text: "Deux enfants veulent le meme jouet et la tension monte.",
    choices: [
      "Je separe les roles et j'aide chacun a parler.",
      "Je prends le jouet sans expliquer.",
      "Je rappelle que tu progresses avec ton enfant.",
    ],
    unlocked: true,
    order: 1,
  },
];

export const badges: Badge[] = [
  { id: "gardien-du-calme", name: "Gardien du Calme", description: "3 situations terminees", tone: "gold" },
  { id: "expert-emotions", name: "Expert des Emotions", description: "Parcours emotions lance", tone: "pink" },
  { id: "super-parent", name: "Super Parent", description: "7 jours de serie", tone: "gold" },
  { id: "guide-bienveillant", name: "Guide Bienveillant", description: "Bientot disponible", tone: "locked" },
  { id: "communicateur", name: "Communicateur en herbe", description: "Bientot disponible", tone: "locked" },
  { id: "parent-inspirant", name: "Parent Inspirant", description: "Bientot disponible", tone: "locked" },
];

export const readingCards: ReadingCard[] = [
  {
    id: "limite-calme",
    title: "Poser une limite sans durcir le moment",
    category: "Cadre",
    readingTime: "2 min",
    summary: "Une limite aide mieux quand elle reste courte, claire et reliee a une action simple.",
    takeaway: "Le parent peut garder le cap tout en reconnaissant ce que vit l'enfant.",
    action: "Aujourd'hui, choisir une phrase courte comme : Je vois que c'est difficile, l'ecran attend apres le repas.",
  },
  {
    id: "emotion-nommee",
    title: "Nommer l'emotion pour apaiser",
    category: "Emotions",
    readingTime: "3 min",
    summary: "Mettre des mots sur ce qui se passe peut aider l'enfant a se sentir rejoint avant de revenir au calme.",
    takeaway: "Nommer ne veut pas dire accepter tout le comportement, cela ouvre un chemin pour avancer.",
    action: "Lors d'une tension, tester : Tu sembles tres decu, je reste avec toi et on respire ensemble.",
  },
  {
    id: "petit-choix",
    title: "Proposer deux petits choix",
    category: "Autonomie",
    readingTime: "2 min",
    summary: "Deux options simples donnent a l'enfant une place active sans transformer le moment en negociation longue.",
    takeaway: "Un choix limite peut rendre la cooperation plus accessible.",
    action: "Au prochain habillage, proposer : Pull bleu ou pull vert ? puis valoriser l'effort.",
  },
];

export const dailyMissions: DailyMission[] = [
  {
    id: "autonomie-tenue",
    category: "Autonomie",
    title: "Le choix des vêtements",
    duration: "3 min",
    rewardXp: 20,
    rewardSeeds: 1,
    description: "Propose à ton enfant de choisir entre deux tenues préparées à l'avance.",
    noxiMessage: "Donner un petit choix aide l'enfant à se sentir acteur.",
  },
  {
    id: "emotions-meteo",
    category: "Émotions",
    title: "La météo intérieure",
    duration: "4 min",
    rewardXp: 20,
    rewardSeeds: 1,
    description:
      "Demande à ton enfant de choisir une météo pour dire comment il se sent : soleil, nuage, pluie ou orage.",
    noxiMessage: "Mettre des mots simples sur les émotions aide l'enfant à mieux les comprendre.",
  },
  {
    id: "sommeil-rituel",
    category: "Sommeil",
    title: "Le mini-rituel du soir",
    duration: "5 min",
    rewardXp: 20,
    rewardSeeds: 1,
    description: "Annonce les trois étapes du coucher avant de commencer : pyjama, histoire, câlin.",
    noxiMessage: "Les routines donnent des repères et peuvent rendre le coucher plus prévisible.",
  },
  {
    id: "ecrans-alternative",
    category: "Écrans",
    title: "L'alternative préparée",
    duration: "3 min",
    rewardXp: 20,
    rewardSeeds: 1,
    description:
      "Avant de dire non à un écran, propose une alternative simple déjà prête : dessin, puzzle ou histoire.",
    noxiMessage: "Une limite est souvent mieux acceptée quand une alternative concrète existe.",
  },
  {
    id: "fratrie-tour-role",
    category: "Frères et sœurs",
    title: "Chacun son tour",
    duration: "5 min",
    rewardXp: 20,
    rewardSeeds: 1,
    description: "Propose un petit jeu où chacun a un rôle clair et change de rôle après deux minutes.",
    noxiMessage: "Les rôles clairs réduisent parfois les tensions entre enfants.",
  },
];

export const parentTitles: ParentTitle[] = [
  {
    id: "gardien-calme-7",
    title: "7 jours a garder le calme",
    description: "Tu as maintenu une serie de 7 jours.",
  },
  {
    id: "parent-curieux",
    title: "Parent curieux",
    description: "Tu as lu 5 contenus Comprendre.",
  },
  {
    id: "parent-actif",
    title: "Parent actif",
    description: "Tu as realise 10 missions reelles.",
  },
  {
    id: "guide-emotions",
    title: "Guide des emotions",
    description: "Tu as termine le parcours Emotions.",
  },
];

export const parentMoments: ParentMoment[] = [
  {
    id: "mission-tenue",
    title: "Choix des vetements",
    category: "Autonomie",
    date: "Aujourd'hui",
    description: "Tu as propose deux choix simples a ton enfant.",
  },
  {
    id: "lecture-routines",
    title: "Comprendre les routines",
    category: "Sommeil",
    date: "Hier",
    description: "Tu as pris 2 minutes pour mieux comprendre l'importance des reperes.",
  },
];

export const parentSkills: ParentSkill[] = [
  {
    id: "calme",
    name: "Calme",
    progress: 65,
  },
  {
    id: "ecoute",
    name: "Ecoute",
    progress: 45,
  },
  {
    id: "cadre",
    name: "Cadre",
    progress: 55,
  },
  {
    id: "autonomie",
    name: "Autonomie",
    progress: 35,
  },
];

export const seedRewards: SeedReward[] = [
  {
    id: "freeze-streak",
    name: "Protection de serie",
    cost: 5,
    type: "streak",
    description: "Conserve ta serie lors d'une journee chargee.",
  },
  {
    id: "script-supermarche",
    name: "Script : crise au supermarche",
    cost: 10,
    type: "script",
    description: "Une fiche concrete avec des phrases pretes a utiliser.",
  },
  {
    id: "fiche-colere",
    name: "Fiche : accompagner une colere",
    cost: 15,
    type: "guide",
    description: "Un resume pratique pour comprendre et agir.",
  },
  {
    id: "defi-autonomie",
    name: "Defi avance : autonomie",
    cost: 20,
    type: "challenge",
    description: "Une mission plus complete a tester dans la vraie vie.",
  },
];

export const pathChapters: Record<PathSlug, PathChapter[]> = {
  emotions: [
    {
      id: "emotions-accueillir",
      title: "Accueillir l'émotion",
      description: "Reconnaître ce que vit l'enfant avant d'agir.",
      status: "completed",
    },
    {
      id: "emotions-nommer",
      title: "Mettre des mots",
      description: "Utiliser des phrases simples pour clarifier le moment.",
      status: "current",
    },
    {
      id: "emotions-apaiser",
      title: "Retrouver le calme",
      description: "Proposer un repère corporel ou une pause courte.",
      status: "locked",
    },
    {
      id: "emotions-reparer",
      title: "Réparer après la tempête",
      description: "Revenir au lien quand chacun est plus disponible.",
      status: "locked",
    },
  ],
  sommeil: [
    {
      id: "sommeil-rituel",
      title: "Préparer le rituel",
      description: "Créer trois étapes faciles à répéter.",
      status: "completed",
    },
    {
      id: "sommeil-transition",
      title: "Adoucir la transition",
      description: "Aider l'enfant à passer de l'activité au repos.",
      status: "current",
    },
    {
      id: "sommeil-rappel",
      title: "Répondre aux rappels",
      description: "Garder un repère stable quand le coucher s'allonge.",
      status: "locked",
    },
    {
      id: "sommeil-autonomie",
      title: "Encourager l'autonomie",
      description: "Valoriser les petits progrès du soir.",
      status: "locked",
    },
  ],
  ecrans: [
    {
      id: "ecrans-base",
      title: "Comprendre la demande",
      description: "Identifier ce que l'enfant cherche vraiment.",
      status: "completed",
    },
    {
      id: "ecrans-limites",
      title: "Poser une limite douce",
      description: "Dire non sans entrer dans un bras de fer.",
      status: "current",
    },
    {
      id: "ecrans-alternatives",
      title: "Proposer une alternative",
      description: "Rediriger l'attention vers une activité possible.",
      status: "locked",
    },
    {
      id: "ecrans-routine",
      title: "Créer une routine écran",
      description: "Rendre les règles prévisibles.",
      status: "locked",
    },
  ],
  autonomie: [
    {
      id: "autonomie-choix",
      title: "Offrir un petit choix",
      description: "Donner deux options simples et acceptables.",
      status: "completed",
    },
    {
      id: "autonomie-essayer",
      title: "Laisser essayer",
      description: "Valoriser l'effort avant le résultat.",
      status: "current",
    },
    {
      id: "autonomie-routine",
      title: "Rendre visible la routine",
      description: "Aider l'enfant à savoir ce qui vient ensuite.",
      status: "locked",
    },
    {
      id: "autonomie-celebrer",
      title: "Célébrer le progrès",
      description: "Nommer ce qui devient plus facile.",
      status: "locked",
    },
  ],
  "freres-soeurs": [
    {
      id: "fratrie-ecouter",
      title: "Écouter chacun",
      description: "Donner une place aux deux points de vue.",
      status: "completed",
    },
    {
      id: "fratrie-roles",
      title: "Clarifier les rôles",
      description: "Réduire les tensions avec un cadre simple.",
      status: "current",
    },
    {
      id: "fratrie-tour",
      title: "Organiser les tours",
      description: "Rendre l'attente plus prévisible.",
      status: "locked",
    },
    {
      id: "fratrie-cooperation",
      title: "Encourager la coopération",
      description: "Créer une petite réussite commune.",
      status: "locked",
    },
  ],
};

export const stickers: RewardItem[] = [
  {
    id: "petit-pas",
    name: "Petit pas du jour",
    cost: 5,
    image: rewardImages.stickerTest,
    description: "Un sticker pour célébrer les petites victoires.",
  },
  {
    id: "gardien-calme",
    name: "Gardien du calme",
    cost: 15,
    image: rewardImages.stickerCalme,
    description: "Pour les moments où tu gardes ton calme.",
  },
  {
    id: "rituel-coucher",
    name: "Rituel du coucher",
    cost: 25,
    image: rewardImages.stickerCoucher,
    description: "Pour célébrer les routines qui deviennent plus douces.",
  },
];

export const noxiSkins: RewardItem[] = [
  {
    id: "classique",
    name: "Noxi classique",
    cost: 0,
    image: rewardImages.skinClassique,
    description: "Le compagnon d'apprentissage de départ.",
  },
  {
    id: "lecteur",
    name: "Noxi lecteur",
    cost: 30,
    image: rewardImages.skinLecteur,
    description: "Pour les parents qui aiment comprendre.",
  },
  {
    id: "explorateur",
    name: "Noxi explorateur",
    cost: 45,
    image: rewardImages.skinExplorateur,
    description: "Pour avancer dans les parcours.",
  },
  {
    id: "hero",
    name: "Noxi héros",
    cost: 60,
    image: rewardImages.skinHero,
    description: "Pour les grandes séries de petits pas.",
  },
];

export const noxiEmotions: RewardItem[] = [
  {
    id: "heureux",
    name: "Noxi heureux",
    cost: 0,
    image: rewardImages.emotionHeureux,
    description: "Débloqué dès le départ.",
  },
  {
    id: "encourageant",
    name: "Noxi encourageant",
    cost: 10,
    image: rewardImages.emotionEncourageant,
    description: "Pour garder un ton doux pendant les moments chargés.",
  },
  {
    id: "curieux",
    name: "Noxi curieux",
    cost: 15,
    image: rewardImages.emotionCurieux,
    description: "Pour apprendre sans jugement.",
  },
];

export const initialProgress: ParentProgress = {
  level: 4,
  xp: 320,
  maxXp: 500,
  streak: 7,
  seeds: 12,
  completedSituations: ["ecrans-1"],
  badges: ["gardien-du-calme", "expert-emotions", "super-parent"],
  completedMissions: [],
  completedReadings: [],
  parentMoments,
  unlockedSeedRewards: [],
  streakFreezes: 0,
  unlockedStickers: ["petit-pas"],
  unlockedSkins: ["classique"],
  unlockedEmotions: ["heureux"],
  equippedSkin: "classique",
};

export function getPath(slug: string) {
  return paths.find((path) => path.slug === slug);
}

export function getSituation(id: string) {
  return situations.find((situation) => situation.id === id);
}
