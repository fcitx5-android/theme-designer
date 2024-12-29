import { RawThemeProperties, ThemeProperties, uint32torgba } from "./types/ThemeProperties";

type ColorProperties = Omit<RawThemeProperties, 'version' | 'name' | 'isDark' | 'backgroundImage'>;

function makePreset(name: string, isDark: boolean, properties: ColorProperties): ThemeProperties {
    const theme: Partial<ThemeProperties> = { version: '2.1', name, isDark };
    for (const [k, v] of Object.entries(properties)) {
        // @ts-expect-error Object.entries is the best wtf
        theme[k] = uint32torgba(v);
    }
    return theme as ThemeProperties;
}

export const PixelDark = makePreset('PixelDark', true, {
    backgroundColor: 0xff2d2d2d,
    barColor: 0xff373737,
    keyboardColor: 0xff2d2d2d,
    keyBackgroundColor: 0xff464646,
    keyTextColor: 0xfffafafa,
    candidateTextColor: 0xfffafafa,
    candidateLabelColor: 0xfffafafa,
    candidateCommentColor: 0xffacacac,
    altKeyBackgroundColor: 0xff373737,
    altKeyTextColor: 0xffacacac,
    accentKeyBackgroundColor: 0xff5e97f6,
    accentKeyTextColor: 0xffffffff,
    keyPressHighlightColor: 0x33ffffff,
    keyShadowColor: 0xff252525,
    popupBackgroundColor: 0xff373737,
    popupTextColor: 0xfffafafa,
    spaceBarColor: 0xff4a4a4a,
    dividerColor: 0x1fffffff,
    clipboardEntryColor: 0xff464646,
    genericActiveBackgroundColor: 0xff5e97f6,
    genericActiveForegroundColor: 0xfffafafa,
});

export const PixelLight = makePreset('PixelLight', false, {
    backgroundColor: 0xffeeeeee,
    barColor: 0xffeeeeee,
    keyboardColor: 0xfffafafa,
    keyBackgroundColor: 0xffffffff,
    keyTextColor: 0xff212121,
    candidateTextColor: 0xff212121,
    candidateLabelColor: 0xff212121,
    candidateCommentColor: 0xff6e6e6e,
    altKeyBackgroundColor: 0xffe1e1e1,
    altKeyTextColor: 0xff6e6e6e,
    accentKeyBackgroundColor: 0xff4285f4,
    accentKeyTextColor: 0xffffffff,
    keyPressHighlightColor: 0x1f000000,
    keyShadowColor: 0xffc2c2c2,
    popupBackgroundColor: 0xffeeeeee,
    popupTextColor: 0xff212121,
    spaceBarColor: 0xffdbdbdb,
    dividerColor: 0x1f000000,
    clipboardEntryColor: 0xffffffff,
    genericActiveBackgroundColor: 0xff5e97f6,
    genericActiveForegroundColor: 0xffffffff,
});
