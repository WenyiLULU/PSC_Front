import { useForm } from "@mantine/form";
import { Group, Button, Modal, PasswordInput} from "@mantine/core";
import { SessionContext } from "../context/SessionContext"
import { useContext } from "react";
import { useState } from "react";

function EditPassword({ passwordModalOpen, setPasswordModalOpen, user }) {
    const { apiPutWithToken } = useContext(SessionContext)
    const {_id} = user
    const [success, setSuccess] = useState(false)

    const form = useForm({
        initialValues: {
        currentPassword:"",
        newPassword:"",
        confirmPassword:""
        },
        validate: {
            confirmPassword: (value, values) =>
              value !== values.newPassword ? "Passwords did not match" : null,
          },
    });

    const updatePassword = async newPassword => {
        try {
        const response = await apiPutWithToken(`user/${_id}/password`, newPassword)
        setSuccess(true)
        if (response.status === 'KO') {
            throw new Error(response.message)
        }

        } catch (error) {
            const errorStatus = error.response.status
            const message = error.response.data.message
            setSuccess(false)
            if(errorStatus === 403) {form.setErrors({currentPassword: message})}
            else{console.log("error", error)}  
        }
    }

    
    const handleSubmit = (values) => {
        updatePassword(values)        
        if(success){setPasswordModalOpen(false)}
    }

    return (
        <Modal opened={passwordModalOpen} onClose={() => setPasswordModalOpen(false)} title='Edit Password'>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <PasswordInput
                label="Current Password"
                placeholder="Current Password"
                {...form.getInputProps("currentPassword")}
                />

                <PasswordInput
                label="New Password"
                placeholder="New Password"
                {...form.getInputProps("newPassword")}
                />

                <PasswordInput
                mt="sm"
                label="Confirm password"
                placeholder="Confirm password"
                {...form.getInputProps("confirmPassword")}
                />
                <Group position="right" mt="md">
                    <Button type="submit">Save</Button>
                </Group>
 
            </form>
        </Modal>
    );
    }


export default EditPassword