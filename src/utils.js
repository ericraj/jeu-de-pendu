/**
 * Get list of users from localStorage
 */
export const getUsers = () => {
	return JSON.parse(localStorage.getItem("PENDU__USERS"));
};

/**
 * Add a new user to localstorage
 * @param {Array} user 
 */
export const addUser = user => {
	localStorage.setItem("PENDU__USERS", JSON.stringify(user));
};
