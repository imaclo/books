import React, { useState, useRef, useEffect } from "react";
import Loading from "../components/Loading";
import BookRow from "../components/bookRow";
import Tags from "../components/tags";
import Image from "next/image";

const Main = () => {
  /* Set the current states and refs */
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(null);
  const [searchData, setSearchData] = useState("");
  const [originalSearchData, setOriginalSearchData] = useState("");
  const [endpoint, setEndPoint] = useState("searchByTitle");
  const [author, setAuthor] = useState(null);

  const query = useRef(null);

  /* Focus to the search box */
  useEffect(() => {
    if (query.current) {
      query.current.focus();
    }
  }, []);

  /* The Search function */
  function handleSearch(event) {
    /* Allow the Enter Key */
    event.preventDefault();
    /* Dump the old results */
    setSearchData("");
    !event.target.id
      ? setEndPoint("searchByTitle")
      : setEndPoint(event.target.id);
    setLoading(true);
    fetchData();
  }

  /* Pass the query to the PHP API hosted on Lambda */
  const fetchData = async () => {
    const response = await fetch(
      "https://3f2cafx3bl2gyojfxrplc5a6sq0mlfnb.lambda-url.us-east-1.on.aws/?endpoint=" +
        endpoint +
        "&query=" +
        searchQuery
    );
    const newData = await response.json();

    setLoading(false);
    setSearchData(newData);
  };

  /* The Clear function */
  function handleClear(event) {
    setSearchQuery("");
    setSearchData("");
    query.current.focus();
  }

  /* Are we filtering by author? */
  function handleAuthor(author) {
    setAuthor(author);
    const filteredBooks = searchData.filter((book) => book.author === author);
    setOriginalSearchData(searchData);
    setSearchData(filteredBooks);
  }

  /* Remove the author filter */
  function handleResetAuthor() {
    setSearchData(originalSearchData);
    setOriginalSearchData("");
  }

  return (
    <>
      <div className="mt-4">
        <div>What book are you looking for?</div>
        <div>
          <form onSubmit={handleSearch}>
            <div className="flex justify-center mt-2">
              <div className="relative w-full">
                <input
                  type="text"
                  id="query"
                  ref={query}
                  autoFocus
                  className=" w-full outline-none p-4 pl-5 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                  placeholder="Search"
                  required
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />

                <div className="absolute inset-y-0 right-4 flex items-center pl-3 ">
                  <Image
                    src="/assets/img/close.svg"
                    alt="Close"
                    width="30"
                    height="30"
                    className="cursor-pointer"
                    onClick={handleClear}
                    priority
                  />
                </div>
              </div>
            </div>
          </form>

          {/*Search options*/}
          <div className="flex flex-row mt-3 gap-4">
            <div className="mt-3">Search by...</div>
            <div>
              <button
                id="searchByTitle"
                type="button"
                className="inline-block rounded  border-solid border border-gray-400 bg-gray-200 p-4 text-xs font-medium"
                onClick={handleSearch}
              >
                Title
              </button>
            </div>
            <div>
              <button
                id="searchByAuthor"
                type="button"
                className="inline-block rounded  border-solid border border-gray-400 bg-gray-200 p-4 text-xs font-medium"
                onClick={handleSearch}
              >
                Author
              </button>
            </div>
            <div>
              <button
                id="searchByYear"
                type="button"
                className="inline-block rounded  border-solid border border-gray-400 bg-gray-200 p-4 text-xs font-medium"
                onClick={handleSearch}
              >
                Year of Publication
              </button>
            </div>
          </div>

          {/*Search results

          {groupedAuthors && (
            <ul>
              {groupedAuthors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
                  )}
                  */}

          <div>{loading && <Loading></Loading>}</div>

          {searchData && !originalSearchData && (
            <div>
              <Tags books={searchData} onAuthor={handleAuthor}></Tags>
            </div>
          )}

          {originalSearchData && (
            <div className="mt-3">
              <button
                id="searchByYear"
                type="button"
                className="inline-block rounded  border-solid border border-gray-400 bg-gray-200 p-2 text-xs font-medium"
                onClick={handleResetAuthor}
              >
                <div className="flex">
                  <div>
                    <Image
                      src="/assets/img/close.svg"
                      alt="Close"
                      width="30"
                      height="30"
                      className="cursor-pointer"
                      onClick={handleClear}
                      priority
                    />
                  </div>
                  <div className="mt-2 ml-2 mr-2">Remove the Author filter</div>
                </div>
              </button>
            </div>
          )}

          <div className="mt-5">
            {searchData && (
              <div className="grid grid-cols-12 gap-4 w-full">
                <div className="col-span-1 font-bold ">
                  <div>Image</div>
                  <div className="text-xs font-normal">If available</div>
                </div>
                <div className="col-span-7 font-bold ">Title</div>
                <div className="col-span-3 font-bold ">Author</div>
                <div className="col-span-1 font-bold ">Year</div>

                <div className="col-span-12 border-solid border-b-gray-500 border"></div>

                {searchData.map((book, index) => (
                  <BookRow key={index} book={book}></BookRow>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
