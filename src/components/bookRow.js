import React from "react";
import Image from "next/image";

const BookRow = ({ book }) => {
  return (
    <>
      <div className="col-span-1">
        <Image
          src={"https://covers.openlibrary.org/b/olid/" + book.key + "-M.jpg"}
          alt={book.title}
          width="100"
          height="100"
          className="fillWidthImage rounded-md"
          priority
        />
      </div>

      <div className="col-span-7 font-bold text-sm">{book.title}</div>

      <div className="col-span-3 text-sm">{book.author}</div>
      <div className="col-span-1 text-sm">{book.publish_year}</div>

      <div className="col-span-12 border-solid border-b-gray-300 border"></div>
    </>
  );
};

export default BookRow;
