import{Box, ScrollView} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { API } from "../environment/api";
import { CommentCard } from "./CommentCard";

export default function Home() {
  const { user } = useContext(UserContext)
  const [isRequesting, setIsRequesting] = useState(false);
  const [comments, setComments] = useState([]);
  const user_type=user.user_type;
  //const user_type="4";
  const community_id=user.community_id;
  //const community_id="1";
  useEffect(() => {

    console.log(user);

    const onRequestCommentsData = async () => {
      setIsRequesting(true);

      try {
        if(user_type=="4"){
          const jsonResponse = await fetch(`${API.BASE_URL}/post/findPostCommunity/`+`${community_id}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const response = await jsonResponse.json();
          setComments(response.message);

        }else{
          const jsonResponse = await fetch(`${API.BASE_URL}/post/allPosts`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            }
          })
  
          const response = await jsonResponse.json();
          setComments(response.message);
        }

      } catch (error) {

      }

      setIsRequesting(false)
    }

    onRequestCommentsData()

  }, [user])


  return (

    <Box alignItems="center">

      <ScrollView width='100%' h='550' ml='1' _contentContainerStyle={{
        px: "20px",
        mb: "4",
        minW: "72"
      }}>

        {
          comments.map(item => (
            <CommentCard
              key={item._id}
              post={item.post}
              //date={date}
            />
          ))
        }

      </ScrollView>
    </Box>
  )
}
