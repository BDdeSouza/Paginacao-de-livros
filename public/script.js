document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    const limit = 10;
    let totalPages;
  
    const fetchBooks = async (page) => {
      const response = await fetch(`/api/books?page=${page}&limit=${limit}`);
      const data = await response.json();
      return data;
    };
  
    const renderBooks = (books) => {
      const bookList = document.getElementById('book-list');
      bookList.innerHTML = '';
      books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn?Number(book.isbn).toFixed(0):''}</td>
          <td>${book.pages}</td>
          <td>${book.year}</td>
          <td>${book.price}</td>
        `;
        bookList.appendChild(row);
      });
    };
  
    const renderPageNumbers = (totalBooks) => {
      totalPages = Math.ceil(totalBooks / limit);
      const pageNumbers = document.getElementById('page-numbers');
      pageNumbers.innerHTML = '';
  
      const createButton = (pageNumber, text = pageNumber) => {
        const button = document.createElement('button');
        button.innerText = text;
        if (pageNumber === currentPage) {
          button.classList.add('active');
        }
        button.addEventListener('click', () => {
          currentPage = pageNumber;
          updatePage(pageNumber);
        });
        return button;
      };
  
      if (totalPages > 1) {
        pageNumbers.appendChild(createButton(1, '<<'));
        if (currentPage > 1) {
          pageNumbers.appendChild(createButton(currentPage - 1, '<'));
        }
  
        const startPage = Math.max(1, currentPage - 3);
        const endPage = Math.min(totalPages, currentPage + 3);
  
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.appendChild(createButton(i));
        }
  
        if (currentPage < totalPages) {
          pageNumbers.appendChild(createButton(currentPage + 1, '>'));
        }
        pageNumbers.appendChild(createButton(totalPages, '>>'));
      }
    };
  
    const updatePaginationInfo = (totalBooks, page, limit) => {
      const start = (page - 1) * limit + 1;
      const end = Math.min(page * limit, totalBooks);
      const paginationInfo = document.getElementById('pagination-info');
      paginationInfo.innerText = `Exibindo de ${start} até ${end} de ${totalBooks} livros`;
    };
  
    const updatePage = async (page) => {
      const data = await fetchBooks(page);
      renderBooks(data.books);
      renderPageNumbers(data.totalBooks);
      updatePaginationInfo(data.totalBooks, page, data.limit);
      updatePaginationButtons();
    };
  
    const updatePaginationButtons = () => {
      const pageNumberButtons = document.querySelectorAll('#page-numbers button');
      pageNumberButtons.forEach(button => {
        const pageNumber = parseInt(button.innerText);
        if (pageNumber === currentPage) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    };
  
    updatePage(currentPage);
  });
  