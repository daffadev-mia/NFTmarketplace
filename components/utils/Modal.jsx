import { useAddress, useMetamask, useWalletConnect, useCoinbaseWallet, useDisconnect } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { IoCloseCircleOutline } from "react-icons/io5";
import styles from "../../styles/Theme.module.scss";

const Modal = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const disconnectWallet = useDisconnect();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = () => {
    onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a style={{cursor: 'pointer'}} onClick={handleCloseClick}>
            <IoCloseCircleOutline color={'black'}/>
          </a>
        </StyledModalHeader>
        <StyledModalBody>
            <StyledLoginBtn style={{backgroundColor: '#e1700b', color: 'white'}} onClick={ () => { connectWithMetamask(); handleCloseClick();}}><StyledMetamask/> Metamask</StyledLoginBtn>
            <StyledLoginBtn style={{backgroundColor: '#9e9e9ebf', color: 'white'}} onClick={ () => { connectWithWalletConnect(); handleCloseClick();}}><StyledWalletConnect/> WalletConnect</StyledLoginBtn>
            <StyledLoginBtn style={{backgroundColor: '#011793', color: 'white'}} onClick={ () => { connectWithCoinbaseWallet(); handleCloseClick();}}><StyledCoinbase/> CoinBase</StyledLoginBtn>
        </StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("__next")
    );
  } else {
    return null;
  }
};

const StyledModalBody = styled.div`
    padding-top: 10px;
    display: grid;
    grid-gap: 10px;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
  color: black;
`;

const StyledModal = styled.div`
  background: white;
  color: black;
  width: 100%;
  max-width: 500px;
  height: 226px;
  border-radius: 5px;
  padding: 15px;
  margin: 20px;
`;
const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999999;
`;
const StyledLoginBtn = styled.div`
    padding: 8px;
    border: 0;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-gap: 10px;
`;
const StyledMetamask = styled.div`
    background: url('/icons/metamask.svg');
    display: block;
    width: 18px;
    height: 18px;
    background-size: contain;
    background-repeat: no-repeat;
`;
const StyledWalletConnect = styled.div`
    background: url('/icons/walletconnect.svg');
    display: block;
    width: 18px;
    height: 18px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;
const StyledCoinbase = styled.div`
    background: url('/icons/coinbase.svg');
    display: block;
    width: 18px;
    height: 18px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

export default Modal;
