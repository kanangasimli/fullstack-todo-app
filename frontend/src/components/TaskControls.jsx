function TaskControls({
                          search,
                          onSearchChange,
                          completedFilter,
                          onCompletedFilterChange,
                          sortBy,
                          onSortByChange,
                          sortDir,
                          onSortDirChange,
                          isLoading,
                      }) {
    return (
        <div className="controls-wrapper">
            <div className="controls">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    {isLoading && <span className="search-loading">Searching...</span>}
                </div>

                <select
                    value={completedFilter}
                    onChange={(e) => onCompletedFilterChange(e.target.value)}
                    disabled={isLoading}
                >
                    <option value="">All Tasks</option>
                    <option value="true">Completed</option>
                    <option value="false">Incomplete</option>
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => onSortByChange(e.target.value)}
                    disabled={isLoading}
                >
                    <option value="createdAt">Created At</option>
                    <option value="title">Title</option>
                </select>

                <select
                    value={sortDir}
                    onChange={(e) => onSortDirChange(e.target.value)}
                    disabled={isLoading}
                >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>
        </div>
    );
}

export default TaskControls;