import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useNavigate, Link } from 'react-router-dom';
import styled from "styled-components";
import { logout } from "../../api/logoutApi";
import { AccessToken } from "../../recoil/user/UserAtom";
import { useRecoilState } from "recoil";
import UpdateUsername from '../common/UpdateUsername';


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
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
    const navigate = useNavigate();
    const [token, setToken] = useRecoilState(AccessToken);

    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    //쿠키 삭제
    function deleteCookie(cookie_name) {
        document.cookie = cookie_name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

    // 로그아웃 동작
    const handleLogout = async () => {
        const res = await logout(); //로그아웃api 호출
        deleteCookie('accessToken'); // 쿠키에서 액세스토큰 삭제
        setToken(null); // 상태 업데이트
        navigate('/');
    }

    return (
        <DropdownContainer>
            <MenuIcon onClick={handleToggleDropdown}>
                <FontAwesomeIcon icon={faBars} size="2x" style={{ color: 'white' }} />
            </MenuIcon>
            {isDropdownOpen && (
                <DropdownContent
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                >
                    <DropdownItem onClick={handleToggleModal}> {/* 정보수정 클릭 시 모달 열기 */}
                        <FontAwesomeIcon icon={faCog} size="lg" />
                        <span> 정보수정</span>
                    </DropdownItem>
                    <DropdownItem>
                        <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                        <span onClick={handleLogout}> 로그아웃</span>
                    </DropdownItem>
                </DropdownContent>
            )}
            {isModalOpen && <UpdateUsername closeModal={handleToggleModal} />} {/* 모달 열림 상태일 때 모달 컴포넌트 렌더링 */}
        </DropdownContainer>
    );
};

export default HamburgerBar;
