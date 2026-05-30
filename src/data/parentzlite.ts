export type PathSlug = "emotions" | "sommeil" | "ecrans" | "autonomie" | "freres-soeurs";

export type ParentPath = {
  slug: PathSlug;
  title: string;
  shortTitle: string;
  image: string;
  color: string;
  total: number;
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

export type ParentProgress = {
  level: number;
  xp: number;
  maxXp: number;
  streak: number;
  seeds: number;
  completedSituations: string[];
  badges: string[];
};

export const paths: ParentPath[] = [
  {
    slug: "emotions",
    title: "Les emotions",
    shortTitle: "Emotions",
    image: "/parentZlite/parcours/parcours-emotions.png",
    color: "var(--color-pink)",
    total: 10,
    completed: 3,
  },
  {
    slug: "sommeil",
    title: "Le sommeil",
    shortTitle: "Sommeil",
    image: "/parentZlite/parcours/parcours-sommeil.png",
    color: "var(--color-blue)",
    total: 10,
    completed: 2,
  },
  {
    slug: "ecrans",
    title: "Trop d'ecrans",
    shortTitle: "Ecrans",
    image: "/parentZlite/parcours/parcours-ecrans.png",
    color: "var(--color-primary)",
    total: 10,
    completed: 1,
  },
  {
    slug: "autonomie",
    title: "L'autonomie",
    shortTitle: "Autonomie",
    image: "/parentZlite/parcours/parcours-autonomie.png",
    color: "var(--color-yellow)",
    total: 10,
    completed: 0,
  },
  {
    slug: "freres-soeurs",
    title: "Freres et soeurs",
    shortTitle: "Fratrie",
    image: "/parentZlite/parcours/parcours-freres-soeurs.png",
    color: "var(--color-green)",
    total: 10,
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

export const initialProgress: ParentProgress = {
  level: 4,
  xp: 320,
  maxXp: 500,
  streak: 7,
  seeds: 12,
  completedSituations: ["ecrans-1"],
  badges: ["gardien-du-calme", "expert-emotions", "super-parent"],
};

export function getPath(slug: string) {
  return paths.find((path) => path.slug === slug);
}

export function getSituation(id: string) {
  return situations.find((situation) => situation.id === id);
}
