async function choiceBestAnswer(subjectId, answerId, setReload, reload) {
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
      if (response.ok) {
        setReload(!reload);
      } else {
        throw new Error("Erreur interne serveur");
      }
    })
    .catch((err) => {
      console.error("Erreur : ", err);
    });
}

export default choiceBestAnswer;
