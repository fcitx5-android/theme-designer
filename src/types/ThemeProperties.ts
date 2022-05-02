export interface RawThemeProperties {
    name: string;
    // TODO: theme background image
    backgroundImage?: unknown;
    backgroundColor: number;
    barColor: number;
    keyboardColor: number;
    keyBackgroundColor: number;
    keyTextColor: number;
    altKeyBackgroundColor: number;
    altKeyTextColor: number;
    accentKeyBackgroundColor: number;
    accentKeyTextColor: number;
    keyPressHighlightColor: number;
    keyShadowColor: number;
    spaceBarColor: number;
    dividerColor: number;
    clipboardEntryColor: number;
    isDark: boolean;
}

export interface ThemeProperties {
    name: string;
    backgroundImage?: unknown;
    backgroundColor: string;
    barColor: string;
    keyboardColor: string;
    keyBackgroundColor: string;
    keyTextColor: string;
    altKeyBackgroundColor: string;
    altKeyTextColor: string;
    accentKeyBackgroundColor: string;
    accentKeyTextColor: string;
    keyPressHighlightColor: string;
    keyShadowColor: string;
    spaceBarColor: string;
    dividerColor: string;
    clipboardEntryColor: string;
    isDark: boolean;
}

export enum ThemePropertyType {
    Unknown,
    UUID,
    Color,
    Boolean
}

export const ThemePropertiesTypes: Record<string, ThemePropertyType> = {
    name: ThemePropertyType.UUID,
    backgroundImage: ThemePropertyType.Unknown,
    backgroundColor: ThemePropertyType.Color,
    barColor: ThemePropertyType.Color,
    keyboardColor: ThemePropertyType.Color,
    keyBackgroundColor: ThemePropertyType.Color,
    keyTextColor: ThemePropertyType.Color,
    altKeyBackgroundColor: ThemePropertyType.Color,
    altKeyTextColor: ThemePropertyType.Color,
    accentKeyBackgroundColor: ThemePropertyType.Color,
    accentKeyTextColor: ThemePropertyType.Color,
    keyPressHighlightColor: ThemePropertyType.Color,
    keyShadowColor: ThemePropertyType.Color,
    spaceBarColor: ThemePropertyType.Color,
    dividerColor: ThemePropertyType.Color,
    clipboardEntryColor: ThemePropertyType.Color,
    isDark: ThemePropertyType.Boolean
}

const buffer = new ArrayBuffer(4);
const view = new DataView(buffer);

export function uint2int32(colorInt: number): number {
    view.setUint32(0, colorInt);
    return view.getInt32(0);
}

export function int32torgba(colorInt: number): string {
    view.setInt32(0, colorInt);
    const rgba = [
        view.getUint8(1),
        view.getUint8(2),
        view.getUint8(3),
        view.getUint8(0)
    ].map(i => i.toString(16).padStart(2, '0')).join('');
    return `#${rgba}`;
}

export function rgba2int32(rgba: string): number {
    const argb = rgba.substring(7, 9) + rgba.substring(1, 7);
    const uint32 = Number.parseInt(argb, 16);
    view.setUint32(0, uint32);
    return view.getInt32(0);
}

export function normalizeThemeProperties(raw: RawThemeProperties) {
    return Object.fromEntries(
        Object.entries(raw).map(([k, v]) => [k, typeof v === 'number' ? int32torgba(v) : v])
    ) as ThemeProperties;
}

export function isHexColor(val: any) {
    if (typeof val !== 'string') return false;
    return /^#[0-9a-fA-F]{8}/.test(val);
}

export function serializeThemeProperties(theme: ThemeProperties) {
    const raw = Object.fromEntries(
        Object.entries(theme).map(([k, v]) => [k, isHexColor(v) ? rgba2int32(v) : v])
    ) as RawThemeProperties;
    if (!Object.hasOwn(raw, 'backgroundImage')) {
        // @ts-ignore
        raw.backgroundImage = null;
        // raw.backgroundImage = {
        //     croppedFilePath: '/dummy',
        //     srcFilePath: '/dummy',
        //     brightness: 42,
        //     cropRect: {
        //         top: 0,
        //         right: 42,
        //         bottom: 42,
        //         left: 0
        //     }
        // };
    };
    return raw;
}
