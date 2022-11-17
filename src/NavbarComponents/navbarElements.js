import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #0021A5;
  height: 7vh;
  display: flex;
  justify-content: space-between;
  padding: 0.5vw;
  z-index: 12;
`;

export const StudyBuddy = styled.div`
display: flex;
align-items: left;
margin-right: 13vw;
font: calc(2vw + 2vh) Arial;
font-weight: bold;
-webkit-text-stroke-width: 2px;
-webkit-text-stroke-color: black;
color: #FA4616;
white-space: nowrap; */
@media screen and (max-width: 768px) {
  display: none;
}
`;


export const NavLink = styled(Link)`
  color: #ffffff;
  display: flex;
  font: 400 calc(1vw + 1vh) Arial;
  font-weight: bold;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  border = solid calc(2vw + 2vh);
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #FA4616 ;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #808080;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;