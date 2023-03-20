async function choiceBestAnswer(subjectId, answerId) {
  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/subjects/${subjectId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      best_anwser: answerId,
    }),
  })
    .then((response) => {
      if (response.status === 204) {
        return true;
      }
      return response.json();
    })
    .catch((err) => {
      console.error("erreur dans DeleteItem", err);
    });
}

export default choiceBestAnswer;
