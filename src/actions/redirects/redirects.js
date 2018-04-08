import { LOGIN, REGISTER, WALLET} from '../../constants/routers';

export const redirectToWallet   = ({ history }) => () => history.push(WALLET);
export const redirectToLogin    = ({ history }) => () => history.push(LOGIN);
export const redirectToRegister = ({ history }) => () => history.push(REGISTER);
export const redirectToWalletId = ({ history }, walletId) => () => history.push(`${WALLET}/${walletId}`);