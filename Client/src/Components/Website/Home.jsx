import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Home() {


  const [books, setBooks] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.collectapi.com/book/newBook', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'apikey 0juiNB6yHcrbc0HqNQgTr6:6ePXwrkwGepLW5L1afQAQ1'
          }
        });

        const data = await response.json();
        setBooks(data.result)
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  // function handleFavorite() {

  //   axios.post('http://localhost:5000/createTask', task).then((res) => {

  //   }).catch((err) => {
  //     console.log(err);
  //   })
  //   setTask({
  //     UserID: user.id,
  //     title: "",
  //     description: "",
  //     priority: "",
  //     date: "",
  //     done: false,
  //   });

  // }



  return (
    <>
      <div className="h-full w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-4/5">
          <h1 className="text-grey-darkest font-bold text-4xl text-center text-blue-600">Books</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {books.map((book) => (
              <>
                <div
                  key={book.id}
                  className="bg-white rounded-xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transform duration-500 cursor-pointer"
                >
                <div className="">
                  <img className="" src={book.image} alt={book.title} />
                </div>
                  <div className="p-4">
                    <span className="bg-red-500 py-2 px-4 text-sm font-semibold text-white rounded-full cursor-pointer">
                      -30% Sale
                    </span>
                    <h1 className="mt-4 text-3xl font-bold hover:underline cursor-pointer">
                      {book.title}
                    </h1>
                    <p className="mt-2 font-sans text-gray-700">by {book.author}</p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
