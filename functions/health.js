exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "OK",
      service: "PAK RH"
    })
  };
};
