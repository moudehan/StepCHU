export function calculateCalories(stepsCount: number) {
  const longueurDePasM = 0.762;
  const facteurConversion = 0.0005;
  const poidsKg = 80;
  const caloriesBrulees =
    stepsCount * longueurDePasM * poidsKg * facteurConversion;
  return caloriesBrulees;
}
