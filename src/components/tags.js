import React, { useState } from "react";

const Tags = ({ books, onAuthor }) => {
  const [authorData, setAuthorData] = useState("");
  const groupAuthor = books.reduce((result, book) => {
    const author = book.author;
    const authorIndex = result.findIndex((item) => item.author === author);
    if (authorIndex === -1) {
      result.push({ author, books: [book] });
    } else {
      result[authorIndex].books.push(book);
    }
    return result;
  }, []);

  const handleAuthor = (e) => {
    const author = e.target.value;
    onAuthor(author);
  };

  return (
    <div className="grid grid-cols-4 gap-4 mt-3">
      <div>Choose an author tag?</div>
      <select
        className="rounded  border-solid border border-gray-400 bg-gray-200 p-2 pt-1 pb-2 text-xs font-medium"
        defaultValue=""
        onChange={handleAuthor}
      >
        <option value=""></option>
        {groupAuthor.map((author, index) => (
          <option key={index} value={author.author}>
            {author.author}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Tags;
