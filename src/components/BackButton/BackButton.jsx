import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ReactComponent as BackIcon } from '../../assets/back.svg';

import css from './BackButton.module.css';

export const BackButton = ({ onBack }) => {
    const { t } = useTranslation();
    return (
        <div className={css.button_container}>
            <button className={css.back_link} onClick={onBack}>
                <BackIcon className={css.backBtn} aria-label="back icon" />
                <span>{t('back')}</span>
            </button>
        </div>
    );
};

BackButton.propTypes = {
    onBack: PropTypes.func.isRequired,
};
