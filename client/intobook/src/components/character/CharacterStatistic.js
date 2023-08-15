import React from "react";
import styled, { keyframes,css } from "styled-components";

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

const shakeAnimation = keyframes`
    0%, 100% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(15px);
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
    background-color: #FFEAB4;
    position: relative;
    animation: ${({ con1 }) => (con1 ? css`${floatingAnimation} 1s infinite` : css`${floatingAnimation} 3s infinite`)};
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
`;

// const Eye = styled.div`
//     width: 6px;
//     height: ${(props) => (props.position == "left" ? "6px" : "10px")};
//     border-radius: 15px ;
//     background-color: black;
//     border-radius: ${(props) => (props.position == "left" ? "none" : "0 0 50px 50px")}
//     position: absolute;
//     top: 38%;
//     left: ${(props) => (props.position === "left" ? "33%" : "63%")};
//     transform: translateX(-50%);
//     /*animation: ${blinkAnimation} 3s infinite;*/
// `;

const Eye = styled.div`
    width: ${(props) => (props.con1 ? "6px" : "9px")};
    height: ${(props) => (props.con1 ? "6px" : "9px")};
    border-radius: ${(props) => (props.con1 ? "15px" : "10px 10px 20px 20px")};
    background-color: black;
    position: absolute;
    top: 38%;
    left: ${(props) => (props.position === "left" ? "33%" : "63%")};
    transform: translateX(-50%);
    animation: ${blinkAnimation} 3s infinite;
`;

const Glasses = styled.div`
    width: 20px;
    height:20px;
    border-radius: 15px;
    border: 3px solid brown;
    position: absolute;
    top: 30%;
    left: ${(props) => (props.position === "left" ? "35%" : "65%")};
    transform: translateX(-50%);
`;

const GlassesLine = styled.div`
    width: 8px;
    height: 3px;
    position: absolute;
    background-color: brown;
    top: 39%;
    left: 45%
`

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
    border: 2px solid gray;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    position: absolute;
    bottom: 25%;
    left: 51%;
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
    font-size: 20px;
    position: absolute;
    top: 90%;
    left: 10%;
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

const Fire = styled.div`
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, transparent 64%, var(--main-red-color) 90%);
    border-radius: 50%;
    position: absolute;
    top: 0%;
    right: -10%;
    transform: translateX(-50%);
    animation: ${({ con2 }) => (con2 ? css`${floatingAnimation} 0.1s infinite` : css`${floatingAnimation} 3s infinite`)};
    `;

const CharacterStatistic = ({ con1, con2, con3 }) => {
    return (
        <>
        <CharacterWrapper con1={con1}>
            <Eye con1={con1} position="left" />
            <Eye con1={con1} position="right" />
            {con1? 
            <>
            <Glasses con1={con1} position="left" />
            <GlassesLine con1={con1}/>
            <Glasses con1={con1} position="right" />
            </>
            :
            null}
            <Mouth />
            {con3?<OnText>📕❤</OnText>:<OnText>📚📙📚</OnText>}
            <Fire con2={con2} /> 
        </CharacterWrapper>
            </>
    );
};

export default CharacterStatistic;
