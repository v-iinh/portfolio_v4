// The colours the engravings and canvases are drawn in, for each theme. CSS colours live in styles.css.
// `T` always holds the current theme; App switches it with setTheme() before each render.

export const THEMES = {
  dark: {
    INK: "#C8A55A",      // gold engraving on the cards
    SKY_INK: "#B9BEC7",  // silver for the sky
    PAPER: "#0F0E0D",    // black card stock
    LINE: "#D2B068",     // gold engraving on the box
    BOX: ["#030303", "#181818", "#0D0D0D", "#020202"], // the box's body, left to right
    BOX_WIN: "#070707",  // the box's window and ribbon
    DUST: "190,186,174", STAR: "204,198,182", LINK: "176,172,162", REACH: "200,168,98", // warm silver, so nothing reads as stark white // canvas colours (r,g,b)
  },
  light: {
    INK: "#1F1B17",
    SKY_INK: "#2A2621",
    PAPER: "#F7F2E7",
    LINE: "#EFE6D2",
    BOX: ["#1E1B18", "#332E28", "#2A2621", "#171512"],
    BOX_WIN: "#221F1B",
    DUST: "42,38,33", STAR: "42,38,33", LINK: "42,38,33", REACH: "122,75,58",
  },
};

export const T = { ...THEMES.dark };
export function setTheme(name) { Object.assign(T, THEMES[name] || THEMES.dark); }
