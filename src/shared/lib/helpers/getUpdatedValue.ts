export const getUpdatedValue = <T>(newValue: T, defaultValue: T): T | null => {
    return newValue === defaultValue ? null : newValue;
};
