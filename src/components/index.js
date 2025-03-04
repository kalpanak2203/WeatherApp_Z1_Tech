import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to="/dashboard" >
                        Home
                    </NavLink>
                    <NavLink to="/details" activeStyle>
                        Details
                    </NavLink>
                </NavMenu>
                <NavBtn>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;
