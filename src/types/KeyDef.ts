export enum KeyAppearanceVariant {
    Normal,
    AltForeground,
    Alternative,
    Accent
}

export enum KeyViewId {
    NoId,
    CapsLock,
    Backspace,
    QuickPhrase,
    LangSwitch,
    Space,
    Return,
    MiniSpace
}

export enum KeyTextTypeface {
    Normal,
    Bold,
    Italic,
    BoldItalic
}

export enum KeyImageResource {
    CapsLock,
    Backspace,
    QuickPhrase,
    LangSwitch,
    Return,
    MiniSpace
}

export const KeyImageResourceIcon = {
    [KeyImageResource.CapsLock]: 'keyboard_capslock',
    [KeyImageResource.Backspace]: 'backspace',
    [KeyImageResource.QuickPhrase]: 'format_quote',
    [KeyImageResource.LangSwitch]: 'language',
    [KeyImageResource.Return]: 'keyboard_return',
    [KeyImageResource.MiniSpace]: 'space_bar'
}

export enum KeyAppearanceType {
    Text,
    AltText,
    Image
}

export interface KeyAppearance {
    type: KeyAppearanceType;
    percentWidth: number;
    variant: KeyAppearanceVariant;
    forceBordered: boolean;
    viewId: KeyViewId;
}

export interface KeyAppearanceText extends KeyAppearance {
    type: KeyAppearanceType.Text;
    displayText: string;
    textSize: number;
    typeface: KeyTextTypeface;
}

export interface KeyAppearanceAltText extends KeyAppearance {
    // text
    type: KeyAppearanceType.AltText;
    displayText: string;
    textSize: number;
    typeface: KeyTextTypeface;
    // alt text
    altText: string;
}

export interface KeyAppearanceImage extends KeyAppearance {
    type: KeyAppearanceType.Image;
    src: KeyImageResource;
}
