import React from "react";
import styled, { keyframes } from "styled-components";
import { whale, whaleOff, whaleWhere } from "../../assets/img/home";

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
n`;

const floatingAnimation = keyframes`
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    `;

// const CharacterWrapper = styled.div`
//     width: 100px;
//     height: 100px;
//     border-radius: 50%;
//     background: #CBBDF4;
//     position: relative;
//     animation: ${moveAnimation} 3s infinite;
//     box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
// `;

const CharacterWrapper = styled.div`
    width: 300px;
    height: 140px;
    border-radius: 10%;
    background-image: url(${whale});
    background-size: cover;
    background-position: center center;
    position: relative;
    animation: ${moveAnimation} 3s infinite;
`;

const CharacterOffWrapper = styled.div`
    width: 310px;
    height: 140px;
    border-radius: 10%;
    background-image: url(${whaleOff});
    background-size: cover;
    background-position: center center;
    position: relative;
    animation: ${moveAnimation} 3s infinite;
`;

const CharacterWhereWrapper = styled.div`
    width: 310px;
    height: 140px;
    border-radius: 10%;
    background-image: url(${whaleWhere});
    background-size: cover;
    background-position: center center;
    position: relative;
    animation: ${moveAnimation} 3s infinite;
`;

// const Eye = styled.div`
//     width: 6px;
//     height: 6px;
//     border-radius: 50%;
//     background-color: black;
//     position: absolute;
//     top: 50%;
//     left: ${(props) => (props.position === "left" ? "20%" : "20%")};
//     transform: translateX(-50%);
//     animation: ${blinkAnimation} 3s infinite;
// `;

// const OffEye = styled.div`
//     width: 6px;
//     height: 6px;
//     border-radius: 50%;
//     background-color: black;
//     position: absolute;
//     top: 35%;
//     left: ${(props) => (props.position === "left" ? "28%" : "50%")};
//     transform: translateX(-50%);
//     animation: ${blinkAnimation} 6s infinite;
// `;

// const Mouth = styled.div`
//     width: 20px;
//     height: 20px;
//     border: 2px solid black;
//     border-bottom-left-radius: 20px;
//     border-bottom-right-radius: 20px;
//     position: absolute;
//     bottom: 30%;
//     left: 42%;
//     transform: translateX(-50%);
// `;

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
font-size: 8px;
color: white;
position: absolute;
top: 60%;
left: 25%;
transform: translateX(-50%);
animation: ${floatingAnimation} 2s infinite alternate;
`;

const OnText = styled.div`
font-size: 25px;
position: absolute;
top: 22%;
left: 25%;
transform: translateX(-50%);
animation: ${floatingAnimation} 2s infinite alternate;
`;

const OffText = styled.div`
font-size: 22px;
position: absolute;
top: 22%;
left: 25%;
transform: translateX(-50%);
animation: ${floatingAnimation} 2s infinite alternate;
`;

const BookmarkCharacter = ({ bluetoothStatus, bookmarkStatus }) => {
    return (
        // 조건에 따라 컴포넌트 렌더링
        bluetoothStatus === true ? (
            bookmarkStatus === true ? (
                <CharacterWrapper>
                    {/* <Eye position="left" />
                    <Eye position="right" />
                    <Mouth /> */}
                    <OnText>♥</OnText>
                </CharacterWrapper>
            ) : (
                <CharacterOffWrapper>
                    {/* <OffEye position="left" />
                    <OffEye position="right" />
                    <LineMouth /> */}
                    <OffText>zzz</OffText>
                </CharacterOffWrapper>
            )
        ) : (
            <CharacterWrapper>
                {/* <Eye position="left" />
                <Eye position="right" /> */}
                {/* <CircleMouth /> */}
            </CharacterWrapper>
        )
    );
};


export default BookmarkCharacter;
