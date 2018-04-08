import keypair from 'keypair';

const createPair = () => 
  new Promise((resolve, reject) => {
    try {
      const keyPairWallet = keypair();
      resolve(keyPairWallet);
    } catch(err) {
      reject('error')
    }
  });

export default createPair