import { useForm } from "@mantine/form";
import { Group, Button, Modal, TextInput, Checkbox, Textarea} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../context/SessionContext"
import { useContext } from "react";

function EditUser({ editModalOpen, setEditModalOpen, user, setUser }) {
    const { apiPutWithToken, apiWithToken } = useContext(SessionContext)
    const {_id, username, email, country, city, image, owner, sitter, description, experience} = user

    const form = useForm({
        initialValues: {
        username: username,
        //email: email,
        country: country,
        city:city,
        image:image,
        owner:owner,
        sitter:sitter,  
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
        const newUser = await apiWithToken(`user/${_id}`)
        setUser(newUser)
        if (response.status === 'KO') {
            throw new Error(response.message)
        }

        } catch (error) {
        form.setErrors({ username: error.message })
        }
    }

    
    const handleSubmit = (values) => {
        updateUser(values)        
        setEditModalOpen(false)
    }

    return (
        <Modal opened={editModalOpen} onClose={() => setEditModalOpen(false)} title='EditUser'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                label="Username"
                placeholder={username}
                value={username}
                {...form.getInputProps("username")}
            />

            {/*<TextInput 
                label="Email"
                placeholder={email}
                value={email}
                {...form.getInputProps("email")}
            />*/}

            <TextInput
                label="Country"
                placeholder={country}
                value={country}
                {...form.getInputProps("country")}
            />

            <TextInput
                label="City"
                placeholder={city}
                value={city}
                {...form.getInputProps("city")}
            />
            <Checkbox
                label="I'm a pets owner"
                color="lime"
                checked={owner}
                {...form.getInputProps("owner")}
             />
             <Checkbox
                label="I want to be a sitter of pets"
                checked={sitter}
                color="lime"
                {...form.getInputProps("sitter")}
             />
            <Textarea
                label="About you"
                placeholder={description}
                {...form.getInputProps("description")}
            />
            <Textarea
                label="Experience of take care pets"
                placeholder={experience}
                {...form.getInputProps("experience")}
            />
            

            <Group position="right" mt="md">
            <Button type="submit">Save</Button>
            </Group>
        </form>
        </Modal>
    );
    }


export default EditUser