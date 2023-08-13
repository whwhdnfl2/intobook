import { useRecoilState } from "recoil";
import { BluetoothWrapper, ContentsContainer, StyledBox } from "../../styles/home/StyledBox";
import { BasicButton } from "../common/BasicButton";
import Bluetooth from "./Bluetooth";
import { BluetoothAtom } from "../../recoil/bookmark/bookmarkAtom";


const ConnectComponent = () => {
    const [bluetoothStatus, setBluetoothStatus] = useRecoilState(BluetoothAtom);

    let contentText = "";

    if (bluetoothStatus) {
    contentText = "블루투스 연결중"
    } else {
    contentText = "블루투스 미연결:)";
    }

    return ( 
        <StyledBox>
            <BluetoothWrapper >
                <Bluetooth />
            </BluetoothWrapper>
            <ContentsContainer>
                {<p>{contentText}</p>}
                <BasicButton content={"책갈피 튜토리얼"} />
            </ContentsContainer>
        </StyledBox>
    );
}

export default ConnectComponent;