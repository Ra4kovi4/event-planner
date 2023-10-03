import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowIcon } from '../../assets/arrow.svg';
import { EventContext } from '../EventProvider/EventProvider';
import { useEventContext } from '../../helpers';
import css from './ChangeLanguageForm.module.css';

export const ChangeLanguageForm = () => {
    const { i18n } = useTranslation();
    const [isLangActive, setIsLangActive] = useState(false);
    const { lang, changeLang } = useEventContext(EventContext);

    const handleLangClick = () => {
        setIsLangActive(!isLangActive);

        if (isLangActive) {
            setIsLangActive(false);
        }
    };

    const changeLanguage = e => {
        const lng = e.target.textContent;
        changeLang(lng);
        i18n.changeLanguage(lng);
    };

    return (
        <>
            <div onClick={handleLangClick} className={css.select}>
                <span>{lang}</span>
                <ArrowIcon />
                {isLangActive && (
                    <ul className={css.selectContainer}>
                        <li onClick={changeLanguage} className={css.selectItem}>
                            EN
                        </li>
                        <li onClick={changeLanguage} className={css.selectItem}>
                            ES
                        </li>
                    </ul>
                )}
            </div>
        </>
    );
};
