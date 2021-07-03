export const leftTopToCenter = (value: number, length: number, scaler: number): number => {
  return (value / 2) * scaler - value / scaler;
};
