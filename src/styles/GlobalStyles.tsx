import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}

    * {
        font-size: 16px;
        box-sizing: border-box;
    }
`;

export default GlobalStyle;
