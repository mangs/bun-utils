declare module 'util' {
  // https://nodejs.org/docs/latest/api/util.html#foreground-colors
  type ForegroundColors =
    | 'black'
    | 'blackBright'
    | 'blue'
    | 'blueBright'
    | 'cyan'
    | 'cyanBright'
    | 'gray'
    | 'green'
    | 'greenBright'
    | 'grey'
    | 'magenta'
    | 'magentaBright'
    | 'red'
    | 'redBright'
    | 'white'
    | 'whiteBright'
    | 'yellow'
    | 'yellowBright';

  // https://nodejs.org/docs/latest/api/util.html#background-colors
  type BackgroundColors =
    | 'bgBlack'
    | 'bgBlackBright'
    | 'bgBlue'
    | 'bgBlueBright'
    | 'bgCyan'
    | 'bgCyanBright'
    | 'bgGray'
    | 'bgGreen'
    | 'bgGreenBright'
    | 'bgGrey'
    | 'bgMagenta'
    | 'bgMagentaBright'
    | 'bgRed'
    | 'bgRedBright'
    | 'bgWhite'
    | 'bgWhiteBright'
    | 'bgYellow'
    | 'bgYellowBright';

  // https://nodejs.org/docs/latest/api/util.html#modifiers
  type Modifiers =
    | 'blink'
    | 'bold'
    | 'dim'
    | 'doubleunderline'
    | 'framed'
    | 'hidden'
    | 'inverse'
    | 'italic'
    | 'overlined'
    | 'reset'
    | 'strikethrough'
    | 'underline';

  function styleText(format: ForegroundColors | BackgroundColors | Modifiers, text: string): string;
}
