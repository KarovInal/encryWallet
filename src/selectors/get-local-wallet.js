const walletFromLocal = () => window.localStorage.wallet;

const getLocalWallet = () =>
  walletFromLocal()
    ? JSON.parse(window.localStorage.wallet)
    : undefined

export default getLocalWallet;
