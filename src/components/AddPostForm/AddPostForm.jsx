import React, { useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react'

export default function UploadProfilePicForm(props){
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
            <Grid.Column style={{ maxWidth: 450 }}>
                 <Segment>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <Form.Input
                            className="form-group"
                            type="file"
                            name="photo"
                            label="ADD A PHOTO TO HAVE REVIEWED"
                            placeholder="upload image"
                            onChange={handleFileInput}
                        />
                        {/* FOR A LATER VERSION OF THIS APP */}
                        {/* <Form.Input
                            className="form-group"
                            name="caption"
                            // value={state.caption}
                            // placeholder="Upload your best photos!"
                            onChange={handleChange}
                        /> */}
                        <Button
                            type="submit"
                            className="btn"
                        >
                            Add Photo
                        </Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}