function Pagination({
                        currentPage,
                        totalPages,
                        lastPage,
                        onPrevPage,
                        onNextPage,
                        isLoading,
                    }) {
    return (
        <div className="pagination">
            <button onClick={onPrevPage} disabled={currentPage === 0 || isLoading}>
                Previous
            </button>

            <span className="page-info">
        Page {totalPages === 0 ? 0 : currentPage + 1} of {Math.max(totalPages, 1)}
      </span>

            <button onClick={onNextPage} disabled={lastPage || isLoading}>
                Next
            </button>
        </div>
    );
}

export default Pagination;