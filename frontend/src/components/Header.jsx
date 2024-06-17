import { useState } from "react";
import Container from "./UIComponents/Container";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import Button from "./UIComponents/Button";
import LogoutBtn from "./LogoutBtn";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "Login  ",
      url: "/login",
      active: !user,
    },
    {
      name: "Register",
      url: "/register",
      active: !user,
    },
    {
      name: "Add customer",
      url: "/add-customer",
      active: user,
    },
    {
      name: "Add record",
      url: "/add-record",
      active: user,
    },
  ];
  return (
    <header className="py-3 shadow bg-slate-600">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="mx-2">
                  <Button
                    onClick={() => navigate(item.url)}
                    bgColor="hover:bg-blue-100"
                    textColor="text-white hover:text-black"
                    className="inline-block px-6 py-2 duration-200 rounded-full"
                  >
                    {item.name}
                  </Button>
                </li>
              ) : null
            )}

            {user && <LogoutBtn />}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
