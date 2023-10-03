import { useMedia } from 'react-use';
import { Link } from 'react-router-dom';
import { ReactComponent as AddIcon } from '../../assets/plus.svg';
import css from './NavBar.module.css';
import { CategoryFilter } from './CategoryFilter/CategoryFilter';
import { SortFilter } from './SortFilter/SortFilter';
import { Title } from '../Title/Title';
import { useTranslation } from 'react-i18next';

export const NavBar = () => {
    const mobile = useMedia('(max-width: 767px)', { defaultState: false });
    const { t } = useTranslation();
    return (
        <>
            <div className={css.navWrap}>
                <div className={css.navMenu}>
                    <CategoryFilter />
                    <SortFilter />
                    <div className={css.addButtonWrap}>
                        <Link to="/add" className={css.addButton}>
                            <AddIcon aria-label="add event" />
                            <span className={css.addButtonText}>
                                {t('add-event-btn')}
                            </span>
                        </Link>
                    </div>
                </div>

                {!mobile && <Title>{t('my-events')}</Title>}
            </div>
        </>
    );
};
