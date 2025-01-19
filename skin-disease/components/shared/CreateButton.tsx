import React from "react";
import styled from "styled-components";

const CreateButton = ({name, type, onClick}: {name: string, type: any, onClick?: any}) => {
  return (
      <StyledWrapper>
        <button type={type} onClick={onClick}>
          <span>{name}</span>
        </button>
      </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    background: #000; /* 黑色背景 */
    font-family: "Montserrat", sans-serif;
    box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    border: none;
    transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
  }

  button:after {
    content: " ";
    width: 0%;
    height: 100%;
    background: #fff; /* 白色覆盖层 */
    position: absolute;
    transition: all 0.4s ease-in-out;
    right: 0;
  }

  button:hover::after {
    right: auto;
    left: 0;
    width: 100%;
  }

  button span {
    text-align: center;
    text-decoration: none;
    width: 100%;
    padding: 14px 22px;
    color: #fff; /* 初始文字颜色为白色 */
    font-size: 1.125em;
    font-weight: 700;
    letter-spacing: 0.1em;
    z-index: 20;
    transition: color 0.3s ease-in-out;
  }

  button:hover {
    background: #fff; /* 悬停时背景变为白色 */
  }

  button:hover span {
    color: #000; /* 悬停时文字变为黑色 */
    animation: scaleUp 0.3s ease-in-out;
  }

  @keyframes scaleUp {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default CreateButton;
