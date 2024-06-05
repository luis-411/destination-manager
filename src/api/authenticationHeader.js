

export default (token) => ({
  headers: {
    Authorization: `bearer ${token}`,
  },
})