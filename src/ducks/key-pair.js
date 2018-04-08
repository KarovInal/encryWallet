import CryptoJS from 'crypto-js';

const SAVE_KEY_PAIR = 'SAVE_KEY_PAIR';
const SAVE_KEY_PUBLIC = 'SAVE_KEY_PUBLIC';

const defaultState = {
  public: '',
  private: ''
}

const keyPair = (state = defaultState, action) => {
  switch(action.type) {
    case SAVE_KEY_PAIR:
      return {
        ...action.payload
      }
    case SAVE_KEY_PUBLIC:
      return {
        ...state,
        public: action.payload.public
      }
    default:
      return state
  }
}

const saveKeyPair = pair => ({
  type: SAVE_KEY_PAIR,
  payload: {
    ...pair
  }
});

const saveKeyPublic = publicKey => ({
  type: SAVE_KEY_PUBLIC,
  payload: {
    public: publicKey
  }
})

const saveWallet = (walletId, walletPrivate, password) => dispatch => {
  var encryptedPrivateWallet = CryptoJS.AES.encrypt(walletPrivate, password);

  const wallet = {
    walletId,
    walletPrivate: encryptedPrivateWallet.toString()
  }

  localStorage.setItem('wallet', JSON.stringify(wallet));
}

export default keyPair;

export {
  saveWallet,
  saveKeyPair,
  saveKeyPublic,
}
