import React, { useState } from "react";
import styles from "../../styles/Admin.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Image from "next/image";

export default function index({ burgerData, ordersData }) {
  const status = ["preparing", "on the way", "delivered"];
  const [orders, setOrders] = useState(ordersData);
  const [isLoading, setIsLoading] = useState(false);

  const handleStage = async (id) => {
    const item = ordersData.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      setIsLoading(true);
      const res = await axios.put(`http://localhost:3000/api/orders/${id}`, {
        status: currentStatus + 1,
      });
      setOrders([res.data, ...orders.filter((order) => order._id !== id)]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.products}>
          <Heading mb="24px" as="h2" size="xl">
            Products
          </Heading>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Price</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {burgerData.map((burger) => {
                return (
                  <Tr key={burger._id}>
                    <Td>
                      <Image
                        src={burger.img}
                        alt=""
                        width={80}
                        height={80}
                        objectFit="cover"
                      />
                    </Td>
                    <Td>{burger._id}</Td>
                    <Td>{burger.title}</Td>
                    <Td isNumeric>{burger.price}</Td>
                    <Td>
                      <Stack spacing={4} direction="row" align="center">
                        <Button colorScheme="blue" size="sm">
                          Edit
                        </Button>
                        <Button colorScheme="red" size="sm">
                          Delete
                        </Button>
                      </Stack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </div>

        <div className={styles.orders}>
          <Heading mb="24px" as="h2" size="xl">
            Orders
          </Heading>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Customer</Th>
                <Th>Total</Th>
                <Th>Payment</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            {orders.reverse().map((order) => {
              return (
                <Tbody key={order._id}>
                  <Tr>
                    <Td>{order._id}</Td>
                    <Td>{order.customer}</Td>
                    <Td>${order.total.toFixed(2)}</Td>
                    <Td>{order.method === 0 ? "cash" : "paid"}</Td>
                    <Td>{status[order.status]}</Td>
                    <Td>
                      <Button
                        isLoading={isLoading}
                        rightIcon={<ArrowForwardIcon />}
                        colorScheme="teal"
                        variant="outline"
                        size="xs"
                        onClick={() => handleStage(order._id)}
                      >
                        Next Stage
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              );
            })}
          </Table>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/products");
  const response = await axios.get("http://localhost:3000/api/orders");
  return {
    props: {
      burgerData: res.data,
      ordersData: response.data,
    },
  };
};
