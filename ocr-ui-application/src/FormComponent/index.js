import React from 'react'
import { Input } from '@mui/material';
import './form.css'

const FormComponent = () => {
    return (
        <div className='box-div'>
            <div className='border-div'>
                <Input type='file' sizeSmall></Input>
            </div>
        </div>
    )
}

export default FormComponent