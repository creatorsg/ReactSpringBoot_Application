export const EMPTY_FORM = {
  title: '',
  author: '',
  isbn: '',
  price: '',
  publishDate: '',
  language: '',
  pageCount: '',
  publisher: '',
  edition: '',
  coverImageUrl: '',
  description: '',
}

function toNumberOrNull(value) {
  if (!value || !String(value).trim()) return null
  return Number(value)
}

export function toRequest(form) {
  return {
    title: form.title.trim(),
    author: form.author.trim(),
    isbn: form.isbn.trim(),
    price: toNumberOrNull(form.price),
    publishDate: form.publishDate || null,
    bookDetail: {
      description: form.description.trim(),
      language: form.language.trim(),
      pageCount: toNumberOrNull(form.pageCount),
      publisher: form.publisher.trim(),
      coverImageUrl: form.coverImageUrl.trim(),
      edition: form.edition.trim(),
    },
  }
}

export function toFormValues(book) {
  const { title, author, isbn, price, publishDate, bookDetail } = book
  return {
    title,
    author,
    isbn,
    price: price ?? '',
    publishDate: publishDate ?? '',
    description: bookDetail?.description ?? '',
    language: bookDetail?.language ?? '',
    pageCount: bookDetail?.pageCount ?? '',
    publisher: bookDetail?.publisher ?? '',
    coverImageUrl: bookDetail?.coverImageUrl ?? '',
    edition: bookDetail?.edition ?? '',
  }
}