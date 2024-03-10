import gradient from "gradient-string";

const poimandresTheme = [
  "#add7ff",
  "#89ddff",
  "#5de4c7",
  "#fae4fc",
  "#d0679d",
  "#fffac2",
];

const TITLE_TEXT = `   ___ ___ ___   _ _____ ___   __  __ ___ ___ _____   _____ ___ 
  / __| _ \\ __| /_\\_   _| __| |  \\/  / __| __| _ \\ \\ / / __| _ \\
 | (__|   / _| / _ \\| | | _|  | |\\/| \\__ \\ _||   /\\ V /| _||   /
  \\___|_|_\\___/_/ \\_\\_| |___| |_|  |_|___/___|_|_\\ \\_/ |___|_|_\\
                                                                `;

export function renderTitle() {
  const titleGradient = gradient(poimandresTheme);
  console.log(titleGradient.multiline(TITLE_TEXT));
}
