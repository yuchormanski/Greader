# Greader

Angular June 2023 - Custom project

- ENDPOINTS
  base URL : http://localhost:3030/
  login/POST: /users/login {email, password}
  register/POST: /users/register {email, password}
  logout/GET : /users/logout

  get all/GET: /data/books
  get all sorted/GET: /data/books?sortBy=\_createdOn%20desc
  get all sorted/GET: /data/books?sortBy=\_createdOn%20desc&distinct=category

  post new book/POST: /data/books { title, category, maxLevel, imageUrl, summary}

  get for edit book/GET: /data/books/:id
  edit book/PUT: /data/books/:id { title, category, maxLevel, imageUrl, summary}

  delete book/DELETE: /data/books/:id

  get comments/GET: /data/comments?where=bookId%3D%22{bookId}%22
  post comment?POST: /data/comments {bookId, comment}
