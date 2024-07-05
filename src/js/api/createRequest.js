const createRequest = async (options = {}) => {

	try {
		const requestOptions = {
			method: options.method,
			headers: options.headers || {},
		};


		if (options.method !== 'GET' && options.data) {
			requestOptions.body = JSON.stringify(options.data);


			if (!requestOptions.headers['Content-Type']) {
				requestOptions.headers['Content-Type'] = 'application/json';
			}

		}

		const response = await fetch(options.url, requestOptions);
		

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();


		if (options.callback) {
			options.callback(result);
		}

		return result;
	} 
	catch (e) {
		console.error('Что-то пошло не по плану', e);


		if (options.errorCallback) {
			options.errorCallback(e);
		}
	}
}

export default createRequest;

// const createRequest = async (options = {}) => {
// 	const headers = {
// 		'Content-Type': 'application/json',
// 	}
// 	return fetch(options.url, {
// 		method: options.method,
// 		body: options.method === 'GET' ? null : JSON.stringify(options.data),
		
// 	})
// 	.then(response => response.json())
// 	.then(result => options.callback(result))
// 	.catch(e => {
// 		console.error('Что то пошло не по плану', e)
// 	})
// };

// export default createRequest;
