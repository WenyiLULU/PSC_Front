import { useForm } from "@mantine/form";
import { Group, Button, Modal, TextInput, Checkbox, Textarea} from "@mantine/core";
import { SessionContext } from "../context/SessionContext"
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

function UploadImage({ dropModalOpen, setDropModalOpen, user, setUser }) {
    const { apiPostWithToken, apiWithToken } = useContext(SessionContext)    
    const [fileInput, setFileInput] = useState()
    const [fileSelected, setFileSelected] = useState(false)
    
    const updateUser = async newUserInfo => {
        try {
        const response = await apiPostWithToken(`user/${user._id}/image`, newUserInfo)
        const newUser = await apiWithToken(`user/${user._id}`)
        setUser(newUser)
        if (response.status === 'KO') {
            throw new Error(response.message)
        }

        } catch (error) {
        //form.setErrors({ username: error.message })
        console.log(error)
        }
    }

    const handleChange =(e)=>{
        const file = e.target.value
        console.log(file)
        setFileInput(file)
        setFileSelected(true)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!fileSelected) return;
        console.log(fileInput)
        updateUser(fileInput)
        setDropModalOpen(false)
    }
   
    return (
        <Modal opened={dropModalOpen} onClose={() => setDropModalOpen(false)} title='EditUser'>
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
                <input 
                    type="file" 
                    name="userPhoto" 
                    accept=".jpg, .png"
                    onChange={handleChange}
                    value={fileInput}
                    />
                <Group position="right" mt="md">
                    <Button type="submit">Save</Button>
                </Group>
            </form>
            
        </Modal>
    );
    }


export default UploadImage