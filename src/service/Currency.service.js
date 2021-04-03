import helper from "@/helper";
import Currency from "@/model/Currency.model";
import axios from "axios";

const defaultOption = {
	baseURL: 'https://currency-converter5.p.rapidapi.com/currency',
	method: 'GET',
	headers: {
		'x-rapidapi-key': process.env.VUE_APP_X_RAPID_API_KEY,
		'x-rapidapi-host': process.env.VUE_APP_X_RAPID_API_HOST
	}
};
export const init = async () => {
	const initOption = {
		url: '/list'
	};
	try {
		const response = await axios.request({ ...defaultOption, ...initOption });
		const currencies = response.data.currencies;
		const allKeys = Object.keys(response.data.currencies);
		return allKeys.sort().map(currency => new Currency(currency, currencies[currency]));
	} catch (error) {
		helper.showError(error);
	}
};

/**
 * Exchange currency
 * @param {string} from - From currency
 * @param {string} to - To currency
 * @param {number} amount - Amount to exchange
 * @returns {Promise<null|*>}
 */
export const exchange = async (from, to, amount = 1) => {
	const exchangeOption = {
		url: '/convert',
		params: { format: 'json', from, to, amount }
	};
	try {
		const response = await axios.request({ ...defaultOption, ...exchangeOption });
		return response.data;
	} catch (error) {
		helper.showError(error);
	}
};