import { useForm } from "@mantine/form";
import { PasswordInput, Group, Button, Modal, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../context/SessionContext"
import { useContext } from "react";
import axios from 'axios'

function EditUser({ editModalOpen, setEditModalOpen, user }) {
    const { token, apiPutWithToken } = useContext(SessionContext)
    const navigate = useNavigate()
    const {_id, username, email, country, city, image, owner, sitter, pets, description, experience} = user

    const form = useForm({
        initialValues: {
        username: username,
        email: email,
        country: country,
        city:city,
        image:image,
        owner:owner,
        sitter:sitter, 
        pets:pets, 
        description:description, 
        experience:experience
        },

        validate: {
        email: (value) =>
        /^\S+@\S+\.\S+$/.test(value)  ? null : "Please enter a valid e-Mail",
        }
    });

    const updateUser = async newUserInfo => {
        try {
        const response = await apiPutWithToken(`user/${_id}`, newUserInfo)

        if (response.status === 'KO') {
            throw new Error(response.message)
        }

        } catch (error) {
        form.setErrors({ username: error.message })
        }
    }

    
    const handleSubmit = (values) => {
        updateUser(values)
        navigate(`/user/${_id}`)
        
    }

    return (
        <Modal opened={editModalOpen} onClose={() => setEditModalOpen(false)} title='EditUser'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                label="Username"
                placeholder={username}
                {...form.getInputProps("username")}
            />

            <TextInput 
                label="Email"
                placeholder={email}
                {...form.getInputProps("email")}
            />

            <TextInput
                label="Country"
                placeholder={country}
                {...form.getInputProps("country")}
            />

            <TextInput
                label="City"
                placeholder={city}
                {...form.getInputProps("city")}
            />

            

            <Group position="right" mt="md">
            <Button type="submit">Save</Button>
            </Group>
        </form>
        </Modal>
    );
    }


export default EditUser