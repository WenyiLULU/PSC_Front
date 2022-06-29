import { Group, Text, useMantineTheme, MantineTheme, Modal } from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus, MIME_TYPES } from '@mantine/dropzone';
import { useForm } from "@mantine/form";
import { SessionContext } from "../context/SessionContext"
import { useContext, useState } from "react";
import { useEffect } from 'react';

const ImageDropzone = ({dropModalOpen, setDropModalOpen, user, setUser})=>{
  const { apiPostWithToken, apiWithToken } = useContext(SessionContext)
  const [accepted, setAccepted] = useState(false)
  const [selected, setSelected] = useState(false)
 
  const getIconColor= ()=>{
    return selected ? "blue" : "gray"
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
  
  const dropzoneChildren = (status) => (
    <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
      <ImageUploadIcon status={status} style={{ color: getIconColor()}} size={80} />
  
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
   
  const handlerOnDrop = async formData => {
    try {
      const response = await apiPostWithToken(`user/${user._id}/image`, formData)
      const newUser = await apiWithToken(`user/${user._id}`)
      setUser(newUser)
      if (response.status === 'KO') {
          throw new Error(response.message)
      }
    } catch (error) {
    console.log("error:", error)
    }
}

  useEffect(()=>{
    //console.log(accepted)
    accepted && setDropModalOpen(false)
  }, [accepted])

  useEffect(()=>{
    //console.log(accepted)
    dropModalOpen && setAccepted(false)
  }, [dropModalOpen])

  return (
    <Modal opened={dropModalOpen} onClose={() => setDropModalOpen(false)} title='EditUser'>
        <Dropzone
            
            onDrop={(files) => {
              console.log('accepted files', files)
              setAccepted(true)
              const formData = new FormData()
              formData.append('userPhoto', files[0] )
              handlerOnDrop(formData)
            }}
            onReject={(files) => {
              console.log('rejected files', files)
              setAccepted(false)
            }}
            maxSize={3 * 1024 ** 2}
            accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
          >
            {(status) => {
            
              return dropzoneChildren(status)}}
        </Dropzone>
      
    </Modal>
    
  );
}

export default ImageDropzone