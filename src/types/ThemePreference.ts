export enum PunctuationPosition {
    Bottom,
    TopRight
}

export interface ThemePreference {
    border: boolean;
    horizontalMargin: number;
    verticalMargin: number;
    radius: number;
    puncPosition: PunctuationPosition;
}

export enum ThemePreferenceType {
    Boolean,
    Enum,
    Number
}

export const ThemePreferenceTypes: Record<string, ThemePreferenceType> = {
    border: ThemePreferenceType.Boolean,
    horizontalMargin: ThemePreferenceType.Number,
    verticalMargin: ThemePreferenceType.Number,
    radius: ThemePreferenceType.Number,
    puncPosition: ThemePreferenceType.Enum
};
