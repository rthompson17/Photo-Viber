import React, { useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react'

export default function UploadPicForm(props){
    const [selectedFile, setSelectedFile] = useState('')
    const [state, setState] = useState({
        caption: ''
    })


    function handleFileInput(e){
        setSelectedFile(e.target.files[0])
    }

    function handleChange(e){
        setState({
        ...state,
        [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()

        const formData = new FormData()
        formData.append('photo', selectedFile)
        formData.append('caption', state.caption)
        props.handleAddPost(formData);

    }

    return (

        <Grid textAlign='center' style={{ height: '25vh' }} verticalAlign='middle'>
            <Gric.Column style={{ maxWidth: 450 }}>
                <Segment>

                    <Form autoComplete="on" onSubmit={handleSubmit}>

                        <Form.Input
                            className="form-control"
                            name="caption"
                            value={state.caption}
                            placeholder="Write your photo caption here"
                            onChange={handleChange}
                            required
                            />
                        <Form.Input
                            className="form-control"
                            type="file"
                            name="photo"
                            pllaceholder="upload image"
                            onChange={handleFileInput}
                        />
                        <Button
                            type="submit"
                            className="btn"
                        >
                            Add Profile Pic
                        </Button>
                    </Form>
                </Segment>
            </Gric.Column>
        </Grid>
    )
}