# Basilisk

[https://leo29plns.github.io/basilisk/](https://leo29plns.github.io/basilisk/)

## Des cercles
Cette pâle copie de slither.io a été réalisée pour essayer de créer un snake "plus libre" dans ses déplacements. En ce sens, j'ai utilisé l'élément `<svg></svg>` afin de tracer différents éléments.

## J'ai essayé de le faire à la main
Rien que pour gérer le dépalcement du snake (faire se déplacer différents disques), il m'aura fallu bien des astuces... Par exemple, le corps avance en fonction de l'historique des positions de la tête. Mais pour pouvoir changer des paramètres, tel que la vitesse, en plein pendant la partie, il a fallu créer un gros composant `<Snake />`.

## Un système de collisions
J'ai essayé de simuler un système de collision à partir du centre d'un point, et son rayon. Des `utils` comme `isPointTooClose()` permettent de calculer si deux points se touchent, par exemple, dans le repère orthonormé qu'est le `<GameBoard /> (en gros ça marche).

## D'un point de vue technique
J'ai utilisé :
- Vite avec TypeScript, pour un typage fort
- D3js pour la manipulation des éléments
- GSAP qui devait apporter des animations, mais n'a servi que pour son ticker (dans `useTicker()`)
- PNPM pour gérer les deps

## D'autres fonctionnalités
- Un système de conservation du Best et Worst score dans le `localStorage`
- Un "YouLooseScreen" avec un message custom
