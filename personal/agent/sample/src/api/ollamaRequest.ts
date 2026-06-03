export const sendSingleRequest = async (request: any) => {
  const response = await fetch("http://192.168.31.47:11434/api/generate", {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
