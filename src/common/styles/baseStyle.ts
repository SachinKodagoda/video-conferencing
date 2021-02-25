// --- Breakpoints
const maxMobile = 576; // (for phones)
const minTablet = 576; // (for tablet)
const minTabletLC = 769; // (landscape of tablet)
const minDesktopSM = 992; // (for small Laptop)
const minDesktopLG = 1201; // (for large laptop)
const min4K = 1441; // (for 4k)

export const breakpoints = {
  maxMobile: `only screen and (max-width: ${maxMobile}px)`,
  minTablet: `only screen and (min-width: ${minTablet}px)`,
  minTabletLC: `only screen and (min-width: ${minTabletLC}px)`,
  minDesktopSM: `only screen and (min-width: ${minDesktopSM}px)`,
  minDesktopLG: `only screen and (min-width: ${minDesktopLG}px)`,
  min4K: `only screen and (min-width: ${min4K}px)`,
};

export const clearfix = `
    &:after,
    &:before{
        content: "";
        display: table;
    }
    &:after {
        clear: both;
    }
`;

export const noSelect = `
    -webkit-touch-callout: none;
    user-select: none;
`;

export const noCallout = `
  -webkit-touch-callout: none;
`;

export const noAction = `
  touch-action: none;
`;

export const imgNoClick = `
  position: relative;
`;

export const imgNoClickCover = `
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
`;

export const focusRingIssue = `
  outline: -webkit-focus-ring-color auto 5px;
`;

export const tapHighlightIssue = `
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
`;

export const breakWords = `
  word-wrap: break-word;
`;

export const wrapWords = `
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
`;
