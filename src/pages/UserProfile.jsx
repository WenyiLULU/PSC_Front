import React, { useEffect, useState } from "react";
import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StandardButton from "../components/StandardButton";
import EditUser from "../modals/EditUser";
import EditPassword from "../modals/EditPassword";
import SearchAvail from "../modals/SearchAvail";
import { Button, Container, Image } from "@mantine/core";
import ImageDropzone from "../modals/ImageDropzone";
import UploadImage from "../modals/UploadImage";
import TitleBar from "../components/TitleBar";

function UserProfile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const { apiWithToken } = useContext(SessionContext);
  const { userId } = useParams();
  const fetchUser = async () => {
    try {
      const userInfo = await apiWithToken(`user/${userId}`);
      setUser(userInfo);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      navigate("*");
    }
  };

  useEffect(() => {
    userId ? fetchUser() : navigate("/notauth");
  }, [userId]);

  const { username, email, country, city, image } = user;

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [dropModalOpen, setDropModalOpen] = useState(false);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <>
          <TitleBar
            title={`Hello ${username}!`}
            options={
              <>
                <StandardButton setModalOpen={setEditModalOpen}>
                  Edit profile
                </StandardButton>
                <StandardButton setModalOpen={setPasswordModalOpen}>
                  Edit password
                </StandardButton>
              </>
            }
          />
          <p>
            <strong>Email : </strong>
            {email}
          </p>
          <p>
            <strong>Country : </strong>
            {country}
          </p>
          <p>
            <strong>City : </strong>
            {city}
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", width: "400px" }}
          ></div>
          <Container>
            <Image
              fit="cover"
              height={500}
              width={300}
              radius="lg"
              src={image}
              alt="user"
            />
            <StandardButton setModalOpen={setDropModalOpen}>
              Change photo
            </StandardButton>
          </Container>

          <EditUser
            editModalOpen={editModalOpen}
            setEditModalOpen={setEditModalOpen}
            user={user}
            setUser={setUser}
          />
          <EditPassword
            passwordModalOpen={passwordModalOpen}
            setPasswordModalOpen={setPasswordModalOpen}
            user={user}
            setUser={setUser}
          />
          {/* <SearchAvail
            searchModalOpen={searchModalOpen}
            setSearchModalOpen={setSearchModalOpen}
            user={user}
          /> */}
          <ImageDropzone
            dropModalOpen={dropModalOpen}
            setDropModalOpen={setDropModalOpen}
            user={user}
            setUser={setUser}
          />
        </>
      )}
    </>
  );
}

export default UserProfile;
