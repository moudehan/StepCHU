export function calculerDistance(stepsCount: number) {
  const longueurDePasM = 0.762;
  const distanceParcourue = (stepsCount * longueurDePasM) / 1000;
  return distanceParcourue;
}
