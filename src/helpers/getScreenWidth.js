export const getPickerWidth = screen => {
    if (screen === 'desk') return 372;
    if (screen === 'tablet') return 308;
    if (screen === 'mobile') return 240;
    return 240;
};
