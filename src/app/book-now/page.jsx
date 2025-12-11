import React, { Suspense} from 'react';
import BookNowClient from '../../components/book-now-client/BookNowClient'

const BookNow = () => {

  

  return (
    <Suspense>
      <BookNowClient />
    </Suspense>
  )
}

export default BookNow