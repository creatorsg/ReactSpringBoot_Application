function formatPrice(price) {
  if (price == null) return '-'
  return `₩${price.toLocaleString()}`
}

function BookDetail({ book, onClose }) {
  if (!book) return null

  const { title, author, isbn, price, publishDate, bookDetail } = book

  return (
    <div className="book-detail-overlay">
      <div className="book-detail">
        <button type="button" className="close-btn" onClick={onClose}>닫기</button>
        <h2>{title}</h2>
        <p>저자: {author}</p>
        <p>ISBN: {isbn}</p>
        <p>가격: {formatPrice(price)}</p>
        <p>출판일: {publishDate ?? '-'}</p>

        {bookDetail && (
          <>
            <p>설명: {bookDetail.description || '-'}</p>
            <p>언어: {bookDetail.language || '-'}</p>
            <p>페이지 수: {bookDetail.pageCount ?? '-'}</p>
            <p>출판사: {bookDetail.publisher || '-'}</p>
            <p>에디션: {bookDetail.edition || '-'}</p>
            {bookDetail.coverImageUrl && (
              <img src={bookDetail.coverImageUrl} alt={`${title} 표지`} />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default BookDetail