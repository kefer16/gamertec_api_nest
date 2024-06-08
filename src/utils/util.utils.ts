export const generateNumberRandom = (): number => {
   // Generar un número aleatorio entre 100000 y 999999
   return Math.floor(Math.random() * 900000) + 100000;
};
