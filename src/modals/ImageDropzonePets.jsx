import {
  Group,
  Text,
  useMantineTheme,
  MantineTheme,
  Modal,
} from "@mantine/core";
import { Upload, Photo, X, Icon as TablerIcon } from "tabler-icons-react";
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";

const ImageDropzone = ({ dropModalOpen, setDropModalOpen, pet, setPet }) => {
  const { apiPostWithToken, apiWithToken } = useContext(SessionContext);
  const theme = useMantineTheme();

  function ImageUploadIcon({ status, ...props }) {
    if (status.accepted) {
      return <Upload {...props} />;
    }

    if (status.rejected) {
      return <X {...props} />;
    }

    return <Photo {...props} />;
  }

  const dropzoneChildren = (status) => (
    <Group
      position="center"
      spacing="xl"
      style={{ minHeight: 220, pointerEvents: "none" }}
    >
      <ImageUploadIcon status={status} style={{ color: "blue" }} size={80} />

      <div>
        <Text size="xl" align="center" inline>
          Drag images here or click to select files
        </Text>
        <Text size="sm" align="center" color="dimmed" inline mt={7}>
          Attach as many files as you like, each file should not exceed 5mb
        </Text>
      </div>
    </Group>
  );

  const handlerOnDrop = async (formData) => {
    try {
      const response = await apiPostWithToken(`pet/${pet._id}/img`, formData);
      const newPet = await apiWithToken(`pet/${pet._id}`);
      setPet(newPet);
      if (response.status === "KO") {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <Modal
      opened={dropModalOpen}
      onClose={() => setDropModalOpen(false)}
      title="EditUser"
    >
      <Dropzone
        // loading
        onDrop={(files) => {
          console.log("accepted files", files);
          //const newUser = {...user}
          //newUser.file = {userPhoto:files[0]}
          const formData = new FormData();
          formData.append("petPhoto", files[0]);
          console.log(files);
          handlerOnDrop(formData);
        }}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        {(status) => {
          console.log("status", status);
          return dropzoneChildren(status, theme);
        }}
      </Dropzone>
      {/*</form>*/}
    </Modal>
  );
};

export default ImageDropzone;
