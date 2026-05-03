"use client";
import React, { useCallback } from "react";

type PaginationProps = {
    itemLength?: number;
    itemPerPage?: number;
    setPage?: (num: number) => void;
    currentPage: number;
};

export default function Pagination({
    itemLength = 200,
    itemPerPage = 10,
    setPage = () => {},
    currentPage,
}: PaginationProps) {
    const totalPages = Math.ceil(itemLength / itemPerPage);

    const handlePageClick = useCallback(
        (page: number) => {
            if (page > 0 && page <= totalPages && page !== currentPage) {
                setPage(page);
            }
        },
        [totalPages, currentPage, setPage]
    );

    const handlePreviousClick = useCallback(() => {
        handlePageClick(currentPage - 1);
    }, [handlePageClick, currentPage]);

    const handleNextClick = useCallback(() => {
        handlePageClick(currentPage + 1);
    }, [handlePageClick, currentPage]);

    const handleFirstPageClick = useCallback(() => {
        handlePageClick(1);
    }, [handlePageClick]);

    const handleLastPageClick = useCallback(() => {
        handlePageClick(totalPages);
    }, [handlePageClick, totalPages]);

    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: number[] = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4);
            } else if (currentPage >= totalPages - 2) {
                pages.push(
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages
                );
            } else {
                pages.push(currentPage - 1, currentPage, currentPage + 1);
            }
        }
        return pages.filter((p) => p > 0 && p <= totalPages);
    };

    const pageNumbers = getPageNumbers();

    return (
        <ul className="wg-pagination">
            {/* Previous button */}
            <li onClick={handlePreviousClick}>
                <a className="nav-item">
                    <i className="icon-CaretLeft" />
                </a>
            </li>
            {/* First page and leading ellipsis */}
            {totalPages > 5 && currentPage > 3 && (
                <>
                    <li>
                        <a
                            className={`nav-item ${
                                currentPage === 1 ? "active" : ""
                            }`}
                            onClick={handleFirstPageClick}
                        >
                            1
                        </a>
                    </li>
                    {currentPage > 4 && (
                        <li>
                            <a className="nav-item">...</a>
                        </li>
                    )}
                </>
            )}
            {/* Page numbers */}
            {pageNumbers.map((page) => (
                <li key={page}>
                    <a
                        className={`nav-item ${
                            currentPage === page ? "active" : ""
                        }`}
                        onClick={() => handlePageClick(page)}
                    >
                        {page}
                    </a>
                </li>
            ))}
            {/* Trailing ellipsis and last page */}
            {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                    {currentPage < totalPages - 3 && (
                        <li>
                            <a className="nav-item">...</a>
                        </li>
                    )}
                    <li>
                        <a
                            className={`nav-item ${
                                currentPage === totalPages ? "active" : ""
                            }`}
                            onClick={handleLastPageClick}
                        >
                            {totalPages}
                        </a>
                    </li>
                </>
            )}
            {/* Next button */}
            <li onClick={handleNextClick}>
                <a className="nav-item">
                    <i className="icon-CaretRight" />
                </a>
            </li>
        </ul>
    );
}
