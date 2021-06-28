export type TTab = 'quantity' | 'size' | 'upload' | 'cart';
export type TInputValue = string | number | null;
export type TCurrency = 'dollar' | 'euro';
export type TPaperSize = 'A4' | 'A3' | 'A2' | 'A1';
export type TPaper = {
  prev: number;
  now: number;
  imgUrl: string;
};
export type TFigure = {
  prev: number;
  now: number;
  imgUrl: string;
};
export interface IFigurePackageObj {
  [key: string]: TFigure;
}

export interface IPaperPackageObj {
  [key: string]: TPaper;
}

export type TMenuItem = 'artists' | 'editors' | 'customers' | 'analytics' | 'settings';
export type TMenuItemArr = {
  name: TMenuItem;
  icon: string;
}[];
