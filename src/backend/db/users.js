import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio:'ad balika bio',
    url:'adbalikaurl.com',
    img:'https://picsum.photos/200/200'
  },
  {
    _id: uuid(),
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    password: "johndoe123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio:'john doe bio',
    url:'johndoeurl.com',
    img:'https://picsum.photos/200/200'
  },
  {
    _id: uuid(),
    firstName: "a",
    lastName: "b",
    username: "a",
    password: "b",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio:'a b bio',
    url:'aburl.com',
    img:'https://picsum.photos/200/200'
  },
];
