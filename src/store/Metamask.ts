import {flow, makeObservable, observable} from "mobx";
import Web3 from "web3";
import PancakePredictionV2ABI from '../assets/abi/PancakePredictionV2ABI.json';
import {PancakePredictionV2} from "../types";


class MetamaskStore {
  private BNB_CHAIN_ID = '0x38'
  private web3: Web3 | null = null;
  private contract: PancakePredictionV2 | null = null;
  @observable account: string | null = null;
  @observable balance: string | null = null;
  @observable currentEpoch: string | null = null;

  constructor() {
    makeObservable(this);
  }

  @flow *init() {
    if (window.ethereum) {
      try {
        // Подключение к Web3
        this.web3 = new Web3(window.ethereum);
        // Запрос разрешения у пользователя на доступ к аккаунтам
        yield window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts: string[] = yield this.web3.eth.getAccounts()
        this.account = accounts[0];
        const chainId: string = yield this.web3.eth.getChainId().toString();

        if(chainId !== this.BNB_CHAIN_ID) {
          yield this.switchNetwork(this.BNB_CHAIN_ID)
        }

        // Создание контракта
        this.contract = new this.web3.eth.Contract(
          PancakePredictionV2ABI,
          "0x18B2A687610328590Bc8F2e5fEdDe3b582A49cdA"
        ) as any as PancakePredictionV2;

        // Запрос баланса и текущей эпохи
        this.fetchBalance();
        this.fetchCurrentEpoch();
      } catch (error) {
        console.error("Error initializing Web3 or fetching accounts:", error);
      }
    } else {
      alert("Ethereum provider is not available.");
    }
  }

  @flow *fetchBalance() {
    if (this.web3 && this.account) {
      try {
        const balance: number = yield this.web3.eth.getBalance(this.account);
        const balanceInEther = this.web3.utils.fromWei(balance, 'ether');
        this.balance = parseFloat(balanceInEther).toFixed(4).replace(/\.?0+$/, '');
      } catch (error) {
        alert("Error fetching balance");
      }
    }
  }

  @flow *fetchCurrentEpoch() {
    if (this.contract) {
      try {
        const epoch: number = yield this.contract.methods.currentEpoch().call();
        this.currentEpoch = epoch.toString();
      } catch (error) {
        alert("Error fetching current epoch");
      }
    }
  }

  // Функция для смены сети
  @flow *switchNetwork(chainId: string) {
    if (window.ethereum) {
      try {
        yield window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }],
        });
      } catch (error) {
        alert("Error switching network");
        // Обработка ошибок, например, пользователь может быть в неправильной сети
      }
    } else {
      alert("Ethereum provider is not available.");
    }
  }
}

export const metamaskStore = new MetamaskStore()
