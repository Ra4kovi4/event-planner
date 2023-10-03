import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import css from './Pagination.module.css';
export const Pagination = ({ pageCount, forcePage, onChange }) => {
    return (
        pageCount > 1 && (
            <div className={css.paginationWrapper}>
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    previousClassName={css.prevItem}
                    previousLinkClassName={css.arrowLink}
                    nextLinkClassName={css.arrowLink}
                    nextClassName={css.prevItem}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={window.innerWidth >= 768 ? 2 : 1}
                    pageRangeDisplayed={window.innerWidth >= 768 ? 5 : 1}
                    onPageChange={onChange}
                    containerClassName={css.pagination}
                    activeClassName={css.active}
                    forcePage={forcePage <= pageCount ? forcePage - 1 : 0}
                    pageLinkClassName={css.pageLink}
                    pageClassName={css.pageItem}
                    renderOnZeroPageCount={null}
                />
            </div>
        )
    );
};
Pagination.propTypes = {
    onChange: PropTypes.func.isRequired,
    pageCount: PropTypes.number.isRequired,
    forcePage: PropTypes.number.isRequired,
};
