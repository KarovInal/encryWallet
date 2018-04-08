const SAVE_HISTORY = 'SAVE_HISTORY';

const defaultValue = []

const history = (state = defaultValue, action) => {
  const { payload } = action;
  switch(action.type) {
    case SAVE_HISTORY:
      return payload
    default:
      return state
  }
};

const saveHistory = history => ({
  type: SAVE_HISTORY,
  payload: history
})

const fetchHistory = () => async (dispath, getState) => {
  const historyFetch = await fetch(`http://unblock.southeastasia.cloudapp.azure.com:9051/history/`);
  let historyData = await historyFetch.json();
  const directives = [];
  historyData = historyData.reverse().slice(0, 5);
  
  for(var i = 0; i < historyData.length; i++) { 
    let transactionUrl = `http://unblock.southeastasia.cloudapp.azure.com:9051/history/${historyData[i]}/transactions`
    let transactionFetch = await fetch(transactionUrl);
    let transactionData = await transactionFetch.json();
    transactionData = transactionData[0].directives[1];
    directives.push(transactionData);
  }
  dispath(saveHistory(directives))
}

export default history;

export {
  fetchHistory
}