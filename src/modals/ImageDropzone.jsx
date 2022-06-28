import { Group, Text, useMantineTheme, MantineTheme, Modal } from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from "@mantine/form";
import { SessionContext } from "../context/SessionContext"
import { useContext } from "react";

const ImageDropzone = ({dropModalOpen, setDropModalOpen, user, setUser})=>{
  const { apiPutWithToken, apiWithToken } = useContext(SessionContext)
  const theme = useMantineTheme();

  function getIconColor(status, theme) {
    return status.accepted
      ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
      : status.rejected
      ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
      : theme.colorScheme === 'dark'
      ? theme.colors.dark[0]
      : theme.colors.gray[7];
  }
  
  function ImageUploadIcon({
    status,
    ...props
  }) {
    if (status.accepted) {
      return <Upload {...props} />;
    }
  
    if (status.rejected) {
      return <X {...props} />;
    }
  
    return <Photo {...props} />;
  }
  
  const dropzoneChildren = (status, theme) => (
    <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
      <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />
  
      <div>
        <Text size="xl" inline>
          Drag images here or click to select files
        </Text>
        <Text size="sm" color="dimmed" inline mt={7}>
          Attach as many files as you like, each file should not exceed 5mb
        </Text>
      </div>
    </Group>
  );
  
  
  const handlerOnDrop = async file => {
    try {
      const response = await apiPutWithToken(`user/${user._id}`, file)
      const newUser = await apiWithToken(`user/${user._id}`)
      setUser(newUser)
      if (response.status === 'KO') {
          throw new Error(response.message)
      }
    } catch (error) {
    console.log("error:", error)
    }
}

  return (
    <Modal opened={dropModalOpen} onClose={() => setDropModalOpen(false)} title='EditUser'>
      {/*<form onSubmit={form.onSubmit(handleSubmit)} enctype="multipart/form-data">*/}
        <Dropzone
            
            onDrop={(files) => {
              console.log('accepted files', files[0])
              const newUser = {...user}
              newUser.file = {userPhoto:files[0]}
              /*const formData = new FormData()
              formData.append('file', this.files[0], 'userPhoto')*/
              handlerOnDrop(newUser)
            }}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
          >
            {(status) => dropzoneChildren(status, theme)}
        </Dropzone>
      {/*</form>*/}
      
    </Modal>
    
  );
}

export default ImageDropzone