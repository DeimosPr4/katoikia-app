import{Box, ScrollView} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { API } from "../environment/api";
import { CommentCard } from "./CommentCard";

export default function Home() {
  const { user } = useContext(UserContext)
  const [isRequesting, setIsRequesting] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {

    const onRequestCommentsData = async () => {
      setIsRequesting(true);

      try {
        const jsonResponse = await fetch(`${API.BASE_URL}/post/allComments`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const response = await jsonResponse.json();

        setComments(response.message);

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
              comment={item.comment}
              date={item.date_entry}
            />
          ))
        }

      </ScrollView>
    </Box>
  )
}
