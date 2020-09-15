const backendPendingSimulation = (email, password) => {
  return new Promise((resolve, reject) => {
    // Simulation of backend response. If data about user's password and email
    // was found in backend database, then we send token. Else we send error with
    // an error status code so frontend could treat that correct way.
    setTimeout(() => {
      if (email !== 'gora@studio.ru') {
        reject({ status_code: "wrong_login" })
      } else if (password !== '2020') {
        reject({ status_code: "wrong_password" })
      } else {
        console.log(`Email: ${email}, Password: ${password}`);
        resolve("Up9chkaToken");
      }
    }, 2000);
  });
};

export default backendPendingSimulation;
