# DESIGN.md — ParentZlite MVP Front

## Objectif

Créer le MVP front-only de ParentZlite, une PWA ludique pour aider les parents à progresser dans leur parentalité grâce à des situations interactives, des missions courtes et une progression gamifiée.

L’enfant n’utilise pas l’application directement.
Le parent consulte, apprend, réalise éventuellement une activité dans la vraie vie, puis valide sa progression.

## Direction artistique

Le design doit s’inspirer fortement des références présentes dans :

```txt
/references/figma/screens/
```

Écrans de référence :

```txt
screen-connection.png
screen-accueil.png
screen-exemple-situation.png
screen-recompenses.png
screen-parcours.png
screen-progression.png
screen-badges.png
screen-selection-chapitre.png
```

Ces fichiers servent uniquement de référence visuelle pour :

* composition
* spacing
* couleurs
* arrondis
* tailles des cartes
* boutons
* navigation
* hiérarchie typographique
* ambiance générale

Ne pas les importer dans l’application comme images d’écran.

## Assets utilisables dans l’app

Les vrais assets utilisables sont dans :

```txt
/public/parentZlite/
```

Structure actuelle :

```txt
/public/parentZlite/
  cards-situations/
    card-colere-au-supermarche.png
    card-dispute-frere-soeur.png
    card-habillage.png
    card-refus-coucher.png
    card-trop-ecrans.png

  collectibles/
    collectibles-etoile-xp.png
    collectibles-graine-de-renard.png
    collectibles-taniere.png

  noxi-emotes/
    noxi-curieux.png
    noxi-dort.png
    noxi-encourage.png
    noxi-fier.png
    noxi-heureux.png
    noxi-pleure.png
    noxi-presente.png
    noxi-réfléchit.png
    noxi-rire.png
    noxi-surpris.png
    noxi.png

  noxi-illustrations/
    noxi-bienvenue.png
    noxi-recompenses.png

  parcours/
    parcours-autonomie.png
    parcours-ecrans.png
    parcours-emotions.png
    parcours-freres-soeurs.png
    parcours-sommeil.png
```

## Références Figma supplémentaires

```txt
/references/figma/
  boutons.png
  elements-interface.png
  palette-de-couleurs.png
  typographie.png
```

Ces images servent de guide pour reproduire :

* boutons
* composants UI
* couleurs
* typographie
* style des éléments

## Palette principale

```css
--color-primary: #8B49FF;
--color-primary-dark: #6F35D8;
--color-text: #1A1F4F;
--color-text-muted: #5A5977;
--color-bg: #F3F6FB;
--color-card: #FFFFFF;
--color-orange: #FF8A3D;
--color-yellow: #FFE08A;
--color-green: #A8E6A1;
--color-blue: #7CC6FF;
--color-pink: #FF8FC6;
--color-mint: #BDEDD0;
```

## Typographie

Titres :

```txt
Baloo 2
```

Texte :

```txt
Nunito
```

Importer les polices via `next/font/google`.

## Style global

L’interface doit être :

* mobile-first
* très arrondie
* douce
* pastel
* premium
* ludique
* rassurante
* non moralisatrice

Largeur app :

```css
max-width: 430px;
margin: 0 auto;
min-height: 100dvh;
```

## Pages MVP

### `/`

Écran de connexion / onboarding.

Inspiré de :

```txt
screen-connection.png
```

Contenu :

* logo ParentZlite en texte
* asset `noxi-illustrations/noxi-bienvenue.png`
* phrase : “Chaque parent apprend chaque jour.”
* bouton principal : “Commencer”
* lien secondaire : “J’ai déjà un compte”

Le bouton mène à `/home`.

### `/home`

Inspiré de :

```txt
screen-accueil.png
```

Contenu :

* header “Bonjour ! 👋”
* avatar Noxi
* série du jour
* carte niveau XP
* grille des parcours
* défi du jour
* bottom navigation

### `/parcours`

Inspiré de :

```txt
screen-parcours.png
```

Afficher les 5 parcours :

* Les émotions
* Le sommeil
* Les écrans
* L’autonomie
* Frères et sœurs

