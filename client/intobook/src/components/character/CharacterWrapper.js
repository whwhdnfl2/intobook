import React from "react";
import styled, { keyframes } from "styled-components";

const blinkAnimation = keyframes`
    0%, 100% {
    transform: scaleY(1);
    }
    50% {
    transform: scaleY(0.1);
    }
`;

const moveAnimation = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
`;

const floatingAnimation = keyframes`
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    `;

const CharacterWrapper = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #708FFF;
    position: relative;
    animation: ${moveAnimation} 3s infinite;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
`;

const Eye = styled.div`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: black;
    position: absolute;
    top: 35%;
    left: ${(props) => (props.position === "left" ? "28%" : "50%")};
    transform: translateX(-50%);
    animation: ${blinkAnimation} 3s infinite;
`;

const OffEye = styled.div`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: black;
    position: absolute;
    top: 35%;
    left: ${(props) => (props.position === "left" ? "28%" : "50%")};
    transform: translateX(-50%);
    animation: ${blinkAnimation} 6s infinite;
`;

const Mouth = styled.div`
    width: 20px;
    height: 20px;
    border: 2px solid black;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    position: absolute;
    bottom: 30%;
    left: 42%;
    transform: translateX(-50%);
`;

const LineMouth = styled.div`
    width: 20px;
    border: 2px solid black;
    border-top-left-radius: 10px;
    border-top-right-radius: 20px;
    position: absolute;
    bottom: 50%;
    left: 42%;
    transform: translateX(-50%);
`;

const CircleMouth = styled.div`
    width: 20px;
    height: 20px;
    border: 2px solid black;
    border-radius: 30px;
    position: absolute;
    bottom: 33%;
    left: 42%;
    transform: translateX(-50%);
`;

const QuestionText = styled.div`
font-size: 25px;
position: absolute;
top: 10%;
left: 100%;
transform: translateX(-50%);
animation: ${floatingAnimation} 2s infinite alternate;
`;

const OnText = styled.div`
font-size: 25px;
position: absolute;
top: 0%;
left: 90%;
transform: translateX(-50%);
animation: ${floatingAnimation} 2s infinite alternate;
`;

const OffText = styled.div`
font-size: 25px;
position: absolute;
top: 0%;
left: 90%;
transform: translateX(-50%);
animation: ${floatingAnimation} 2s infinite alternate;
`;

const BookmarkCharacter = ({ bluetoothStatus, bookmarkStatus }) => {
    return (
        // 조건에 따라 컴포넌트 렌더링
        bluetoothStatus === "on" ? (
            bookmarkStatus === "on" ? (
                <CharacterWrapper>
                    <Eye position="left" />
                    <Eye position="right" />
                    <Mouth />
                    <OnText>💙</OnText>
                </CharacterWrapper>
            ) : (
                <CharacterWrapper>
                    <OffEye position="left" />
                    <OffEye position="right" />
                    <LineMouth />
                    <OffText>zzz</OffText>
                </CharacterWrapper>
            )
        ) : (
            <CharacterWrapper>
                <Eye position="left" />
                <Eye position="right" />
                <CircleMouth />
                <QuestionText>?</QuestionText>
            </CharacterWrapper>
        )
    );
};


export default BookmarkCharacter;
