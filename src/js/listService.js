

export default {
  getList : () => new Promise((resolve, reject) => {
    fetch(SERVER_URL + '/playlist')
      .then(response => {
        if (response.ok) {
          resolve(response.json())
        }
        else {
          reject(response.text())
        }
      })
      .catch(reject)
  })

}