Chaque carte utilise l’asset correspondant dans :

```txt
/public/parentZlite/parcours/
```

### `/parcours/[slug]`

Inspiré de :

```txt
screen-selection-chapitre.png
```

Afficher une liste de situations du parcours.

Exemple pour “Les écrans” :

* Situation 1 : Demande avant l’école
* Situation 2 : Juste avant le dîner
* Situation 3 : Pendant le week-end
* Situation 4 : En voiture

Certaines situations peuvent être verrouillées visuellement.

### `/situation/[id]`

Inspiré de :

```txt
screen-exemple-situation.png
```

Contenu :

* barre de progression
* image de situation
* tag de parcours
* texte de situation
* 3 choix
* bouton “Valider ma réponse”

Important :

Ne jamais afficher “mauvaise réponse”.

Utiliser un feedback doux :

* “Cette réaction est compréhensible quand on est fatigué.”
* “À court terme, cela peut calmer la situation.”
* “À long terme, cette approche peut aider l’enfant à mieux comprendre la limite.”

### `/success`

Inspiré de :

```txt
screen-recompenses.png
```

Contenu :

* asset `noxi-illustrations/noxi-recompenses.png`
* “Bravo !”
* `+20 XP`
* carte niveau
* récompenses :

  * +20 XP
  * +1 graine
  * streak +1
* bouton “Continuer”

### `/progression`

Inspiré de :

```txt
screen-progression.png
```

Contenu :

* niveau actuel
* XP total
* série actuelle
* graines
* barre XP
* message motivant avec Noxi

### `/badges`

Inspiré de :

```txt
screen-badges.png
```

Contenu :

* badges débloqués
* badges verrouillés
* cartes grises pour les badges non obtenus

## Composants à créer

Créer les composants dans :

```txt
/src/components/parentzlite/
```

Composants :

```txt
AppShell.tsx
BottomNav.tsx
PrimaryButton.tsx
XpBar.tsx
LevelCard.tsx
PathCard.tsx
SituationCard.tsx
ChoiceButton.tsx
RewardCard.tsx
BadgeCard.tsx
ProgressStatCard.tsx
NoxiBubble.tsx
```

Chaque composant doit avoir son fichier CSS Module associé si nécessaire :

```txt
XpBar.tsx
XpBar.module.css
```

## Données mockées

Créer :

```txt
/src/data/parentzlite.ts
```

Contenu :

* parcours
* situations
* badges
* récompenses
* progression initiale

## Hook progression

Créer :

```txt
/src/hooks/useParentProgress.ts
```

Le hook doit gérer :

* lecture localStorage
* écriture localStorage
* ajout XP
* ajout graine
* ajout situation complétée
* incrément streak
* passage de niveau si XP suffisant

## Gamification MVP

Règles :

* situation terminée : `+20 XP`
* écran réussite : `+1 graine`
* série maintenue : `+1 streak`
* si XP dépasse `maxXp`, niveau +1

## Animations

Utiliser Framer Motion.

Animations :

* carte qui apparaît en douceur
* bouton qui scale au tap
* barre XP animée
* récompense qui pop
* Noxi léger flottement
* succès avec confettis simples ou éléments décoratifs

## Ton de l’app

Toujours :

* doux
* encourageant
* clair
* jamais jugeant

À utiliser :

* “Chaque petit pas compte.”
* “Tu progresses avec ton enfant.”
* “Observons ensemble.”
* “Cette réaction est compréhensible.”

À éviter :

* “Mauvaise réponse”
* “Erreur”
* “Tu dois”
* “Ce n’est pas bien”
* “Le bon parent fait…”

## Contraintes

* Next.js App Router
* TypeScript
* CSS Modules
* Framer Motion
* Front-only
* Pas d’auth
* Pas de backend
* Pas de paiement
* Données mockées
* Sauvegarde en localStorage
* Mobile-first
* PWA-ready

## But final

Obtenir une démo front réaliste, fluide et très propre, qui peut être montrée à des parents ou à une école maternelle pour tester l’intérêt du concept.
