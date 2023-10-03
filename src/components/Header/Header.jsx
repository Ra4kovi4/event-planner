import { SearchForm } from '../SearchForm/SearchForm';
import { NavLink } from 'react-router-dom';
import { ChangeLanguageForm } from '../ChangeLanguageForm/ChangeLanguageForm';
import { useTranslation } from 'react-i18next';
import css from './Header.module.css';

export const Header = () => {
    const { t } = useTranslation();

    return (
        <>
            <header className={css.header}>
                <NavLink className={css.title} to="?page=1">
                    {t('title')}
                </NavLink>
                <div className={css.search}>
                    <SearchForm />
                </div>
                <div className={css.lang}>
                    <ChangeLanguageForm />
                </div>
            </header>
        </>
    );
};
