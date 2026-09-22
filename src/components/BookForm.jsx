import MessageBox from "./MessageBox"

function BookForm({ form, isEditing, message, onChange, onSubmit, onCancel, containerRef }) {
  return (
    <div ref={containerRef} className={isEditing ? 'form-container editing' : 'form-container'}>
      <h2>도서 등록</h2>
      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">제목:</label>
            <input type="text" id="title" name="title" value={form.title} onChange={onChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="author">저자:</label>
            <input type="text" id="author" name="author" value={form.author} onChange={onChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="isbn">ISBN:</label>
            <input type="text" id="isbn" name="isbn" value={form.isbn} onChange={onChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="price">가격:</label>
            <input type="number" id="price" name="price" value={form.price} onChange={onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="publishDate">출판일:</label>
            <input type="date" id="publishDate" name="publishDate" value={form.publishDate} onChange={onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="language">언어:</label>
            <input type="text" id="language" name="language" value={form.language} onChange={onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="pageCount">페이지 수:</label>
            <input type="number" id="pageCount" name="pageCount" value={form.pageCount} onChange={onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="publisher">출판사:</label>
            <input type="text" id="publisher" name="publisher" value={form.publisher} onChange={onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="edition">에디션:</label>
            <input type="text" id="edition" name="edition" value={form.edition} onChange={onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="coverImageUrl">표지 이미지 URL:</label>
            <input type="url" id="coverImageUrl" name="coverImageUrl" value={form.coverImageUrl} onChange={onChange} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">설명:</label>
          <textarea id="description" name="description" rows={4} value={form.description} onChange={onChange} />
        </div>

        <div className="button-group">
          <button type="submit">{isEditing ? '도서 수정' : '도서 등록'}</button>
          {isEditing && (
            <button type="button" className="cancel-btn" onClick={onCancel}>취소</button>
          )}
          <MessageBox message={message} />
        </div>
      </form>
    </div>
  )
}

export default BookForm