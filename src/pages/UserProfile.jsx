import React, { useEffect, useState } from "react";
import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StandardButton from "../components/StandardButton";
import EditUser from "../modals/EditUser";
import EditPassword from "../modals/EditPassword";
import SearchAvail from "../modals/SearchAvail";
import { SimpleGrid, Checkbox, Image, Center } from "@mantine/core";
import ImageDropzone from "../modals/ImageDropzone";
import TitleBar from "../components/TitleBar";
import { Pencil, SquareCheck, Square } from "tabler-icons-react";

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

  const { username, email, country, city, image, owner, sitter, description, experience } = user;
  
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  //const [searchModalOpen, setSearchModalOpen] = useState(false);
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
          <SimpleGrid
            breakpoints={[
              { maxWidth: 3000, cols: 2, spacing: "md" },
              { maxWidth: 800, cols: 1, spacing: "sm" },
            ]}
          >
            <Center style={{padding:"20px"}}>
              <Image
                fit="cover"
                
                radius="lg"
                src={image}
                alt="user"
                sx={()=>({
                  width:"80%",
                  '@media (max-width: 1300px)': {
                    width:"100%",
                  }
                })}
              />
            </Center>
            
            <div style={{margin:"20px 30px"}}>
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
              <div style={{display:"flex", alignItems:"center"}}>
                {owner ? <SquareCheck color={'#95b1db'} size={30}/> : <Square color={'#95b1db'} size={30}/> } 
                 Pets owner
              </div>
                
              <div style={{display:"flex", alignItems:"center"}}>
                {sitter ? <SquareCheck color={'#95b1db'} size={30}/> : <Square color={'#95b1db'} size={30}/> } 
                 Pets Sitter
              </div>
              
              </div>
              <p>
                <strong>About Me : </strong>
                {description}
              </p>
              <p>
                <strong>My experience : </strong>
                {experience}
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
          </SimpleGrid>
          
          
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
