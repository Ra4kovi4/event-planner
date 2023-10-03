import { useMedia } from 'react-use';

//calculate the number of cards on the page depending on the screen size

export const useLimitPage = () => {
    const mobileScreen = useMedia('(max-width: 767px)', {
        defaultState: false,
    });
    const tabletScreen = useMedia(
        '(min-width: 768px) and (max-width: 1439px)',
        {
            defaultState: false,
        }
    );
    const deskScreen = useMedia('(min-width: 1440px)', { defaultState: true });
    let limitPage = 8;

    if (deskScreen) {
        limitPage = 8;
    } else if (tabletScreen) {
        limitPage = 6;
    } else if (mobileScreen) {
        limitPage = 4;
    }
    return limitPage;
};
