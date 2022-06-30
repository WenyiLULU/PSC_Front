import React, { useEffect, useState } from "react";
import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StandardButton from "../components/StandardButton";
import EditUser from "../modals/EditUser";
import EditPassword from "../modals/EditPassword";
import SearchAvail from "../modals/SearchAvail";
import { Center, Checkbox, Image } from "@mantine/core";
import ImageDropzone from "../modals/ImageDropzone";
import TitleBar from "../components/TitleBar";
import { Pencil } from "tabler-icons-react";

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

  const { username, email, country, city, image, owner, sitter, description } = user;
  
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
                <StandardButton setModalOpen={setDropModalOpen} >
                  <Pencil size={20} /> Photo
                </StandardButton>
                <StandardButton setModalOpen={setEditModalOpen}>
                  <Pencil size={20} /> Profile
                </StandardButton>
                <StandardButton setModalOpen={setPasswordModalOpen}>
                  <Pencil size={20} /> Password
                </StandardButton>
              </>
            }
          />
          <Center 
            sx={()=>({
              
              '@media (max-width: 400px)': {
                display:"flex",
                flexDirection:"column"
              }
            })}
          >

            <Image
              fit="contain"
              height={300}
              width={300}
              radius="lg"
              src={image}
              alt="user"
            />

            <div style={{margin:"30px"}}>
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
              <div >
              <Checkbox
                label="Pets owner"
                checked={owner}
                style={{marginTop:"10px"}}
              />
              <Checkbox
                label="Pets sitter"
                checked={sitter}
                style={{
                  marginTop:"10px"
                }}
              />
              </div>
              <p>
                <strong>About Me : </strong>
                {description}
              </p>
            
            </div>
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
            
          </Center>
          
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
