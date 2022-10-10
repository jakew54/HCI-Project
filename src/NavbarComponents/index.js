import React from "react";
import { Nav, NavLink, NavMenu }
    from "./navbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/Filters" activeStyle>
                        Filters
                    </NavLink>
                    <NavLink to="/Login" activeStyle>
                        Login
                    </NavLink>
                    <NavLink to="/Groups" activeStyle>
                        Groups
                    </NavLink>
                    <NavLink to="/Class" activeStyle>
                        Class
                    </NavLink>
                    <NavLink to="/GroupSize" activeStyle>
                        GroupSize
                    </NavLink>
                    <NavLink to="/Language" activeStyle>
                        Language
                    </NavLink>
                    <NavLink to="/Major" activeStyle>
                        Major
                    </NavLink>
                    <NavLink to="/Place" activeStyle>
                        Place
                    </NavLink>
                    <NavLink to="/StudyRole" activeStyle>
                        StudyRole
                    </NavLink>
                    <NavLink to="/Time" activeStyle>
                        Time
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;