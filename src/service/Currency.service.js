import axios from "axios";
import helper from "@/helper"
import Currency from "@/model/Currency.model"

export const init = async () => {
  const initOption = {
    method: 'GET',
    url: 'https://currency-converter5.p.rapidapi.com/currency/list',
    headers: {
      'x-rapidapi-key': 'ee1a3c9538mshef58c837f3060c0p10705fjsn2556eb413578',
      'x-rapidapi-host': 'currency-converter5.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(initOption);
    const currencies = response.data.currencies;
    const allKeys = Object.keys(response.data.currencies)
    return allKeys.map(currency => new Currency(currency, currencies[currency]))
  } catch (error) {
    helper.showError(error)
  }
}

/**
 * Exchange currency
 * @param {string} from - From currency
 * @param {string} to - To currency
 * @param {number} amount - Amount to exchange
 * @returns {Promise<null|*>}
 */
export const exchange = async (from, to, amount) => {
  const exchangeOption = {
    method: 'GET',
    url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
    params: {format: 'json', from, to, amount},
    headers: {
      'x-rapidapi-key': 'ee1a3c9538mshef58c837f3060c0p10705fjsn2556eb413578',
      'x-rapidapi-host': 'currency-converter5.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(exchangeOption);
    const {rates} = response.data;
    return rates[to];
  } catch (error) {
    helper.showError(error)
  }
}