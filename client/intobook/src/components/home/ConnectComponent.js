import { useState } from 'react'
import { useRecoilState } from "recoil";
import { BluetoothWrapper, ContentsContainer, StyledBox } from "../../styles/home/StyledBox";
import { BasicButton, Modal } from "../common";
import Bluetooth from "./Bluetooth";
import { BluetoothAtom } from "../../recoil/bookmark/bookmarkAtom";


const ConnectComponent = () => {
    const [bluetoothStatus, setBluetoothStatus] = useRecoilState(BluetoothAtom);
    const [openTutorialModal, setOpenTutorialModal] = useState(false);


    let contentText = "";

    if (bluetoothStatus) {
        contentText = "블루투스 연결중"
    } else {
        contentText = "블루투스 미연결:)";
    }

    const testHandle = () => {
        console.log('튜토리얼 떠라');
        setOpenTutorialModal(true)

    };

    return (
        <StyledBox>
            <BluetoothWrapper >
                <Bluetooth />
            </BluetoothWrapper>
            <ContentsContainer>
                {<p>{contentText}</p>}
                <div onClick={testHandle} >
                    <BasicButton content={"책갈피 튜토리얼"} />
                </div>
            </ContentsContainer>
            <Modal openModal={openTutorialModal} setOpenModal={setOpenTutorialModal} modalType={'tutorial'}
                closeModal={() => { setOpenTutorialModal(false) }} height={'550px'}
            />
        </StyledBox>
    );
}

export default ConnectComponent;