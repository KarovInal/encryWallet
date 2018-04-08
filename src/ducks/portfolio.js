const defaultState = {
  "address": "",
  "balance": 0,
  "boxes": []
};

const SAVE_PORTFOLIO = 'SAVE_PORTFOLIO';

const portfolio = (state = defaultState, action) => {
  switch(action.type) {
    case SAVE_PORTFOLIO:
      return {
        ...action.payload
      }
    default:
      return state
  }
};

const savePortfolio = portfolio => ({
  type: SAVE_PORTFOLIO,
  payload: {
    ...portfolio
  }
});

const fetchPortfolio = walletId => (dispath, getState) => {
  fetch(`http://unblock.southeastasia.cloudapp.azure.com:9051/account/${walletId}/portfolio`)
    .then(res => res.json())
    .then(data => {
      dispath(savePortfolio(data))
    });
}

export {
  fetchPortfolio
}

export default portfolio;
