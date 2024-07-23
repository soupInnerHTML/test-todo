import React, {FC, useMemo} from 'react';
import {metamaskStore} from "../store/Metamask";
import {observer} from "mobx-react-lite";
import {trimWalletAddress} from "../utils/trimWalletAddress";

export const MetamaskCard: FC = observer(() => {
  const {account, balance, currentEpoch} = metamaskStore;
  const trimmedAddress = useMemo(() => account ? trimWalletAddress(account) : account, [account]);
  return (
    <div className={'absolute right-5 top-5 bg-white p-5 pt-3 rounded-2xl min-w-screen'}>
      {account ? <>
          {balance ? <p>Balance: {balance} BNB</p> : <p>Loading balance...</p>}
          {account ? <p>Wallet address: {trimmedAddress}</p> : <p>Loading wallet address...</p>}
          {currentEpoch ? <p>Current epoch: {currentEpoch}</p> : <p>Loading epoch...</p>}
        </> :
        <button className={"todo-list__btn"} onClick={() => metamaskStore.init()}>Connect Metamask account</button>
      }
    </div>
  );
});
