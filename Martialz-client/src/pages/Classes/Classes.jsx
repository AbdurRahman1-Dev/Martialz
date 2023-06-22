import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Container from "../../Layout/Container";
import Title from "../../components/shared/Title";
import ClassCard from "./ClassCard";

const Classes = ({title, slice}) => {
  const [allClasses, setClasses] = useState([]);

  useEffect(()=> {
    axios.get(`${import.meta.env.VITE_URL}/classes`)
    .then(function (response) {
      // handle success
      setClasses(response.data)
    })
    .catch(function (error) {
      // handle error
      toast.error(error);
    })
  },[])


  return (
    <div className="mt-24">
    <Container>
    <Title title={title}></Title>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-32">
    {
      allClasses?.slice(0, slice)?.map(classes => <ClassCard key={classes._id}  classes={classes} ></ClassCard>)
    }
  </div>
    </Container>
  </div>
  );
};

export default Classes;