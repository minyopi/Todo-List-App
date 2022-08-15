import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}

    * {
        color: #3a3a3a;
        font-size: 16px;
        box-sizing: border-box;
    }
`;

export default GlobalStyle;
