import { RawThemeProperties, ThemeProperties, uint32torgba } from "./types/ThemeProperties";

type ColorProperties = Omit<RawThemeProperties, 'name' | 'isDark' | 'backgroundImage'>;

function makePreset(name: string, isDark: boolean, properties: ColorProperties): ThemeProperties {
    const theme: Partial<ThemeProperties> = { name, isDark };
    for (const [k, v] of Object.entries(properties)) {
        // @ts-ignore
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
    altKeyBackgroundColor: 0xff373737,
    altKeyTextColor: 0xffacacac,
    accentKeyBackgroundColor: 0xff5e97f6,
    accentKeyTextColor: 0xffffffff,
    keyPressHighlightColor: 0x33ffffff,
    keyShadowColor: 0xff252525,
    spaceBarColor: 0xff4a4a4a,
    dividerColor: 0x1fffffff,
    clipboardEntryColor: 0xff464646,
});

export const PixelLight = makePreset('PixelLight', true, {
    backgroundColor: 0xffeeeeee,
    barColor: 0xffeeeeee,
    keyboardColor: 0xfffafafa,
    keyBackgroundColor: 0xffffffff,
    keyTextColor: 0xff212121,
    altKeyBackgroundColor: 0xffe1e1e1,
    altKeyTextColor: 0xff6e6e6e,
    accentKeyBackgroundColor: 0xff4285f4,
    accentKeyTextColor: 0xffffffff,
    keyPressHighlightColor: 0x1f000000,
    keyShadowColor: 0xffc2c2c2,
    spaceBarColor: 0xffdbdbdb,
    dividerColor: 0x1f000000,
    clipboardEntryColor: 0xffffffff,
});
