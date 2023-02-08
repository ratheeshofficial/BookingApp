import { Avatar, Button, Text, WrapItem } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  console.log("user", user);

  const name = user ? user.username : "";
  const capitalize = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Booking</span>
        {user ? (
          <>
            <WrapItem>
              <Avatar
                size="sm"
                name="Dan Abrahmov"
                src="https://bit.ly/ryan-florence"
              />
              <Text ml="2" mt="1">
                {capitalize}
              </Text>
            </WrapItem>
          </>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
