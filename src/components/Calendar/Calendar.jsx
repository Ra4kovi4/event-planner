import PropTypes from 'prop-types';

import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

import { useTranslation } from 'react-i18next';
import css from './Calendar.module.css';

const formatWeekdayName = day => format(day, 'EEE');

export const DatePicker = ({
    startDate,
    onSelect,
    onClose,
    onSave,
    setFieldValue,
}) => {
    const classNames = {
        caption: css.caption,
        caption_label: css.month,
        nav: css.nav,
        nav_button: css.navBtn,
        nav_icon: css.navIcon,
        table: css.table,
        head: css.head,
        head_cell: css.dayOfWeek,
        row: css.row,
        cell: css.cell,
        day: css.calendarDay,
        day_today: css.today,
        day_selected: css.selected,
    };
    const { t } = useTranslation();
    return (
        <div>
            <DayPicker
                selected={startDate}
                mode="single"
                onSelect={onSelect}
                classNames={classNames}
                formatters={{ formatWeekdayName }}
            />

            <div className={css.actions}>
                <button
                    type="button"
                    className={css.cancelBtn}
                    onClick={() => onClose()}
                >
                    {t('cancel')}
                </button>
                <button
                    type="button"
                    className={css.selectBtn}
                    onClick={() => onSave(setFieldValue)}
                >
                    {t('choose date')}
                </button>
            </div>
        </div>
    );
};

DatePicker.propTypes = {
    startDate: PropTypes.instanceOf(Date),
    onSelect: PropTypes.func,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
    setFieldValue: PropTypes.func,
};
