export const leftTopToCenter = (value: number, length: number, scaler: number): number => {
  return length / (2 * scaler) - value / scaler;
};
