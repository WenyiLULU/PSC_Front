import { useForm } from "@mantine/form";
import { Group, Button, Modal, TextInput, Checkbox, Textarea} from "@mantine/core";
import { SessionContext } from "../context/SessionContext"
import { useContext } from "react";
import { useEffect } from "react";

function EditUser({ editModalOpen, setEditModalOpen, user, setUser }) {
    const { apiPutWithToken, apiWithToken } = useContext(SessionContext)
    
    const form = useForm({
        initialValues: {
        username: "",
        //email: email,
        country: "",
        city:"",
        image:"",
        owner:false,
        sitter:false,  
        description:"", 
        experience:""
        },

    });

    useEffect(()=>{
        if(user?.username){
            const { username, country, city, image, owner, sitter, description, experience} = user
            form.setValues({username,
                country,
                city,
                image,
                owner,
                sitter,  
                description, 
                experience})
        }
    }, [user])

    const updateUser = async newUserInfo => {
        try {
        const response = await apiPutWithToken(`user/${user._id}`, newUserInfo)
        const newUser = await apiWithToken(`user/${user._id}`)
        setUser(newUser)
        if (response.status === 'KO') {
            throw new Error(response.message)
        }

        } catch (error) {
        form.setErrors({ username: error.message })
        }
    }

    const handleSubmit = (values) => {
        console.log(values)
        updateUser(values)        
        setEditModalOpen(false)
    }
   
    return (
        <Modal opened={editModalOpen} onClose={() => setEditModalOpen(false)} title='EditUser'>
            <form onSubmit={form.onSubmit(handleSubmit)} enctype="multipart/form-data">
                <TextInput
                    label="Username"
                    {...form.getInputProps("username")} 
                />

                <TextInput
                    label="Country"
                    {...form.getInputProps("country")}
                />

                <TextInput
                    label="City" 
                    {...form.getInputProps("city")}
                />
                <Checkbox
                    label="I'm a pets owner"
                    color="lime"
                    {...form.getInputProps("owner")}
                />
                <Checkbox
                    label="I want to be a sitter of pets"
                    color="lime"
                    {...form.getInputProps("sitter")}
                />
                <Textarea
                    label="About you"
                    {...form.getInputProps("description")}
                />
                <Textarea
                    label="Experience of take care pets"                
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