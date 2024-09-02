import React, { useState } from 'react'
import axios from 'axios'

const Create = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            axios.post('http://localhost:4000/', { name, price })
                .then(response => {
                    if (response.status === 200) {
                        alert('Success')
                    }
                })
            setName('')
            setPrice('')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" 
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <button type="submit">Create</button>
        </form>
    )
}

export default Create