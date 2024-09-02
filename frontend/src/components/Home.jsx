import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchData()
  }, []) // [] to only run once on component mount

  const fetchData = () => {
    // Both working perfectly fine
    
    axios.post(`http://localhost:4000/all-products`, { page: page, limit: 5 })
      .then(response => {
        setProducts([...products, ...response.data])
        console.log(response.data)
        setHasMore(response.data.length > 0)
        setPage(page + 1)
      })
      .catch(error => console.log(error))


    // axios.get(`http://localhost:4000?page=${page}&limit=5`)
    //   .then(response => {
    //     setProducts([...products, ...response.data])
    //     console.log(response.data)
    //     setHasMore(response.data.length > 0)
    //     setPage(page + 1)
    //   })
    //   .catch(error => console.log(error))
  }

  const fetchMoreData = () => {
    fetchData()
  }

  return (
    <div>
      <h1>All Products</h1>

      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<div className="loader">Loading...</div>}
      >
        {
          products.map((product) => (
            <div key={product._id} className='product'>{product.name}</div> // Replace with your product rendering logic
          ))
        }
      </InfiniteScroll>
    </div>
  )
}

export default Home