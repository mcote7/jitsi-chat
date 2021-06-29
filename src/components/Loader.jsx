import React from 'react';
import { css } from '@emotion/react';
import GridLoader from "react-spinners/GridLoader";

const Loader = () => {
  const override = css`
  margin: auto;
  -webkit-box-reflect: below 40px linear-gradient(
    to bottom,
    transparent,
    rgba(255, 255, 255, 0.4));
  `;
  return (
    <GridLoader color={'#ffffff80'} size={55} margin={5} css={override}/>
  );
}
export default Loader;

