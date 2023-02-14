import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";

const CreateRoomModal = ({ isOpen, onOpen, onClose }) => {
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8000/api/hotels`
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      maxPeople: "",
      desc: "",
      chooseHotel: "",
      rooms: [],
    },

    // validationSchema: Yup.object({
    //   username: Yup.string()
    //     .max(15, "Must be 15 characters or less")
    //     .required("Required"),
    //   email: Yup.string().email("Invalid email address").required("Required"),
    //   password: Yup.string()
    //     .required("No password provided.")
    //     .min(8, "Password is too short - should be 8 chars minimum."),
    // }),

    onSubmit: async (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      // let a =
      //   values.rooms.length > 0
      //     ? console.log("values.rooms.length", values.rooms.split(" "))
      //     : console.log("values.length", values.rooms);

      // try {
      //   await axios
      //     .post("http://localhost:8000/api/hotels", values)
      //     .then((res) => {
      //       console.log(res, "resssssssssssssssss");
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      //   // navigate("/login");
      // } catch (error) {
      //   console.log(error, "error");
      // }
    },
  });

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>Create New Room</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Title</FormLabel>
              <Input
                id="title"
                name="title"
                type="text"
                variant="flushed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                id="price"
                name="price"
                type="number"
                variant="flushed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Max People</FormLabel>
              <Input
                id="maxPeople"
                name="maxPeople"
                type="number"
                variant="flushed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.maxPeople}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                id="desc"
                name="desc"
                type="text"
                variant="flushed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.desc}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Choose a Hotel</FormLabel>
              <Select
                id="chooseHotel"
                name="chooseHotel"
                type="text"
                variant="flushed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.chooseHotel}
                placeholder="Select option"
              >
                {loading
                  ? "loading"
                  : data &&
                    data?.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>
                        {hotel.name}
                      </option>
                    ))}
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Rooms</FormLabel>
              <Textarea
                id="rooms"
                name="rooms"
                type="text"
                // variant="flushed"
                onChange={(e, selected) => {
                  // console.log("selected", selected);
                  formik.setFieldValue("rooms", e.target.value);
                }}
                onBlur={formik.handleBlur}
                // value={formik.values.rooms}
                value={formik.values.rooms}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateRoomModal;
