import React from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_EMOTION = gql`
  mutation addEmotion($type: String!, $id: String) {
    addEmotion(type: $type, id: $id) {
      id
      type
    }
  }
`;

const CustomMutaion = ({ data: { type, id } }) => {
  const [addEmotion, { data }] = useMutation(ADD_EMOTION);

  addEmotion({
    variables: { type: type, id: id },
  });

  console.log(data);

  return <div />;
};

export default CustomMutaion;
