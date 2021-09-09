import React, { useState } from 'react'
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap'

const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState("")
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push(`/`)
        }
    }

    return (
        <Form onSubmit={submitHandler} className='d-flex mx-4' style={{width: "40%", outline: "none" }}>
        <InputGroup >
            <FormControl type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='Search Products...'/>
            <Button type='submit' variant='outline-success' className='p-2'><i className="fas fa-search"></i></Button>
        </InputGroup>
        </Form>
    )
}

export default SearchBox
