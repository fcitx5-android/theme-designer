import {
    KeyAppearance,
    KeyAppearanceAltText,
    KeyAppearanceImage,
    KeyAppearanceText,
    KeyAppearanceType,
    KeyAppearanceVariant,
    KeyImageResource,
    KeyTextTypeface,
    KeyViewId
} from './types/KeyDef';

function SymbolKey(
    symbol: string,
    percentWidth: number = 10,
    variant: KeyAppearanceVariant = KeyAppearanceVariant.Normal,
    textSize: number = 23,
    typeface: KeyTextTypeface = KeyTextTypeface.Normal,
    forceBordered: boolean = false,
    viewId: KeyViewId = KeyViewId.NoId
): KeyAppearanceText {
    return {
        // base
        type: KeyAppearanceType.Text,
        percentWidth,
        variant,
        forceBordered,
        viewId,
        // text
        displayText: symbol,
        textSize,
        typeface,
    };
}

function AlphabetKey(
    character: string,
    punctuation: string,
    variant: KeyAppearanceVariant = KeyAppearanceVariant.Normal
): KeyAppearanceAltText {
    return {
        // base
        type: KeyAppearanceType.AltText,
        percentWidth: 10,
        variant,
        forceBordered: false,
        viewId: KeyViewId.NoId,
        // text
        displayText: character,
        textSize: 23,
        typeface: KeyTextTypeface.Normal,
        // alt text
        altText: punctuation
    };
}

function ImageKey(
    src: KeyImageResource,
    viewId: KeyViewId = KeyViewId.NoId,
    variant: KeyAppearanceVariant = KeyAppearanceVariant.Alternative,
    percentWidth: number = 15,
    forceBordered: boolean = false
): KeyAppearanceImage {
    return {
        // base
        type: KeyAppearanceType.Image,
        percentWidth,
        variant,
        forceBordered,
        viewId,
        // img
        src
    }
}

export const TextKeyboard: KeyAppearance[][] = [
    [
        AlphabetKey('Q', '1'),
        AlphabetKey('W', '2'),
        AlphabetKey('E', '3'),
        AlphabetKey('R', '4'),
        AlphabetKey('T', '5'),
        AlphabetKey('Y', '6'),
        AlphabetKey('U', '7'),
        AlphabetKey('I', '8'),
        AlphabetKey('O', '9'),
        AlphabetKey('P', '0')
    ],
    [
        AlphabetKey('A', '@'),
        AlphabetKey('S', '`'),
        AlphabetKey('D', '$'),
        AlphabetKey('F', '_'),
        AlphabetKey('G', '&'),
        AlphabetKey('H', '/'),
        AlphabetKey('J', ';'),
        AlphabetKey('K', '('),
        AlphabetKey('L', ')')
    ],
    [
        ImageKey(KeyImageResource.CapsLock, KeyViewId.CapsLock),
        AlphabetKey('Z', `'`),
        AlphabetKey('X', ':'),
        AlphabetKey('C', '"'),
        AlphabetKey('V', '?'),
        AlphabetKey('B', '!'),
        AlphabetKey('N', '~'),
        AlphabetKey('M', '\\'),
        ImageKey(KeyImageResource.Backspace, KeyViewId.Backspace)
    ],
    [
        SymbolKey('?123', 15, KeyAppearanceVariant.Alternative, 16, KeyTextTypeface.Bold),
        ImageKey(KeyImageResource.QuickPhrase, KeyViewId.QuickPhrase, KeyAppearanceVariant.Alternative, 10),
        ImageKey(KeyImageResource.LangSwitch, KeyViewId.LangSwitch, KeyAppearanceVariant.Normal, 10),
        SymbolKey('拼音', 40, KeyAppearanceVariant.Normal, 13, KeyTextTypeface.Normal, true, KeyViewId.Space),
        AlphabetKey(',', '.', KeyAppearanceVariant.Alternative),
        ImageKey(KeyImageResource.Return, KeyViewId.Return, KeyAppearanceVariant.Accent, 15, true)
    ]
]
