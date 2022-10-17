import React from "react";
import { Nav, NavLink, NavMenu, StudyBuddy }
    from "./navbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <StudyBuddy>Study Buddy</StudyBuddy>
                    <NavLink to="/Home" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/Filters" activeStyle>
                        Filters
                    </NavLink>
                    <NavLink to="/Groups" activeStyle>
                        Groups
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;