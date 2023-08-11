import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import styled from "styled-components";

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
    
`;

const MenuIcon = styled.div`
    cursor: pointer;
`;

const DropdownContent = styled(motion.div)`
    width: 90px;
    position: absolute;
    top: 40px;
    right: 0;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: right;
`;

const DropdownItem = styled.div`
    margin-bottom: 10px; 
    &:last-child {
        margin-bottom: 0;
    }
`;

const HamburgerBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <DropdownContainer>
            <MenuIcon onClick={handleToggleDropdown} whileTap={{ scale: 0.9 }}>
                <FontAwesomeIcon icon={faBars} size="lg" />
            </MenuIcon>
            {isDropdownOpen && (
                <DropdownContent
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                >
                    <DropdownItem>
                        <FontAwesomeIcon icon={faCog} size="lg" />
                        <span> 정보수정</span>
                    </DropdownItem>
                    <DropdownItem>
                        <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                        <span> 로그아웃</span>
                    </DropdownItem>
                </DropdownContent>
            )}
        </DropdownContainer>
    );
};

export default HamburgerBar;
