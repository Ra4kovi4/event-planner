import { useTranslation } from 'react-i18next';
import css from './NotFound.module.css';

export const NotFound = () => {
    const { t } = useTranslation();
    return (
        <div className={css.infoContainer}>
            <div className={css.infoWrap}>
                <p className={css.infoText}>{t('not-found')}</p>
                <img
                    src="https://i.ibb.co/Jy6FNKy/2023-10-02-23-09-59-removebg-preview.png"
                    className={css.infoImg}
                    aria-label="not found any events"
                />
            </div>
        </div>
    );
};
