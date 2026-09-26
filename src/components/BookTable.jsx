function formatPrice(price) {
  if (price == null) return '-'
  return `₩${price.toLocaleString()}`
}

function BookTable({ books, loading, error, onEdit, onDelete, onDetail }) {
  return (
    <div className="table-container">
      <h2>도서 목록</h2>
      {loading && <div className="loading">로딩 중...</div>}

      <table id="bookTable">
        <thead>
          <tr>
            <th>제목</th>
            <th>저자</th>
            <th>ISBN</th>
            <th>가격</th>
            <th>출판일</th>
            <th>출판사</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {error && (
            <tr>
              <td colSpan={7} className="error-row">{error}</td>
            </tr>
          )}

          {!error && books.length === 0 && (
            <tr>
              <td colSpan={7} className="empty-row">등록된 도서가 없습니다.</td>
            </tr>
          )}

          {!error && books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{formatPrice(book.price)}</td>
              <td>{book.publishDate ?? '-'}</td>
              <td>{book.bookDetail?.publisher ?? '-'}</td>
              <td>
                <button type="button" className="edit-btn" onClick={() => onEdit(book.id)}>수정</button>
                <button type="button" className="delete-btn" onClick={() => onDelete(book.id)}>삭제</button>
                <button type="button" className="detail-btn" onClick={() => onDetail(book.id)}>상세</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookTable